import { createClient } from "@/utils/supabase/server"
import { extractDatesFromXML } from "../_parsingDates/extractDatesFromXML"

// Utility function to fetch XML and extract dates
async function fetchAndExtractDates(id: number): Promise<string[]> {
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
      throw new Error(`No XML data found for row with ID ${id} in the judgments table`)
    }
    const xmlContent = data.xml
    return await extractDatesFromXML(xmlContent)
  } catch (error) {
    console.error("Error in fetchAndExtractDates:", error)
    throw error
  }
}

export default async function Index() {
  try {
    const dates = await fetchAndExtractDates(7)
    console.log(dates)
    return (
      <>
        <div className="m-5">Hello! Dates extracted successfully.</div>
        <ul>
          {dates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
      </>
    )
  } catch (error) {
    console.error("Error:", error)
    return (
      <>
        <div className="m-5">Error occurred while processing data: {error.message}</div>
      </>
    )
  }
}