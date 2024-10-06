"use server"

import { fetchParse } from "./fetchParse"

export async function findPotentialCases(query : string) {
  "use server"
  const baseUrl = "https://caselaw.nationalarchives.gov.uk/judgments/search"
  const fullUrl = `${baseUrl}?query=${encodeURIComponent(query)}`
  const potentialCases = await fetchParse(fullUrl)
  return potentialCases
}
