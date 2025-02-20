import { genresFilters } from "@/genres";

export const getGenreNames = (codes: number[]): string => {
    const genreNames = codes
      .map((code) => genresFilters.find((genre) => genre.code === code)?.name)
      .filter(Boolean) as string[];
  
    return genreNames.length > 1 ? genreNames.join(", ") : genreNames[0] || "";
  };
  