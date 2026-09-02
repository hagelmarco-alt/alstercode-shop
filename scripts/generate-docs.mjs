import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const downloads = join(root, "public", "downloads");

const navy = "1E3A5F";
const blue = "2B4C7E";
const gray = "5C6770";
const muted = "6B7580";
const line = { style: BorderStyle.SINGLE, size: 6, color: "2C3E50" };
const hair = { style: BorderStyle.SINGLE, size: 4, color: "D7DDE3" };
const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: none, bottom: none, left: none, right: none };

function run(text, opts = {}) {
  return new TextRun({
    text,
    font: opts.font ?? "Calibri",
    size: opts.size ?? 22,
    bold: opts.bold,
    color: opts.color ?? "2C3E50",
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 80, before: opts.before ?? 0 },
    alignment: opts.align,
    children: [run(text, opts)],
  });
}

function cell(text, width, opts = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: opts.borders ?? {
      top: none,
      left: none,
      right: none,
      bottom: opts.bottom ?? hair,
    },
    margins: { top: 60, bottom: 60, left: 40, right: 40 },
    children: [
      new Paragraph({
        alignment: opts.align,
        children: [run(text, { size: opts.size ?? 20, bold: opts.bold, color: opts.color })],
      }),
    ],
  });
}

function invoiceDoc() {
  return new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [run("MUSTER – Daten ersetzen", { size: 18, color: "C0392B", bold: true })],
          }),
          new Paragraph({
            children: [run("Mira Soltau", { font: "Georgia", size: 44, bold: true, color: blue })],
          }),
          p("SATZ UND TEXT", { size: 18, color: muted, after: 200 }),
          p("Keplerweg 14 · 99084 Musterstadt · Tel. 0361 00000-00 · post@soltau-text.example", {
            size: 18,
            color: muted,
          }),
          p("Beispielbau GmbH", { bold: true, before: 200 }),
          p("Frau Inge Beispiel"),
          p("Industriestraße 8"),
          p("12345 Musterstadt", { after: 200 }),
          p("Rechnungsnr.: 2026-008", { size: 20 }),
          p("Datum: 10.08.2026", { size: 20 }),
          p("Leistungszeitraum: 28.07.2026 – 07.08.2026", { size: 20 }),
          p("Zahlungsziel: 24.08.2026", { size: 20 }),
          p("Kundennummer: K-1042", { size: 20 }),
          p("Steuernummer: 156/208/12345", { size: 20, after: 240 }),
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 160 },
            children: [run("Rechnung 2026-008", { font: "Georgia", size: 36, bold: true, color: blue })],
          }),
          p("Sehr geehrte Damen und Herren,"),
          p("für die nachstehend aufgeführten Leistungen erlaube ich mir, wie folgt zu berechnen.", {
            after: 200,
          }),
          new Table({
            width: { size: 9638, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell("POS.", 700, { bold: true, size: 18, color: gray, bottom: line }),
                  cell("BEZEICHNUNG", 4200, { bold: true, size: 18, color: gray, bottom: line }),
                  cell("MENGE", 1000, {
                    bold: true,
                    size: 18,
                    color: gray,
                    align: AlignmentType.RIGHT,
                    bottom: line,
                  }),
                  cell("EINHEIT", 1400, { bold: true, size: 18, color: gray, bottom: line }),
                  cell("EINZELPREIS EUR", 1400, {
                    bold: true,
                    size: 18,
                    color: gray,
                    align: AlignmentType.RIGHT,
                    bottom: line,
                  }),
                  cell("BETRAG EUR", 938, {
                    bold: true,
                    size: 18,
                    color: gray,
                    align: AlignmentType.RIGHT,
                    bottom: line,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  cell("1", 700),
                  cell("Website-Texte Startseite und Leistungsseite, inkl. zwei Korrekturläufen", 4200),
                  cell("1", 1000, { align: AlignmentType.RIGHT }),
                  cell("Pauschale", 1400),
                  cell("180,00", 1400, { align: AlignmentType.RIGHT }),
                  cell("180,00", 938, { align: AlignmentType.RIGHT }),
                ],
              }),
              new TableRow({
                children: [
                  cell("2", 700),
                  cell("Kurzfassung für Suchmaschinen-Snippets", 4200),
                  cell("4", 1000, { align: AlignmentType.RIGHT }),
                  cell("Stück", 1400),
                  cell("30,00", 1400, { align: AlignmentType.RIGHT }),
                  cell("120,00", 938, { align: AlignmentType.RIGHT }),
                ],
              }),
              new TableRow({
                children: [
                  cell("Gesamtbetrag", 8700, { bold: true, size: 24, borders: noBorders }),
                  cell("300,00 EUR", 938, {
                    bold: true,
                    size: 24,
                    align: AlignmentType.RIGHT,
                    borders: noBorders,
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ spacing: { before: 240 }, children: [] }),
          new Table({
            width: { size: 9638, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: noBorders,
                    shading: { type: ShadingType.CLEAR, fill: "F1F3F5" },
                    margins: { top: 100, bottom: 100, left: 120, right: 120 },
                    children: [
                      new Paragraph({
                        children: [
                          run("Kein Ausweis von Umsatzsteuer. ", { bold: true, size: 20 }),
                          run(
                            "Für diese Leistung gilt die Steuerbefreiung für Kleinunternehmer gemäß § 19 UStG. Ein Vorsteuerabzug beim Leistungsempfänger ist aus dieser Rechnung nicht möglich.",
                            { size: 20 }
                          ),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          p("ZAHLUNG", { bold: true, size: 22, before: 280 }),
          p(
            "Bitte überweisen Sie den Gesamtbetrag bis zum 24.08.2026 unter Angabe der Rechnungsnummer als Verwendungszweck auf folgendes Konto:"
          ),
          p("Kontoinhaber: Mira Soltau"),
          p("IBAN: DE00 0000 0000 0000 0000 00"),
          p("BIC: MUSTDEFFXXX"),
          p("Kreditinstitut: Musterbank AG"),
          p("Verwendungszweck: 2026-008"),
          p("Vielen Dank für Ihren Auftrag.", { before: 160 }),
        ],
      },
    ],
  });
}

function reminderDoc() {
  return new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [run("MUSTER – Daten ersetzen", { size: 18, color: "C0392B", bold: true })],
          }),
          new Paragraph({
            children: [run("Mira Soltau", { font: "Georgia", size: 44, bold: true, color: navy })],
          }),
          p("SATZ UND TEXT", { size: 18, color: muted, after: 200 }),
          p("Keplerweg 14 · 99084 Musterstadt · Tel. 0361 00000-00 · post@soltau-text.example", {
            size: 18,
            color: muted,
          }),
          p("Beispielbau GmbH", { bold: true, before: 200 }),
          p("Frau Inge Beispiel"),
          p("Industriestraße 8"),
          p("12345 Musterstadt", { after: 200 }),
          p("Schreiben vom: 31.08.2026", { size: 20 }),
          p("Rechnung-Nr.: 2026-008", { size: 20 }),
          p("Rechnungsdatum: 10.08.2026", { size: 20 }),
          p("Kundennummer: K-1042", { size: 20 }),
          p("Steuernummer: 156/208/12345", { size: 20, after: 240 }),
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 160 },
            children: [run("Zahlungserinnerung", { font: "Georgia", size: 40, bold: true, color: navy })],
          }),
          p("Sehr geehrte Damen und Herren,"),
          p(
            "zu meiner Rechnung Nr. 2026-008 vom 10.08.2026 über 300,00 EUR habe ich bisher keinen Zahlungseingang feststellen können. Falls sich die Überweisung mit diesem Schreiben gekreuzt hat, betrachten Sie es bitte als gegenstandslos."
          ),
          p(
            "Andernfalls bitte ich Sie, den offenen Betrag bis zum 09.09.2026 zu überweisen. Eine erste Mahnung oder Verzugszinsen sind mit diesem Schreiben nicht verbunden.",
            { after: 200 }
          ),
          new Table({
            width: { size: 9638, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  cell("RECHNUNG", 1800, { bold: true, size: 18, color: gray, bottom: line }),
                  cell("DATUM", 1800, { bold: true, size: 18, color: gray, bottom: line }),
                  cell("FÄLLIG AM", 1800, { bold: true, size: 18, color: gray, bottom: line }),
                  cell("BETRAG EUR", 2119, {
                    bold: true,
                    size: 18,
                    color: gray,
                    align: AlignmentType.RIGHT,
                    bottom: line,
                  }),
                  cell("OFFEN EUR", 2119, {
                    bold: true,
                    size: 18,
                    color: gray,
                    align: AlignmentType.RIGHT,
                    bottom: line,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  cell("2026-008", 1800),
                  cell("10.08.2026", 1800),
                  cell("24.08.2026", 1800),
                  cell("300,00", 2119, { align: AlignmentType.RIGHT }),
                  cell("300,00", 2119, { align: AlignmentType.RIGHT }),
                ],
              }),
              new TableRow({
                children: [
                  cell("Offener Betrag", 7519, { bold: true, size: 24, color: navy, borders: noBorders }),
                  cell("300,00 EUR", 2119, {
                    bold: true,
                    size: 24,
                    color: navy,
                    align: AlignmentType.RIGHT,
                    borders: noBorders,
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ spacing: { before: 240 }, children: [] }),
          new Table({
            width: { size: 9638, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: noBorders,
                    shading: { type: ShadingType.CLEAR, fill: "F1F3F5" },
                    margins: { top: 100, bottom: 100, left: 120, right: 120 },
                    children: [
                      p(
                        "Der zugrunde liegende Umsatz unterliegt der Steuerbefreiung für Kleinunternehmer gemäß § 19 UStG. Es wurde und wird keine Umsatzsteuer ausgewiesen.",
                        { size: 20 }
                      ),
                    ],
                  }),
                ],
              }),
            ],
          }),
          p("ZAHLUNGSDATEN", { bold: true, size: 22, before: 280 }),
          p("Bitte überweisen Sie den offenen Betrag auf folgendes Konto:"),
          p("Kontoinhaber: Mira Soltau"),
          p("IBAN: DE00 0000 0000 0000 0000 00"),
          p("BIC: MUSTDEFFXXX"),
          p("Kreditinstitut: Musterbank AG"),
          p("Verwendungszweck: 2026-008"),
          p("Mit freundlichen Grüßen", { before: 200 }),
          p("Mira Soltau"),
        ],
      },
    ],
  });
}

async function buildPdf(title, lines) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.17, 0.24, 0.31);
  const accent = rgb(0.17, 0.3, 0.49);
  let y = 800;
  page.drawText("MUSTER – Daten ersetzen", { x: 360, y, size: 9, font: bold, color: rgb(0.75, 0.22, 0.16) });
  y -= 28;
  page.drawText(title, { x: 48, y, size: 20, font: bold, color: accent });
  y -= 22;
  for (const line of lines) {
    const size = line.heading ? 11 : 10;
    const font = line.heading || line.bold ? bold : regular;
    const wrapped = wrap(line.text, 86);
    for (const part of wrapped) {
      if (y < 48) break;
      page.drawText(part, { x: 48, y, size, font, color: ink });
      y -= size + 5;
    }
    y -= line.gap ?? 2;
  }
  return Buffer.from(await pdf.save());
}

function wrap(text, width) {
  const words = text.split(/\s+/);
  const rows = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > width) {
      if (current) rows.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) rows.push(current);
  return rows;
}

const readme = `ALSTERCODE – Kleinunternehmer-Pack
=================================

Inhalt
------
- Rechnung-Muster.docx / .pdf
- Zahlungserinnerung-Muster.docx / .pdf

Die Dateien enthalten erfundene Musterdaten (Mira Soltau, Musterstadt,
Beispielbau GmbH). Ersetzen Sie Name, Anschrift, Steuernummer, IBAN,
Leistungen und Beträge durch Ihre eigenen Angaben.

§ 19 UStG
---------
Die Klausel zur Steuerbefreiung für Kleinunternehmer ist bereits eingesetzt.
Prüfen Sie vor dem Versand, ob § 19 UStG für Sie gilt.

Keine Steuerberatung
--------------------
Die Vorlagen ersetzen keine rechtliche oder steuerliche Prüfung.

Kontakt
-------
Marco Hagel · ALSTERCODE
Laukamp 7 · 22417 Hamburg
hagel@alstercode-ai.de
`;

export async function getPackFiles() {
  return {
    "Rechnung-Muster.docx": Buffer.from(await Packer.toBuffer(invoiceDoc())),
    "Zahlungserinnerung-Muster.docx": Buffer.from(await Packer.toBuffer(reminderDoc())),
    "LIESMICH.txt": Buffer.from(readme, "utf8"),
    "Rechnung-Muster.pdf": await buildPdf("Rechnung 2026-008", [
      { text: "Mira Soltau · Satz und Text · Keplerweg 14 · 99084 Musterstadt", gap: 8 },
      { text: "An: Beispielbau GmbH, Frau Inge Beispiel, Industriestraße 8, 12345 Musterstadt", gap: 8 },
      { text: "Rechnungsnr. 2026-008 · Datum 10.08.2026 · Leistungszeitraum 28.07.2026 – 07.08.2026 · Zahlungsziel 24.08.2026 · Kd. K-1042 · StNr. 156/208/12345", gap: 12 },
      { text: "Sehr geehrte Damen und Herren, für die nachstehend aufgeführten Leistungen erlaube ich mir, wie folgt zu berechnen.", gap: 10 },
      { text: "1  Website-Texte Startseite und Leistungsseite, inkl. zwei Korrekturläufen  1 Pauschale  180,00 EUR", gap: 4 },
      { text: "2  Kurzfassung für Suchmaschinen-Snippets  4 Stück  120,00 EUR", gap: 8 },
      { text: "Gesamtbetrag 300,00 EUR", bold: true, gap: 12 },
      { text: "Kein Ausweis von Umsatzsteuer. Für diese Leistung gilt die Steuerbefreiung für Kleinunternehmer gemäß § 19 UStG. Ein Vorsteuerabzug beim Leistungsempfänger ist aus dieser Rechnung nicht möglich.", gap: 12 },
      { text: "ZAHLUNG", heading: true },
      { text: "Bitte überweisen Sie den Gesamtbetrag bis zum 24.08.2026 unter Angabe der Rechnungsnummer." },
      { text: "Kontoinhaber Mira Soltau · IBAN DE00 0000 0000 0000 0000 00 · BIC MUSTDEFFXXX · Musterbank AG · Verwendungszweck 2026-008" },
    ]),
    "Zahlungserinnerung-Muster.pdf": await buildPdf("Zahlungserinnerung", [
      { text: "Mira Soltau · Satz und Text · Keplerweg 14 · 99084 Musterstadt", gap: 8 },
      { text: "An: Beispielbau GmbH, Frau Inge Beispiel, Industriestraße 8, 12345 Musterstadt", gap: 8 },
      { text: "Schreiben vom 31.08.2026 · Rechnung 2026-008 · Rechnungsdatum 10.08.2026 · Kd. K-1042 · StNr. 156/208/12345", gap: 12 },
      { text: "Sehr geehrte Damen und Herren, zu meiner Rechnung Nr. 2026-008 vom 10.08.2026 über 300,00 EUR habe ich bisher keinen Zahlungseingang feststellen können. Falls sich die Überweisung mit diesem Schreiben gekreuzt hat, betrachten Sie es bitte als gegenstandslos.", gap: 8 },
      { text: "Andernfalls bitte ich Sie, den offenen Betrag bis zum 09.09.2026 zu überweisen. Eine erste Mahnung oder Verzugszinsen sind mit diesem Schreiben nicht verbunden.", gap: 10 },
      { text: "Rechnung 2026-008 · 10.08.2026 · fällig 24.08.2026 · offen 300,00 EUR", gap: 8 },
      { text: "Offener Betrag 300,00 EUR", bold: true, gap: 12 },
      { text: "Der zugrunde liegende Umsatz unterliegt der Steuerbefreiung für Kleinunternehmer gemäß § 19 UStG. Es wurde und wird keine Umsatzsteuer ausgewiesen.", gap: 12 },
      { text: "ZAHLUNGSDATEN", heading: true },
      { text: "Kontoinhaber Mira Soltau · IBAN DE00 0000 0000 0000 0000 00 · BIC MUSTDEFFXXX · Musterbank AG · Verwendungszweck 2026-008" },
    ]),
  };
}

export async function generateDocs() {
  const files = await getPackFiles();
  mkdirSync(downloads, { recursive: true });
  for (const [name, data] of Object.entries(files)) {
    writeFileSync(join(downloads, name), data);
  }
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
 if (isMain) {
  await generateDocs();
  console.log("Documents generated.");
}
