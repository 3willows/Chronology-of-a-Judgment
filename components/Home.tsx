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
import { judgmentToChronology } from "@/app/judgmentToChronology"

interface DateSentence {
  date: string
  sentence: string
}

export function Home() {
  const [url, setUrl] = useState("")
  const [chronology, setChronology] = useState<DateSentence[] | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    formData.set("url", url)

    const result = await judgmentToChronology(url)
    setChronology(result)
  }

  return (
    <>
      <div>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Get Chronology</CardTitle>
            <CardDescription>
              Enter a link to a Judgment from the "Find Case Law" service
              provided by the UK National Archive.
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
      </div>
      <div>
      {chronology ? (
          chronology.map((item : any, index : any) => (
            <div key={index}>
              <p>Date: {item.date}</p>
              <p>Sentence: {item.sentence}</p>
            </div>
          ))
        ) : (
          <p>Waiting for data</p>
        )}
      </div>
    </>
  )
}
