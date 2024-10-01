"use server"

import { createClient } from "@/utils/supabase/server"
import { extractDatesFromXML } from "./extractDatesFromXML"
import { DateSentence } from "../parsingExample/page"

export async function fetchAndExtractDates(
  id: number
): Promise<DateSentence[]> {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from("judgments")
      .select("xml")
      .eq("id", id)
      .single()

    if (error) {
      throw error
    }
    if (!data || !data.xml) {
      throw new Error(
        `No XML data found for row with ID ${id} in the judgments table`
      )
    }
    const xmlContent = data.xml
    return await extractDatesFromXML(xmlContent)
  } catch (error) {
    console.error("Error in fetchAndExtractDates:", error)
    throw error
  }
}
