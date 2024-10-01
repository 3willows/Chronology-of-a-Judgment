// import { extractDatesFromXML } from "../_parsingDates/extractDatesFromXML"
import { extractParagraphNumbersFromXML } from "../_parsingDates/extractParagraphNumbersFromXML"
import { createClient } from "@/utils/supabase/server"

export default async function Home() {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from("judgments")
      .select("xml")
      .eq("id", 26)
      .single()

    if (error) {
      throw error
    }
    if (!data || !data.xml) {
      throw new Error(
        `No XML data found for row with ID 25 in the judgments table`
      )
    }
    const xmlContent = data.xml
    // const dates = await extractDatesFromXML(xmlContent)
    // console.log(dates)
    const paraNos = await extractParagraphNumbersFromXML(xmlContent)
    console.log(paraNos)
    return <h1>hello!</h1>
  } catch (error) {
    console.error("Error in fetchAndExtractDates:", error)
    throw error
  }
  // extractParagraphNumbersFromXML(xmlContent)
  //   .then((result) => {
  //     if (result) {
  //       console.log("Extracted Title:", result)
  //     } else {
  //       console.log("No title found.")
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error extracting title:", error)
  //   })
}
