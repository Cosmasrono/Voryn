const UA = "VorynSiteBuilder/1.0 (contact: voryncapital@gmail.com)";
const queries = [
  "Kenya shopkeeper kiosk",
  "Duka shop Kenya",
  "Kenya small business owner",
  "Kenyan man portrait smiling",
  "African woman portrait smiling",
  "Kenya cooperative meeting",
  "Maasai market",
  "Kenya tailor seamstress",
  "Kenya hardware shop",
  "Kenya boda boda motorcycle",
  "Nairobi business district",
  "Kenya tea farmer",
];
async function search(q) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
    `&gsrsearch=filetype:bitmap ${encodeURIComponent(q)}` +
    "&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1600&format=json";
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  const j = await r.json();
  const pages = j?.query?.pages ? Object.values(j.query.pages) : [];
  return pages
    .map((p) => {
      const ii = p.imageinfo?.[0];
      if (!ii) return null;
      return { title: p.title.replace(/^File:/, ""), w: ii.width, h: ii.height, mime: ii.mime, ratio: (ii.width / ii.height).toFixed(2) };
    })
    .filter((x) => x && x.mime === "image/jpeg" && x.w >= 1000);
}
for (const q of queries) {
  console.log("\n### " + q);
  try {
    (await search(q)).forEach((x, i) => console.log(`${i}. [${x.ratio}] ${x.w}x${x.h} | ${x.title}`));
  } catch (e) { console.log("  ERR", e.message); }
}
