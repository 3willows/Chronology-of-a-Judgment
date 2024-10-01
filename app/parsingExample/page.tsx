import { fetchAndExtractDates } from "../_parsingDates/fetchAndExtractDates"

export interface DateSentence {
  date: string
  sentence: string
}

export default async function Index() {
  try {
    const dateSentences = await fetchAndExtractDates(13)
    console.log(dateSentences)
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Extracted Dates with Sentences
        </h1>
        {dateSentences.length > 0 ? (
          <ul className="space-y-4">
            {dateSentences.map((item, index) => (
              <li key={index} className="border p-4 rounded-lg shadow">
                <p className="font-semibold text-lg text-blue-600">
                  {item.date}
                </p>
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
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      </div>
    )
  }
}
