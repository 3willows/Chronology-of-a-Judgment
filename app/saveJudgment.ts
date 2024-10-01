"use server"

import { createClient } from "../utils/supabase/server"

export async function saveJudgment(url: string) {
  "use server"
  const supabase = createClient()

  const cleanedUrl = url.split('?')[0]

  try {
    // Fetch the XML data
    const response = await fetch(`${cleanedUrl}/data.xml`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    // Read the response body as text
    const xmlContent = await response.text()

    // Insert the XML content into the database
    const { data, error } = await supabase
      .from("judgments")
      .insert({ xml: xmlContent })
      .select('id')
      .single()
    
    if (error) {
      console.error("Error inserting data:", error)
      return null
    } else {
      console.log("Inserted data:", data)
      console.dir(data.id)
      return data.id
    }
  } catch (error) {
    console.error("Error fetching or processing XML:", error)
    return null
  }
}
