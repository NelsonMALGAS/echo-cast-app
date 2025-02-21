"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";




type SearchBarProps = {
    titleQuery: string;
    setTitleQuery: (title: string) => void;
    handleSearch: () => void;
}
const SearchBar = ({ handleSearch , setTitleQuery , titleQuery} : SearchBarProps) => {
   

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex w-full gap-2 m-4"
    >
      {/* Search Input */}
      <Input
        type="text"
        value={titleQuery}
        onChange={(e) => setTitleQuery(e.target.value)}
        placeholder="Search podcasts..."
        className="w-full px-4 py-2 rounded-md bg-muted text-foreground border border-border"
      />
      
      {/* Search Button */}
      <Button className="px-4 py-2 flex items-center gap-2" onClick={handleSearch}>
        <Search className="w-5 h-5" />
        Search
      </Button>
    </motion.div>
  );
};

export default SearchBar;
