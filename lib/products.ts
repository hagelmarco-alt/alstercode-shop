import { site } from "@/lib/site";

export type ExtraProduct = {
  slug: string;
  sku: string;
  priceEuro: number;
  title: string;
  description: string;
  contents: readonly string[];
  /** Extra legal note shown on the buy page (AGB/NDA are draft aids). */
  draftAid: boolean;
};

export function formatEuro(amount: number): string {
  return `${amount.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;
}

export function paypalMeUrl(euro: number): string {
  return `${site.paypalMe}/${euro}`;
}

export function extraPackFilename(slug: string): string {
  return `${slug}.tar.gz`;
}

export const extraProducts: readonly ExtraProduct[] = [
  {
    slug: "01-geschaeftsbriefe",
    sku: "ACK-GB-19",
    priceEuro: 19,
    title: "Geschäftsbriefe (Angebot/AB/Mahnung/Storno)",
    description:
      "Vier Geschäftsbriefe für den Alltag: Angebot, Auftragsbestätigung, Mahnung und Storno. Nur erfundene Musterstadt-Daten.",
    contents: [
      "Angebot",
      "Auftragsbestätigung",
      "Mahnung",
      "Stornoschreiben",
    ],
    draftAid: false,
  },
  {
    slug: "02-angebot-vorlage",
    sku: "ACK-AN-12",
    priceEuro: 12,
    title: "Angebots-/Kostenvoranschlag-Vorlage",
    description:
      "Eine knappe Vorlage für Angebot oder Kostenvoranschlag mit Positionen, Gültigkeit und §-19-Hinweis.",
    contents: ["Angebot / Kostenvoranschlag"],
    draftAid: false,
  },
  {
    slug: "03-website-textpaket-handwerk",
    sku: "ACK-WH-29",
    priceEuro: 29,
    title: "Website-Textpaket Handwerk",
    description:
      "Textbausteine für eine Handwerks-Website: Startseite, Leistungen, Ablauf, Über uns und Kontakt. Zum Anpassen, kein Generator.",
    contents: [
      "Startseite",
      "Leistungen",
      "Ablauf",
      "Über uns",
      "Kontakt",
    ],
    draftAid: false,
  },
  {
    slug: "04-mahnwesen-1-3",
    sku: "ACK-MH-19",
    priceEuro: 19,
    title: "Mahnwesen Stufe 1–3",
    description:
      "Drei Mahnstufen vom höflichen Hinweis bis zur letzten Zahlungsaufforderung. Keine Rechtsberatung, keine Inkassodrohung als Service.",
    contents: [
      "Stufe 1 – Zahlungserinnerung",
      "Stufe 2 – Mahnung",
      "Stufe 3 – Letzte Zahlungsaufforderung",
    ],
    draftAid: false,
  },
  {
    slug: "05-storno-paket",
    sku: "ACK-ST-12",
    priceEuro: 12,
    title: "Storno-Paket",
    description:
      "Schreiben zur Auftragsstornierung – vom Auftraggeber und als Bestätigung an den Kunden. Nur Musterstadt-Daten.",
    contents: [
      "Storno durch Auftraggeber",
      "Stornobestätigung an Kunden",
    ],
    draftAid: false,
  },
  {
    slug: "06-nda-light",
    sku: "ACK-ND-19",
    priceEuro: 19,
    title: "NDA light (keine Anwaltsprüfung)",
    description:
      "Kurze Entwurfshilfe für eine Vertraulichkeitsvereinbarung zwischen zwei Parteien. Keine Anwaltsprüfung, kein Vertragsersatz.",
    contents: ["NDA light (Entwurfshilfe)"],
    draftAid: true,
  },
  {
    slug: "07-leistungsbeschreibung",
    sku: "ACK-LB-15",
    priceEuro: 15,
    title: "Leistungsbeschreibung",
    description:
      "Gliederung für Umfang, Liefergegenstand, nicht enthaltene Leistungen und Abnahme. Zum Ausfüllen, keine Projektberatung.",
    contents: ["Leistungsbeschreibung"],
    draftAid: false,
  },
  {
    slug: "08-agb-kurz",
    sku: "ACK-AG-24",
    priceEuro: 24,
    title: "Kurz-AGB B2B (Entwurfshilfe, kein Anwalt)",
    description:
      "Kurze B2B-Entwurfshilfe für Kleinunternehmer. Keine Allgemeinen Geschäftsbedingungen im Rechtssinne ohne eigene Prüfung.",
    contents: ["Kurz-AGB B2B (Entwurfshilfe)"],
    draftAid: true,
  },
  {
    slug: "09-website-textpaket-dienstleister",
    sku: "ACK-WD-29",
    priceEuro: 29,
    title: "Website-Textpaket Dienstleister",
    description:
      "Textbausteine für Dienstleister-Websites: Nutzen, Leistungen, Arbeitsweise, Vertrauen und Kontakt.",
    contents: [
      "Startseite",
      "Leistungen",
      "Arbeitsweise",
      "Über uns",
      "Kontakt",
    ],
    draftAid: false,
  },
  {
    slug: "10-email-paket-kunden",
    sku: "ACK-EK-16",
    priceEuro: 16,
    title: "E-Mail-Paket Kunden",
    description:
      "Kurze Kundenmails: Auftragseingang, Rückfrage, Lieferung, Zahlungserinnerung und Abschluss.",
    contents: [
      "Auftragseingang",
      "Rückfrage",
      "Lieferung / Abgabe",
      "Zahlungserinnerung",
      "Abschluss",
    ],
    draftAid: false,
  },
  {
    slug: "11-email-paket-akquise",
    sku: "ACK-EA-14",
    priceEuro: 14,
    title: "E-Mail-Paket Akquise",
    description:
      "Zurückhaltende Erstansprache, Nachfass und Absage – ohne Druckformeln. Keine Vertriebsberatung.",
    contents: ["Erstansprache", "Nachfassen", "Absage / Danke"],
    draftAid: false,
  },
  {
    slug: "12-abnahmeprotokoll",
    sku: "ACK-AP-12",
    priceEuro: 12,
    title: "Abnahmeprotokoll",
    description:
      "Einfaches Protokoll zur Abnahme von Werk oder Leistung: Gegenstand, Mängel, Unterschriften. Nur Muster.",
    contents: ["Abnahmeprotokoll"],
    draftAid: false,
  },
  {
    slug: "13-honorarvereinbarung",
    sku: "ACK-HV-18",
    priceEuro: 18,
    title: "Honorarvereinbarung § 19",
    description:
      "Kurze Honorarvereinbarung mit Kleinunternehmer-Hinweis nach § 19 UStG. Keine Steuerberatung, keine Anwaltsprüfung.",
    contents: ["Honorarvereinbarung"],
    draftAid: true,
  },
  {
    slug: "14-terminbestaetigung",
    sku: "ACK-TB-09",
    priceEuro: 9,
    title: "Terminbestätigung",
    description:
      "Kurze Bestätigung für Termin, Ort, Teilnehmer und Absageweg. Nur erfundene Musterstadt-Daten.",
    contents: ["Terminbestätigung"],
    draftAid: false,
  },
] as const;

const extraBySlug = new Map(extraProducts.map((product) => [product.slug, product]));
const extraBySku = new Map(extraProducts.map((product) => [product.sku, product]));

export function findExtraProduct(id: string): ExtraProduct | undefined {
  return extraBySlug.get(id) ?? extraBySku.get(id);
}

export function isCorePackSku(id: string): boolean {
  return id === site.packSku || id === "kleinunternehmer-pack";
}
