export const site = {
  name: "ALSTERCODE",
  owner: "Marco Hagel",
  street: "Laukamp 7",
  zip: "22417",
  city: "Hamburg",
  email: "hagel@alstercode-ai.de",
  paypalMe: "https://www.paypal.me/alstercode",
  paypalPack: "https://www.paypal.me/alstercode/12",
  paypalKurztext: "https://www.paypal.me/alstercode/49",
  packPrice: "12,00 €",
  kurztextPrice: "49,00 €",
  packSku: "ACK-KU-12",
} as const;

export const packFiles = [
  {
    href: "/api/download/Rechnung-Muster.docx",
    label: "Rechnung (Word)",
    name: "Rechnung-Muster.docx",
  },
  {
    href: "/api/download/Rechnung-Muster.pdf",
    label: "Rechnung (PDF)",
    name: "Rechnung-Muster.pdf",
  },
  {
    href: "/api/download/Zahlungserinnerung-Muster.docx",
    label: "Zahlungserinnerung (Word)",
    name: "Zahlungserinnerung-Muster.docx",
  },
  {
    href: "/api/download/Zahlungserinnerung-Muster.pdf",
    label: "Zahlungserinnerung (PDF)",
    name: "Zahlungserinnerung-Muster.pdf",
  },
  {
    href: "/api/pack",
    label: "Gesamtpaket (ZIP)",
    name: "alstercode-kleinunternehmer-pack.zip",
  },
] as const;
