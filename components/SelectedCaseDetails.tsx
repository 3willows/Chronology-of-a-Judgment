// /app/components/SelectedCaseDetails.tsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Judgment } from "@/app/fetchParse"; // Adjust import based on your actual path

interface SelectedCaseDetailsProps {
  selectedCase: Judgment;
}

export function SelectedCaseDetails({ selectedCase }: SelectedCaseDetailsProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Selected Case Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Title:</strong> {selectedCase.title}</p>
        {selectedCase.court && (<p><strong>Court:</strong> {selectedCase.court}</p>)}
        {selectedCase.citation && (<p><strong>Citation:</strong> {selectedCase.citation}</p>)}
        {selectedCase.date && (<p><strong>Date:</strong> {selectedCase.date}</p>)}
        {selectedCase.url && (
          <p><strong>URL:</strong> 
            <a href={`https://caselaw.nationalarchives.gov.uk/${selectedCase.url}`} target="_blank" rel="noopener noreferrer" className="underline">View Case</a>
          </p>
        )}
      </CardContent>
    </Card>
  );
}