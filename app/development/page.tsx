import { extractDatesFromXML } from "../_parsingDates/extractDatesFromXML"
// import { extractParagraphNumbersFromXML } from "../_parsingDates/extractParagraphNumbersFromXML"
import { createClient } from "@/utils/supabase/server"

export default async function Home() {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from("judgments")
      .select("xml")
      .eq("id", 37)
      .single()

    if (error) {
      throw error
    }
    if (!data || !data.xml) {
      throw new Error(
        `No XML data found for row with the specified ID in the judgments table`
      )
    }
    const xmlContent = data.xml
    const dates = await extractDatesFromXML(xmlContent)
    console.log(dates)
    // const paraNos = await extractParagraphNumbersFromXML(xmlContent)
    // console.log(paraNos)
    return <h1>Hello! You have arrived at a page that is of no interest to the end user!</h1>
  } catch (error) {
    console.error("Error in fetchAndExtractDates:", error)
    throw error
  }
}
