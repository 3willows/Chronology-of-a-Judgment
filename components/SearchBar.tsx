// /app/components/SearchBar.tsx

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showDropdown: boolean;
  searchResults: any[]; // Replace with actual type if available
  handleResultClick: (url: string) => void;
  isLoading: boolean;
}

export function SearchBar({ searchQuery, setSearchQuery, showDropdown, searchResults, handleResultClick, isLoading }: SearchBarProps) {
  return (
    <>
      <form className="space-y-4">
        <div className="flex flex-col space-y-2 relative">
          <Input
            type="text"
            placeholder="Search for a case or enter URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query directly
            className="w-full"
          />
          {showDropdown && (
            <Card className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-auto z-10">
              <CardContent className="p-0">
                {searchResults.map((result, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left p-2 hover:bg-accent"
                    onClick={() => result.url && handleResultClick(result.url)}
                  >
                    {result.title} + {result.citation}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              Search
            </>
          )}
        </Button>
      </form>
    </>
  );
}