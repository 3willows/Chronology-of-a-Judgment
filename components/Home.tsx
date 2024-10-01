"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { judgmentToChronology } from "@/app/judgmentToChronology"

interface DateSentence {
  date: string
  sentence: string
}

export function Home() {
  const [url, setUrl] = useState("https://caselaw.nationalarchives.gov.uk/uksc/2019/41?query=miller+prime+minister&from_date=None&to_date=None&party=&judge=")
  const [chronology, setChronology] = useState<DateSentence[] | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    formData.set("url", url)

    const result = await judgmentToChronology(url)
    setChronology(result)
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Judgment to Chronology</CardTitle>
        <CardDescription>
          Enter a link to a Judgment from the National Archive's{' '}
          <a
            href="https://caselaw.nationalarchives.gov.uk/"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find Case Law
          </a>
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
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </CardContent>
    </Card>

    {chronology ? (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Chronology</CardTitle>
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
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Enter a URL and click Search to view the chronology.</p>
        </CardContent>
      </Card>
    )}
  </div>
  )
}
