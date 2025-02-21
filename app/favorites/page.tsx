"use client";

import ShowCard from "@/components/ShowCard";
import usePodcasts from "@/hooks/usePostcasts";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const FavoritesPage = () => {
  const { favorites, isFavorite, addToFavorites, removeFromFavorites } =
    usePodcasts();

  return (
    <motion.div
      className="max-w-6xl mx-auto p-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-center mb-6 flex items-center justify-center gap-3">
        🎧 Your Favorite Podcasts
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.5 }}
          className="absolute -top-4 sm:-top-5 right-0 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-indigo-500 text-white font-bold shadow-lg text-sm sm:text-base"
        >
          {favorites.length}
        </motion.span>
      </h1>

      {/* No Favorites Message */}
      <AnimatePresence>
        {favorites.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-center text-muted-foreground"
          >
            <p className="text-lg">You haven&apos;t added any favorites yet.</p>
            <p className="mt-2">Browse shows and tap the ❤️ to add favorites!</p>
          </motion.div>
        ) : (
          /* Favorites Grid */
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {favorites.map((show) => (
              <motion.div key={show.id} variants={itemVariants}>
                <ShowCard
                  show={show}
                  isFavorite={isFavorite}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FavoritesPage;
