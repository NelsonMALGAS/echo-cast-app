import { genresFilters } from "@/genres";

export const getGenreNames = (codes: number[]): string => {
    const genreNames = codes
      .map((code) => genresFilters.find((genre) => genre.code === code)?.name)
      .filter(Boolean) as string[];
  
    return genreNames.length > 1 ? genreNames.join(", ") : genreNames[0] || "";
  };


  export const getGenreDetails = (code: number | null) => {
    if (typeof code !== "number") {
      return { name: "", code: null };
    }
  
    const genre = genresFilters.find((genre) => genre.code === code);
    return genre ? { name: genre.name, code: genre.code } : { name: "", code: null };
  };
  


  