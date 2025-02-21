"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import usePodcasts from "@/hooks/usePostcasts";
import ShowCard from "./ShowCard";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";
import { PreviewShowType } from "@/types";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const PodcastList = () => {
  const { addToFavorites, isFavorite, removeFromFavorites } = usePodcasts();
  const { user, loading: authLoading } = useAuth();
  const [titleQuery, setTitleQuery] = useState<string>("");
  const [showPreviews, setShowPreviews] = useState<PreviewShowType[] | null>(null);
  const [originalShows, setOriginalShows] = useState<PreviewShowType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of podcasts per page

  // Fetch all shows on mount
  useEffect(() => {
    const fetchAllShows = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://podcast-api.netlify.app");
        if (!response.ok) throw new Error("Failed to fetch podcasts");

        const data: PreviewShowType[] = await response.json();
        setShowPreviews(data);
        setOriginalShows(data); // Save original data for resetting
      } catch (error) {
        if (error instanceof Error) {
          setError(`Error fetching shows: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllShows();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  if (!authLoading && !user) {
    return null; // Prevents rendering until redirect completes
  }

  // Filter shows by title
  const filterShowsByTitle = (title: string) => {
    if (!originalShows) return [];
    return originalShows.filter((show) =>
      show.title.toLowerCase().includes(title.toLowerCase())
    );
  };

  // Handle search functionality
  const handleSearch = () => {
    if (!originalShows) return;
  
    if (titleQuery.trim() === "") {
      setShowPreviews(originalShows);
      setCurrentPage(1); 
      return;
    }
  
    const filteredResults = filterShowsByTitle(titleQuery);
    setShowPreviews(filteredResults);
    setCurrentPage(1); 
    setTitleQuery("");
  };
  

  // Pagination logic
  const totalPages = showPreviews ? Math.ceil(showPreviews.length / itemsPerPage) : 0;
  const paginatedShows = showPreviews
    ? showPreviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  // Show loading state
  if (loading) {
    return <LoadingSpinner message="Loading Podcasts..." />;
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-lg font-semibold text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="py-10 px-6 md:px-12 bg-background flex flex-col items-center justify-center">
      {/* Search Bar */}
      <SearchBar titleQuery={titleQuery} setTitleQuery={setTitleQuery} handleSearch={handleSearch} />

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold text-center text-foreground"
      >
        Discover Popular <span className="text-primary">Podcasts</span>
      </motion.h2>
      <p className="text-muted-foreground text-center text-lg mt-2">
        Explore top-rated podcasts from various categories.
      </p>

      {/* Podcast Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {paginatedShows.length > 0 ? (
          paginatedShows.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              isFavorite={isFavorite}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-center col-span-full">
            No results found.
          </p>
        )}
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8 space-x-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>

          <span className="text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default PodcastList;
