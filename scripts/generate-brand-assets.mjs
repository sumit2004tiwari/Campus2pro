import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
await mkdir("public/images", { recursive: true });
await mkdir("public/icons", { recursive: true });
const cover = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#10234b"/><g fill="none" stroke="#263d62"><path d="M750 0v630M850 0v630M950 0v630M1050 0v630M1150 0v630M650 0v630M600 100h600M600 200h600M600 300h600M600 400h600M600 500h600M600 600h600"/><circle cx="1010" cy="330" r="260"/><circle cx="1010" cy="330" r="170"/></g><rect x="75" y="70" width="48" height="48" rx="12" fill="#265cf2"/><path d="m84 90 15-8 15 8-15 8zM89 94v10q10 8 20 0V94" stroke="white" stroke-width="2" fill="none"/><text x="141" y="106" fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="34">Campus2Pro.</text><text x="76" y="207" fill="#a8c2ff" font-family="Arial,sans-serif" font-size="17" letter-spacing="3">YOUR NEXT CHAPTER STARTS HERE</text><text x="70" y="324" fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="88">From Campus</text><text x="70" y="427" fill="#83a8ff" font-family="Arial,sans-serif" font-weight="bold" font-size="88">to Career.</text><text x="77" y="499" fill="#b4c3dc" font-family="Arial,sans-serif" font-size="26">Build Skills. Build Projects. Get Hired.</text><rect x="77" y="548" width="211" height="40" rx="6" fill="#265cf2"/><text x="94" y="575" fill="white" font-family="Arial,sans-serif" font-size="18">Join the Next Batch →</text><g transform="translate(1000 285)"><rect width="110" height="110" rx="24" fill="#265cf2"/><path d="M28 78 82 24M40 24h42v42" fill="none" stroke="#bff27e" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;
await sharp(Buffer.from(cover)).png().toFile("public/images/og-cover.png");
await sharp(await readFile("public/icon.svg"))
  .resize(180, 180)
  .png()
  .toFile("public/icons/apple-touch-icon.png");
console.log("Brand assets generated.");
