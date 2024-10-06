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

export async function fetchParse(url : string): Promise<Judgment[] | undefined> {
  try {
    const response = await fetch(url)

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
