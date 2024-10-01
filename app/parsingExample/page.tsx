import { createClient } from "@/utils/supabase/server"
import { extractDatesFromXML } from "../extractDatesFromXML"

export default async function Index() {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("judgments")
      .select("xml")
      .eq("id", 7)
      .single()

    if (error) {
      throw error
    }
    if (!data || !data.xml) {
      throw new Error(
        "No XML data found for row with ID 7 in the judgments table"
      )
    }

    const xmlContent = data.xml
    const dates = await extractDatesFromXML(xmlContent)
    console.log(dates)
    return (
      <>
        <div className="m-5">Hello! Dates extracted successfully.</div>
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
