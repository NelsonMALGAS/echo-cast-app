import { PreviewShowType } from "@/types";
import { useEffect, useState } from "react";

const usePodcasts = () => {
  const [showPreviews, setShowPreviews] = useState<PreviewShowType[] | null>(null);
  const [favorites, setFavorites] = useState<PreviewShowType[]>([]);
  const [favLoading, setFavLoading] = useState(false);

  // Fetch favorites from MongoDB
  const fetchFavorites = async () => {
    setFavLoading(true);
    try {
      const response = await fetch("/api/favorites");
      if (!response.ok) throw new Error("Failed to fetch favorites");

      const data = await response.json();
      setFavorites(data.favorites); // Assuming API returns { favorites: [...] }
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }finally{
      setFavLoading(false);
    }
  };

  // Add a show to favorites (MongoDB)
  const addToFavorites = async (show: PreviewShowType) => {
    setFavLoading(true);
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify({ show }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to add to favorites");

      setFavorites((prev) => [...prev, show]); // Update local state
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }finally{
      setFavLoading(false);
    }
  };

  // Remove a show from favorites (MongoDB)
  const removeFromFavorites = async (showId: string) => {
    setFavLoading(true);
    try {
      const response = await fetch(`/api/favorites`, {
        method: "DELETE",
        body: JSON.stringify({ showId }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to remove from favorites");

      setFavorites((prev) => prev.filter((fav) => fav.id !== showId));
    } catch (err) {
      console.error("Error removing from favorites:", err);
    }finally{
      setFavLoading(false);
    }
  };

  // Check if a show is in favorites
  const isFavorite = (showId: string) => {
  
   return favorites.some((fav) => fav.id === showId)
   
  };

  // Fetch favorites from MongoDB on mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  return {
    showPreviews,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    setShowPreviews,
    favLoading
  };
};

export default usePodcasts;
