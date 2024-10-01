import { createClient } from "@/utils/supabase/server"
import { extractDatesFromXML } from "../_parsingDates/extractDatesFromXML"

interface DateSentence {
  date: string;
  sentence: string;
}

// Utility function to fetch XML and extract dates with sentences
async function fetchAndExtractDates(id: number): Promise<DateSentence[]> {
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
    const dateSentences = await fetchAndExtractDates(7)
    console.log(dateSentences)
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Extracted Dates with Sentences</h1>
        {dateSentences.length > 0 ? (
          <ul className="space-y-4">
            {dateSentences.map((item, index) => (
              <li key={index} className="border p-4 rounded-lg shadow">
                <p className="font-semibold text-lg text-blue-600">{item.date}</p>
                <p className="mt-2 text-gray-700">{item.sentence}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No dates found.</p>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error:", error)
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      </div>
    )
  }
}