import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "content", "packs");
const workRoot = join(root, "tmp-pack", "extras");

const packs = [
  ["01-geschaeftsbriefe", "ACK-GB-19", "Geschäftsbriefe (Angebot/AB/Mahnung/Storno)"],
  ["02-angebot-vorlage", "ACK-AN-12", "Angebots-/Kostenvoranschlag-Vorlage"],
  ["03-website-textpaket-handwerk", "ACK-WH-29", "Website-Textpaket Handwerk"],
  ["04-mahnwesen-1-3", "ACK-MH-19", "Mahnwesen Stufe 1–3"],
  ["05-storno-paket", "ACK-ST-12", "Storno-Paket"],
  ["06-nda-light", "ACK-ND-19", "NDA light (keine Anwaltsprüfung)"],
  ["07-leistungsbeschreibung", "ACK-LB-15", "Leistungsbeschreibung"],
  ["08-agb-kurz", "ACK-AG-24", "Kurz-AGB B2B (Entwurfshilfe, kein Anwalt)"],
  ["09-website-textpaket-dienstleister", "ACK-WD-29", "Website-Textpaket Dienstleister"],
  ["10-email-paket-kunden", "ACK-EK-16", "E-Mail-Paket Kunden"],
  ["11-email-paket-akquise", "ACK-EA-14", "E-Mail-Paket Akquise"],
  ["12-abnahmeprotokoll", "ACK-AP-12", "Abnahmeprotokoll"],
  ["13-honorarvereinbarung", "ACK-HV-18", "Honorarvereinbarung § 19"],
  ["14-terminbestaetigung", "ACK-TB-09", "Terminbestätigung"],
];

function liesmich(slug, sku, title) {
  return `ALSTERCODE – ${title}
SKU: ${sku}
Datei: ${slug}.tar.gz

Minimal-Platzhalter. Volle HTML-Archive folgen später.

Nur erfundene Musterstadt-Daten. Keine Rechtsberatung, keine
Steuerberatung, keine Anwaltsprüfung. AGB/NDA sind Entwurfshilfen.

Marco Hagel · ALSTERCODE · Laukamp 7 · 22417 Hamburg
hagel@alstercode-ai.de
`;
}

function placeholder(slug, sku, title) {
  return `[Platzhalter] ${title}
${sku}

Kurzer Ersatz. Inhalt später durch das volle HTML-Archiv ersetzen.
Musterstadt. Keine Rechts- oder Steuerberatung.
`;
}

mkdirSync(outDir, { recursive: true });
mkdirSync(workRoot, { recursive: true });

for (const [slug, sku, title] of packs) {
  const dir = join(workRoot, slug);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const stub = `${slug}.txt`;
  writeFileSync(join(dir, "LIESMICH.txt"), liesmich(slug, sku, title), "utf8");
  writeFileSync(join(dir, stub), placeholder(slug, sku, title), "utf8");
  const archive = join(outDir, `${slug}.tar.gz`);
  execFileSync("tar", ["-czf", archive, "-C", dir, "LIESMICH.txt", stub]);
  console.log(archive);
}

console.log(`Wrote ${packs.length} minimal packs to ${outDir}`);
