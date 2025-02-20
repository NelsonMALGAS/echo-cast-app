import { FAVORITES_STORAGE_KEY } from "@/constants";
import { PreviewShowType } from "@/types";
import { useEffect, useState } from "react";



const usePodcasts = () => {
 
  const [showPreviews, setShowPreviews] = useState<PreviewShowType[] | null>();
  const [favorites, setFavorites] = useState<PreviewShowType[]>([]);
  


   // Load favorite shows from localStorage
   const loadFavorites = () => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (err) {
      console.error("Error loading favorites from localStorage:", err);
    }
  };

  // Save favorites to localStorage
  const saveFavorites = (updatedFavorites: PreviewShowType[]) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (err) {
      console.error("Error saving favorites to localStorage:", err);
    }
  };

  // Add a show to favorites
  const addToFavorites = (show: PreviewShowType) => {
    if (!favorites.some((fav) => fav.id === show.id)) {
      const updatedFavorites = [...favorites, show];
      saveFavorites(updatedFavorites);
    }
  };

  // Remove a show from favorites
  const removeFromFavorites = (showId: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== showId);
    saveFavorites(updatedFavorites);
  };

  // Check if a show is already in favorites
  const isFavorite = (showId: string) => favorites.some((fav) => fav.id === showId);

  // Load favorites from localStorage on mount
  useEffect(() => {
    loadFavorites();
  }, []);

 
  return {
    showPreviews,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    setShowPreviews,
  };
};

export default usePodcasts;
