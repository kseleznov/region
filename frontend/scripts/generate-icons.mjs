import sharp from "sharp";
import { readFileSync, mkdirSync } from "fs";

mkdirSync("public/icons", { recursive: true });

const svgContent = readFileSync("public/logo.svg", "utf-8");
const BG = "#1a1a1a";

async function generateIcon(size) {
  const padding = Math.round(size * 0.15);
  const logoWidth = size - padding * 2;
  // logo viewBox is 177×70, maintain ratio
  const logoHeight = Math.round(logoWidth * (70 / 177));
  const logoTop = Math.round((size - logoHeight) / 2);

  const background = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${BG}" rx="${Math.round(size * 0.18)}"/>
    </svg>`,
  );

  const logoBuffer = await sharp(Buffer.from(svgContent))
    .resize(logoWidth, logoHeight)
    .png()
    .toBuffer();

  await sharp(background)
    .composite([{ input: logoBuffer, top: logoTop, left: padding }])
    .png()
    .toFile(`public/icons/icon-${size}.png`);

  console.log(`✓ icon-${size}.png`);
}

await generateIcon(180);
await generateIcon(192);
await generateIcon(512);
