// Lists candidate images from Wikimedia Commons for several themes.
const UA = "VorynSiteBuilder/1.0 (contact: voryncapital@gmail.com)";

const queries = [
  "Kenya market vendor",
  "Kenya shop duka small business",
  "Nairobi street trader",
  "Kenya market women",
  "Kenya farmer smallholder",
  "Africa business training workshop",
  "Kenya woman entrepreneur portrait",
  "Nairobi skyline city",
  "Kenya mobile money mpesa",
  "African man market trader portrait",
];

async function search(q) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
    `&gsrsearch=filetype:bitmap ${encodeURIComponent(q)}` +
    "&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=1600&format=json";
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  const j = await r.json();
  const pages = j?.query?.pages ? Object.values(j.query.pages) : [];
  return pages
    .map((p) => {
      const ii = p.imageinfo?.[0];
      if (!ii) return null;
      const em = ii.extmetadata || {};
      return {
        title: p.title.replace(/^File:/, ""),
        w: ii.width,
        h: ii.height,
        mime: ii.mime,
        ratio: (ii.width / ii.height).toFixed(2),
        license: em.LicenseShortName?.value || "?",
        thumb: ii.thumburl?.split("?")[0],
      };
    })
    .filter(Boolean)
    .filter((x) => x.mime === "image/jpeg" && x.w >= 1000);
}

for (const q of queries) {
  console.log("\n### " + q);
  try {
    const res = await search(q);
    res.forEach((x, i) =>
      console.log(
        `${i}. [${x.ratio}] ${x.w}x${x.h} ${x.license} | ${x.title}`
      )
    );
  } catch (e) {
    console.log("  ERR", e.message);
  }
}
