"use client"

import { useState, useEffect, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { judgmentToChronology } from "@/app/judgmentToChronology";
import { findPotentialCases } from "@/app/fetchParseServer";
import { Judgment } from "@/app/fetchParse";
import { debounce } from "lodash"; // Import debounce from lodash

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
    }, 500), // Adjust the delay as needed
    []
  );

  // Effect to call the debounced function when searchQuery changes
  useEffect(() => {
    debouncedFetchSearchResults(searchQuery);

    // Cleanup function to cancel the debounce on unmount
    return () => {
      debouncedFetchSearchResults.cancel();
    };
  }, [searchQuery, debouncedFetchSearchResults]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await judgmentToChronology("https://caselaw.nationalarchives.gov.uk/" + searchQuery);
      setChronology(result);
    } catch (error) {
      console.error("Error fetching chronology:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (selectedUrl: string) => {
    setSearchQuery(selectedUrl);
    setShowDropdown(false);
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
                        {result.title}
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
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Loading state for chronology generation */}
      {isLoading ? (
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="text-muted-foreground mt-2">
              Generating rough chronology...
            </p>
          </CardContent>
        </Card>
      ) : chronology ? (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Rough Chronology</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Event</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chronology.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.date}</TableCell>
                    <TableCell>{item.sentence}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Instructions for users */}
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="text-left py-8 text-muted-foreground">
              <p className="text-muted-foreground">
                <b>Quick start: </b>Enter "Prime Minister" in the search bar and click on a result, or enter a URL directly to view a rough chronology of dates from a judgment.
              </p>
            </CardContent>
          </Card>

          {/* Additional instructions */}
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="text-left py-8">
              <p className="text-muted-foreground">
                You can search for cases or paste the URL of any case found{" "}
                <a
                  href="https://caselaw.nationalarchives.gov.uk/"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>{" "}
                for a similar chronology.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}