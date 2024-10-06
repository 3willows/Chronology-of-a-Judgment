import { JSDOM } from "jsdom"

export interface Judgment {
  title: string | null
  court: string | null
  citation: string | null
  date: string | null
  url: string | null
}

function parseJudgments(html: string): Judgment[] {
  const dom = new JSDOM(html)
  const document = dom.window.document

  const judgmentElements = document.querySelectorAll(
    ".judgment-listing__judgment"
  )

  return Array.from(judgmentElements).map((judgmentElement) => {
    const titleElement = judgmentElement.querySelector(
      ".judgment-listing__title a"
    )
    const courtElement = judgmentElement.querySelector(
      ".judgment-listing__court"
    )
    const citationElement = judgmentElement.querySelector(
      ".judgment-listing__neutralcitation"
    )
    const dateElement = judgmentElement.querySelector(".judgment-listing__date")

    return {
      title: titleElement ? titleElement.textContent?.trim() || null : null,
      court: courtElement ? courtElement.textContent?.trim() || null : null,
      citation: citationElement
        ? citationElement.textContent?.trim() || null
        : null,
      date: dateElement ? dateElement.getAttribute("datetime") : null,
      url: titleElement ? titleElement.getAttribute("href") : null,
    }
  })
}

export async function getResults(): Promise<Judgment[] | undefined> {
  try {
    const response = await fetch(
      "https://caselaw.nationalarchives.gov.uk/judgments/search?per_page=10&order=relevance&query=Gina+Miller&from_date_0=&from_date_1=&from_date_2=&to_date_0=&to_date_1=&to_date_2=&party=&judge="
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const results = parseJudgments(html)
    return results
  } catch (error) {
    console.error(error)
  }
}
