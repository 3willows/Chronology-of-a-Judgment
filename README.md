# Demo

[here](https://judgment-to-rough-chronology.vercel.app/)

## Initial plan

- Create UI to let user to enter link to a Judgment, e.g. from the ["Find Case Law" service](https://caselaw.nationalarchives.gov.uk/uksc/2019/41) provided by the UK National Archive.

- Make API call to that URL, resulting in a API call to [get the relevant XML file](https://nationalarchives.github.io/ds-find-caselaw-docs/public#tag/Reading-documents/operation/getDocumentByUri).

- Parse the XML to identify all references to dates, and save the following data to a table in the backend.

  - Date mentioned in the Judgment, e.g. " 27th or 28th August 2019".

  - Paragraph reference

  - Sentence in which the date occurs.

- Display the information from the backend on a table for the users, with the dates placed in chronological order.

## Current bottlebeck

- Finding a way to consistently parse the paragraph number.
