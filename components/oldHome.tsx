"use client"

import { useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { judgmentToChronology } from "@/app/judgmentToChronology"

interface DateSentence {
  date: string
  sentence: string
}

export function Home() {
  const [url, setUrl] = useState(
    "https://caselaw.nationalarchives.gov.uk/ewhc/qb/2019/2381?query=miller+prime+minister&from_date=None&to_date=None&party=&judge="
  )
  const [chronology, setChronology] = useState<DateSentence[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await judgmentToChronology(url)
      setChronology(result)
    } catch (error) {
      console.error("Error fetching chronology:", error)
      // Optionally, you can set an error state here and display it to the user
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Chronology of a Judgment</CardTitle>
          <CardDescription>
            Get a list of dates mentioned in a judgment, in chronological order.{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Input
                type="url"
                placeholder="https://caselaw.nationalarchives.gov.uk/uksc/2019/41"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={(e) => {
                  e.target.select()
                }}
                required
                disabled={isLoading}
              />
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
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="text-left py-8 text-muted-foreground">
              <p className="text-muted-foreground">
                <b>Quick start </b>click Search to view a rough chronology of
                dates from the High Court's
                <a
                  href="https://caselaw.nationalarchives.gov.uk/ewhc/qb/2019/2381"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Prorogation of Parliament
                </a>{" "}
                judgment,{" "}
                <i>
                  R (on the Application of Miller) v the Prime Minister [2019]
                  EWHC 2381 (QB)
                </i>{" "}
                .
              </p>
            </CardContent>
          </Card>
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="text-left py-8">
              <p className="text-muted-foreground">
                Copy and paste the URL of any other case found{" "}
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
  )
}
