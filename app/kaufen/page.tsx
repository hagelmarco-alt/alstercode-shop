import type { Metadata } from "next";

import { Checkout } from "@/components/checkout";
import { DocumentPreview } from "@/components/document-preview";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kaufen",
  description: "Kleinunternehmer-Pack für 12 € über PayPal kaufen und Musterdateien herunterladen.",
};

export default function BuyPage() {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_20rem]">
      <div>
        <p className="text-sm font-medium text-primary">{site.packSku}</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
          Pack kaufen
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted-foreground">
          Rechnung und Zahlungserinnerung, Word und PDF, {site.packPrice}. PayPal
          öffnet paypal.me/alstercode. Eine automatische Lieferung nach der
          Zahlung ist bei PayPal.me nicht zuverlässig. Deshalb stehen die
          Musterdateien hier bereit; den Beleg senden Sie an {site.email}.
        </p>
        <div className="mt-8">
          <Checkout />
        </div>
      </div>
      <aside className="space-y-4">
        <DocumentPreview
          src="/templates/rechnung.html"
          title="Vorschau der Rechnungsvorlage"
        />
        <DocumentPreview
          src="/templates/zahlungserinnerung.html"
          title="Vorschau der Zahlungserinnerung"
        />
      </aside>
    </div>
  );
}
