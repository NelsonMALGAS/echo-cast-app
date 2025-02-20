"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PreviewShowType } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { getGenreNames } from "@/helpers";
import Link from "next/link";
import { Heart , HeartOff } from "lucide-react"

type ShowCardProps = {
  show: PreviewShowType;
  isFavorite:(showId: string) => boolean
  addToFavorites: (show: PreviewShowType) => void
  removeFromFavorites: (showId: string) => void
};

const ShowCard = (props: ShowCardProps) => {
    const { show , addToFavorites , isFavorite , removeFromFavorites  } = props;
  const { image, genres, updated, seasons, title } = show;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className=" w-full max-w-sm rounded-lg overflow-hidden shadow-lg border border-border transition-transform transform hover:scale-105 flex flex-col">
            {/* Favorite Icon (Top Right) */}
            <button
          onClick={() =>
            isFavorite(show.id) ? removeFromFavorites(show.id) : addToFavorites(show)
          }
          className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition z-10"
        >
          {isFavorite(show.id) ? (
            <Heart className="text-red-500 w-6 h-6" fill="red" />
          ) : (
            <HeartOff className="text-muted-foreground w-6 h-6" />
          )}
        </button>
        {/* Podcast Image */}
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            unoptimized
            className="rounded-t-lg w-full h-full"
          />
        </div>

        {/* Card Header */}
        <CardHeader className="p-4 flex-grow">
        
          <CardTitle className="text-xl font-semibold text-foreground  overflow-hidden whitespace-nowrap text-ellipsis">
            {title}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
            {genres.length > 0 ? (
              getGenreNames(genres)
                .split(", ")
                .map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium bg-muted text-foreground rounded-full"
                  >
                    {genre}
                  </span>
                ))
            ) : (
              <span className="text-muted-foreground">No genres available</span>
            )}
          </CardDescription>
        </CardHeader>

        {/* Card Footer */}
        <CardFooter className="p-4 flex justify-between items-center bg-muted/60">
          <span className="text-sm text-muted-foreground">
            {seasons} {seasons === 1 ? "Season" : "Seasons"}
          </span>
          <span className="text-xs text-muted-foreground">
            Updated: {new Date(updated).toLocaleDateString()}
          </span>
        </CardFooter>

        {/* View Details Button - Takes Full Width */}
        <Link href={`/podcasts/${show.id}`} className="w-full">
          <button className="w-full px-4 py-3 text-md font-medium bg-primary text-white rounded-b-lg hover:bg-primary/90 transition">
            View Details
          </button>
        </Link>
      </Card>
    </motion.div>
  );
};

export default ShowCard;
