"use server"; 

import { fetchParse } from "./fetchParse";

const baseUrl = "https://caselaw.nationalarchives.gov.uk/judgments/search";
const query = "gina miller";

// Create the full URL
const fullUrl = `${baseUrl}?query=${encodeURIComponent(query)}`;

export async function printResult() {
    "use server"; 
    const answers = await fetchParse(fullUrl); 
    return answers;
}