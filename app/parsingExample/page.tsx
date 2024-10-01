import { extractDatesFromXML } from "../parsingExample"

export default async function Index() {
  const xmlContent = `
<p style="text-align:justify;margin-left:0.50in;text-indent:-0.50in">123.<marker name="tab"/>On 13<span style="vertical-align:super;font-size:smaller">th</span> September 2007 Honda&#8217;s lease of Main Site expired. It was not renewed. Honda&#8217;s use of the site has continued as before but there is no suggestion that Honda has any continuing rates liability after that date. The distinction is that there is no lease. The nature of the payments to the Port Company has not changed. Mr. Stacy explained that Honda exports between 20,000 and 23,000 cars a year through the Port, in batches of between 200 and 600. The two hereditaments that made up the premises comprised in the lease at the date that it expired were in due course removed from the 2005 list from that date. The site is back as part of the Docks for rating purposes under the Cumulo.</p>
`

  extractDatesFromXML(xmlContent)
    .then((dates) => console.log(dates))
    .catch((error) => console.error("Error:", error))

  return (
    <>
      <div className="m-5">Hello!</div>
    </>
  )
}
