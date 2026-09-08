import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const UA = "VorynSiteBuilder/1.0 (contact: voryncapital@gmail.com)";
const OUT = path.resolve("public/images");

// [Commons File title, local slug, purpose]
const items = [
  ["Mackinnon Market, 2025 (02).jpg", "market-mackinnon"],
  ["A young mother working in electricals hardware shop.jpg", "hardware-shop"],
  ["Women Heading to the market.jpg", "market-women"],
  ["Women smallholder farmers in Kenya.jpg", "smallholder-farmers"],
  ["Nairobi City County Skyline.jpg", "nairobi-skyline"],
  ["The Maasai Market Vendors.jpg", "maasai-market"],
  ["Boda boda motorcycle carrying a passenger in Karen, Kenya.jpg", "boda-passenger"],
  ["Bomet-Tea.jpg", "tea-farm"],
  ["Women of the Ochuna Craft Cooperative teaching and reviving traditional Luo crafts for market 06.jpg", "advisory-teaching"],
  ["Vegetable vendor in slum.jpg", "vegetable-vendor"],
  ["African woman rusinga.jpg", "portrait-woman-1"],
  ["Woman sells banana in a market in Kenya after heavy rains.jpg", "portrait-woman-2"],
  ["Boda-boda rider.jpg", "portrait-man-1"],
];

const strip = (s = "") => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

async function info(title) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo" +
    "&iiprop=url|extmetadata&iiurlwidth=1400&titles=" +
    encodeURIComponent("File:" + title);
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  const ii = page.imageinfo?.[0];
  const em = ii?.extmetadata || {};
  return {
    thumb: ii?.thumburl,
    descriptionurl: ii?.descriptionurl,
    artist: strip(em.Artist?.value) || "Unknown",
    license: em.LicenseShortName?.value || "See source",
    licenseUrl: em.LicenseUrl?.value || "",
  };
}

await mkdir(OUT, { recursive: true });
const credits = [];

for (const [title, slug] of items) {
  try {
    const meta = await info(title);
    if (!meta.thumb) {
      console.log("SKIP (no thumb):", title);
      continue;
    }
    const res = await fetch(meta.thumb, { headers: { "User-Agent": UA } });
    if (!res.ok) {
      console.log("FAIL", res.status, title);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(path.join(OUT, slug + ".jpg"), buf);
    credits.push({
      slug,
      title: title.replace(/\.jpg$/i, ""),
      artist: meta.artist,
      license: meta.license,
      licenseUrl: meta.licenseUrl,
      source: meta.descriptionurl,
    });
    console.log(`OK  ${slug}.jpg  (${(buf.length / 1024).toFixed(0)} KB)  — ${meta.license}`);
  } catch (e) {
    console.log("ERR", title, e.message);
  }
}

await writeFile(path.resolve("src/lib/image-credits.json"), JSON.stringify(credits, null, 2));
console.log(`\nSaved ${credits.length} images + credits.`);
