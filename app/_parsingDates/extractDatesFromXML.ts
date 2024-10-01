import { parseString } from 'xml2js';
import moment from 'moment';

interface DateSentence {
  date: string;
  sentence: string;
}

export async function extractDatesFromXML(xmlContent: string): Promise<DateSentence[]> {
  return new Promise((resolve, reject) => {
    parseString(xmlContent, (err: any, result: any) => {
      if (err) {
        reject(err);
        return;
      }

      const dateSentences: DateSentence[] = [];
      const dateRegex = /\b(?:\d{1,2}(?:st|nd|rd|th)?\s+)?(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/g;

      // Recursive function to traverse the parsed XML object
      function traverseObject(obj: any) {
        for (const key in obj) {
          if (typeof obj[key] === 'string') {
            const text = obj[key];
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            
            sentences.forEach((sentence: string) => {
              const matches = sentence.match(dateRegex);
              if (matches) {
                matches.forEach(date => {
                  dateSentences.push({
                    date: date,
                    sentence: sentence.trim()
                  });
                });
              }
            });
          } else if (typeof obj[key] === 'object') {
            traverseObject(obj[key]);
          }
        }
      }

      traverseObject(result);

      // Remove duplicates and sort by date
      const uniqueDateSentences = dateSentences.filter((item, index, self) =>
        index === self.findIndex((t) => t.date === item.date && t.sentence === item.sentence)
      ).sort((a, b) => 
        moment(a.date, 'MMMM YYYY').diff(moment(b.date, 'MMMM YYYY'))
      );

      resolve(uniqueDateSentences);
    });
  });
}