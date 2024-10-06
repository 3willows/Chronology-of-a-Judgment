"use server"

import { getResults } from "./fetchParse"


export async function printResult() {
  "use server"
  const answers = await getResults()
  console.log(answers)
}
