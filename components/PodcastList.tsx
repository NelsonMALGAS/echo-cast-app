"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import usePodcasts from "@/hooks/usePostcasts";
import ShowCard from "./ShowCard";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";
import { PreviewShowType } from "@/types";

const PodcastList = () => {
  const { addToFavorites, isFavorite, removeFromFavorites } = usePodcasts();
  const [titleQuery, setTitleQuery] = useState<string>("");
  const [showPreviews, setShowPreviews] = useState<PreviewShowType[] | null>(null);
  const [originalShows, setOriginalShows] = useState<PreviewShowType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // Filter shows by title
  const filterShowsByTitle = (title: string) => {
    if (!originalShows) return [];
    return originalShows.filter((show) =>
      show.title.toLowerCase().includes(title.toLowerCase())
    );
  };

  // Handle search functionality
  const handleSearch = async () => {
    if (titleQuery.trim() === "") {
      setShowPreviews(originalShows); // Restore all shows if search is empty
      return;
    }

    const result = filterShowsByTitle(titleQuery);
    setShowPreviews(result.length > 0 ? result : originalShows);
    setTitleQuery(""); // Reset search input
  };

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
      <SearchBar
        titleQuery={titleQuery}
        setTitleQuery={setTitleQuery}
        handleSearch={handleSearch}
      />

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
        {showPreviews && showPreviews.length > 0 ? (
          showPreviews.map((show) => (
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
    </div>
  );
};

export default PodcastList;
