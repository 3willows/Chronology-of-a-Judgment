"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function GetChronology() {
  const [url, setUrl] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the search action
    // For now, we'll just log the URL
    console.log("Searching for judgment:", url)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Get Chronology</CardTitle>
        <CardDescription>
          Enter a link to a Judgment from the "Find Case Law" service provided by the UK National Archive.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
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
  )
}