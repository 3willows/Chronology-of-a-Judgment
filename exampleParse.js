const jsdom = require("jsdom")
const { JSDOM } = jsdom

function parseJudgment(html) {
  const dom = new JSDOM(`<!DOCTYPE html>${html}`)
  const document = dom.window.document
  const parser = new dom.window.DOMParser()
  const doc = parser.parseFromString(document, "text/html")
  const judgmentElement = doc.querySelector(".judgment-listing__judgment")

  if (!judgmentElement) {
    return null
  }

  const titleElement = judgmentElement.querySelector(
    ".judgment-listing__title a"
  )
  const courtElement = judgmentElement.querySelector(
    ".judgment-listing__court"
  )
  const citationElement = judgmentElement.querySelector(
    ".judgment-listing__neutralcitation"
  )
  const dateElement = judgmentElement.querySelector(
    ".judgment-listing__date"
  )

  return {
    title: titleElement ? titleElement.textContent.trim() : null,
    court: courtElement ? courtElement.textContent.trim() : null,
    citation: citationElement ? citationElement.textContent.trim() : null,
    date: dateElement ? dateElement.getAttribute("datetime") : null,
    url: titleElement ? titleElement.getAttribute("href") : null,
  }
}

async function getResults() {
  try {
    const response = await fetch(
      "https://caselaw.nationalarchives.gov.uk/judgments/search?per_page=10&order=relevance&query=Gina+Miller&from_date_0=&from_date_1=&from_date_2=&to_date_0=&to_date_1=&to_date_2=&party=&judge="
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const html = await response.text()
    console.log(html)
    const result = parseJudgment(html)
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

getResults()