"use client";

import ShowCard from "@/components/ShowCard";
import usePodcasts from "@/hooks/usePostcasts";


const FavoritesPage = () => {
  const { favorites, isFavorite, addToFavorites, removeFromFavorites } = usePodcasts();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-foreground text-center mb-6">
        Your Favorite Podcasts
      </h1>

      {/* No Favorites Message */}
      {favorites.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p className="text-lg">You haven't added any favorites yet.</p>
          <p className="mt-2">Browse shows and tap the ❤️ to add favorites!</p>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              isFavorite={isFavorite}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
