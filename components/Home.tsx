// /app/components/Home.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SearchBar } from "./SearchBar";
import { SelectedCaseDetails } from "./SelectedCaseDetails";
import { ChronologyTable } from "./ChronologyTable";
import { judgmentToChronology } from "@/app/judgmentToChronology";
import { findPotentialCases } from "@/app/fetchParseServer";
import { Judgment } from "@/app/fetchParse";
import { debounce } from "lodash";

interface DateSentence {
  date: string;
  sentence: string;
}

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chronology, setChronology] = useState<DateSentence[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Judgment[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Judgment | null>(null);

  // Create a debounced function for fetching search results
  const debouncedFetchSearchResults = useCallback(
    debounce(async (query) => {
      if (query) {
        setIsLoading(true);
        try {
          const results = await findPotentialCases(query);
          if (!results) {
            throw Error("no results");
          }
          setSearchResults(results);
          setShowDropdown(true);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 500),
    []
  );

  // Effect to call the debounced function when searchQuery changes
  useEffect(() => {
    debouncedFetchSearchResults(searchQuery);
    return () => {
      debouncedFetchSearchResults.cancel();
    };
  }, [searchQuery, debouncedFetchSearchResults]);

  const handleResultClick = async (selectedUrl: string) => {
    const selectedResult = searchResults.find(
      (result) => result.url === selectedUrl
    );
    
    if (selectedResult) {
      setSelectedCase(selectedResult); // Set selected case correctly
      setSearchQuery(""); // Clear the search query
      setShowDropdown(false);
  
      // Fetch chronology for the selected case
      setIsLoading(true);
      try {
        const result = await judgmentToChronology(
          "https://caselaw.nationalarchives.gov.uk/" + selectedUrl
        );
        setChronology(result);
      } catch (error) {
        console.error("Error fetching chronology:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Chronology of a Judgment</CardTitle>
          <CardDescription>
            Search for a case or enter a URL to get a list of dates mentioned in a judgment, in chronological order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
            showDropdown={showDropdown}
            searchResults={searchResults}
            handleResultClick={handleResultClick}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Display selected case information */}
      {selectedCase && <SelectedCaseDetails selectedCase={selectedCase} />}

      {/* Loading state for chronology generation */}
      {isLoading ? (
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="text-muted-foreground mt-2">Generating rough chronology...</p>
          </CardContent>
        </Card>
      ) : chronology ? (
        <ChronologyTable chronology={chronology} />
      ) : (
        <>
          {/* Instructions for users */}
          {/* Add your instructions here */}
        </>
      )}
    </div>
  );
}