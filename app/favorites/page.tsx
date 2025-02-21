"use client";

import ShowCard from "@/components/ShowCard";
import usePodcasts from "@/hooks/usePostcasts";

const FavoritesPage = () => {
  const { favorites, isFavorite, addToFavorites, removeFromFavorites } =
    usePodcasts();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-center mb-6 flex items-center justify-center gap-3">
        🎧 Your Favorite Podcasts
        <span className="absolute -top-4 sm:-top-5 right-0 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-indigo-500 text-white font-bold shadow-lg text-sm sm:text-base">
          {favorites.length}
        </span>
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
