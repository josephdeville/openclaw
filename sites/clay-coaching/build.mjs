import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const templatePath = resolve(root, "src/index.template.html");
const outputPath = resolve(root, "dist/clay-coaching/index.html");

const pricingTableId = process.env.STRIPE_PRICING_TABLE_ID;
const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

if (!pricingTableId || !publishableKey) {
  throw new Error(
    "Missing STRIPE_PRICING_TABLE_ID or STRIPE_PUBLISHABLE_KEY. Copy .env.example values into your Vercel project environment.",
  );
}

const escapeHtmlAttribute = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const template = await readFile(templatePath, "utf8");
const html = template
  .replaceAll("{{STRIPE_PRICING_TABLE_ID}}", escapeHtmlAttribute(pricingTableId))
  .replaceAll("{{STRIPE_PUBLISHABLE_KEY}}", escapeHtmlAttribute(publishableKey));

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, html);
