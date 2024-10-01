import { parseString } from 'xml2js';
import moment from 'moment';

export async function extractDatesFromXML(xmlContent: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    parseString(xmlContent, (err:any, result:any) => {
      if (err) {
        reject(err);
        return;
      }

      const dates: string[] = [];
      const dateRegex = /\b(?:\d{1,2}(?:st|nd|rd|th)?\s+)?(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/g;

      // Recursive function to traverse the parsed XML object
      function traverseObject(obj: any) {
        for (const key in obj) {
          if (typeof obj[key] === 'string') {
            const matches = obj[key].match(dateRegex);
            if (matches) {
              dates.push(...matches);
            }
          } else if (typeof obj[key] === 'object') {
            traverseObject(obj[key]);
          }
        }
      }

      traverseObject(result);

      // Remove duplicates and sort dates
      const uniqueDates = Array.from(new Set(dates)).sort((a, b) => 
        moment(a, 'MMMM YYYY').diff(moment(b, 'MMMM YYYY'))
      );

      resolve(uniqueDates);
    });
  });
}