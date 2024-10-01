import { parseString } from 'xml2js';

interface ParagraphInfo {
  number: string;
  content: string; // Optional: To capture the content of the paragraph
}

export async function extractParagraphNumbersFromXML(xmlContent: string): Promise<ParagraphInfo[]> {
  return new Promise((resolve, reject) => {
    parseString(xmlContent, (err: any, result: any) => {
      if (err) {
        reject(err);
        return;
      }

      const paragraphInfos: ParagraphInfo[] = [];

      // Recursive function to traverse the parsed XML object
      function traverseObject(obj: any) {
        for (const key in obj) {
          if (Array.isArray(obj[key])) {
            obj[key].forEach((item) => traverseObject(item));
          } else if (typeof obj[key] === 'object') {
            traverseObject(obj[key]);
          } else if (typeof obj[key] === 'string') {
            // Do nothing for strings at this level
          }
        }

        // Check for paragraph elements
        if (obj.paragraph) {
          obj.paragraph.forEach((paragraph: any) => {
            const num = paragraph.num ? paragraph.num[0].replace('.', '').trim() : 'N/A';
            const content = paragraph.content ? paragraph.content[0] : '';

            // Push the paragraph number and content into the array
            paragraphInfos.push({
              number: num,
              content: content,
            });
          });
        }
      }

      traverseObject(result);

      // Remove duplicates if necessary
      const uniqueParagraphInfos = Array.from(new Map(paragraphInfos.map(item => [item.number, item])).values());

      resolve(uniqueParagraphInfos);
    });
  });
}