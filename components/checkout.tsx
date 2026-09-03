"use client";

import { useId, useState } from "react";
import { Download, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatEuro, paypalMeUrl, type ExtraProduct } from "@/lib/products";
import { packFiles, site } from "@/lib/site";

export type CheckoutFile = {
  href: string;
  label: string;
  name: string;
};

export type CheckoutProduct = {
  sku: string;
  title: string;
  priceEuro: number;
  paypalUrl: string;
  emailSubject: string;
  files: readonly CheckoutFile[];
};

export const corePackCheckout: CheckoutProduct = {
  sku: site.packSku,
  title: "Kleinunternehmer-Pack",
  priceEuro: 12,
  paypalUrl: site.paypalPack,
  emailSubject: "PayPal-Beleg Kleinunternehmer-Pack",
  files: packFiles,
};

export function checkoutFromExtra(product: ExtraProduct): CheckoutProduct {
  const filename = `${product.slug}.tar.gz`;
  return {
    sku: product.sku,
    title: product.title,
    priceEuro: product.priceEuro,
    paypalUrl: paypalMeUrl(product.priceEuro),
    emailSubject: `PayPal-Beleg ${product.sku}`,
    files: [
      {
        href: `/api/extra/${product.slug}`,
        label: "Gesamtpaket (tar.gz)",
        name: filename,
      },
    ],
  };
}

export function Checkout({
  product = corePackCheckout,
}: {
  product?: CheckoutProduct;
}) {
  const [agreed, setAgreed] = useState(false);
  const [openedPayPal, setOpenedPayPal] = useState(false);
  const checkboxId = useId();
  const priceLabel = formatEuro(product.priceEuro);

  function openPayPal() {
    window.open(product.paypalUrl, "_blank", "noopener,noreferrer");
    setOpenedPayPal(true);
  }

  return (
    <div className="space-y-8">
      <ol className="space-y-3 text-sm leading-6 text-muted-foreground">
        <li>
          <span className="font-medium text-foreground">1. Widerruf.</span>{" "}
          Digitale Vorlagen können Sie nach dem Download nicht zurückgeben.
          Stimmen Sie deshalb ausdrücklich zu.
        </li>
        <li>
          <span className="font-medium text-foreground">2. Zahlen.</span>{" "}
          {priceLabel} über PayPal an {site.name}. Das Konto lautet
          paypal.me/alstercode.
        </li>
        <li>
          <span className="font-medium text-foreground">3. Herunterladen.</span>{" "}
          Die Musterdateien stehen danach auf dieser Seite bereit. Eine
          automatische Freischaltung nach PayPal.me ist technisch nicht
          zuverlässig – der Download erfolgt auf Vertrauensbasis.
        </li>
        <li>
          <span className="font-medium text-foreground">4. Beleg senden.</span>{" "}
          Schicken Sie den PayPal-Beleg an {site.email}. Auf Wunsch geht das
          Pack zusätzlich als E-Mail von dieser Adresse raus.
        </li>
      </ol>

      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-start gap-3">
          <Checkbox
            id={checkboxId}
            checked={agreed}
            onCheckedChange={(value) => setAgreed(value === true)}
            className="mt-0.5"
          />
          <Label htmlFor={checkboxId} className="text-sm leading-6 font-normal">
            Ich stimme ausdrücklich zu, dass ALSTERCODE mit der Ausführung vor
            Ablauf der Widerrufsfrist beginnt, indem der Download der digitalen
            Vorlagen sofort bereitgestellt wird. Mir ist bekannt, dass ich
            damit mein Widerrufsrecht gemäß § 356 Abs. 5 BGB verliere.
          </Label>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          className="h-11 px-5"
          disabled={!agreed}
          onClick={openPayPal}
        >
          {product.priceEuro} € mit PayPal zahlen
          <ExternalLink />
        </Button>
        <Button size="lg" variant="outline" className="h-11 px-5" asChild>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent(product.emailSubject)}`}>
            Beleg an {site.email}
          </a>
        </Button>
      </div>

      {!agreed ? (
        <p className="text-sm text-muted-foreground">
          Die Zahlungs- und Download-Schaltflächen werden nach der Zustimmung
          zum Sofort-Download aktiv.
        </p>
      ) : null}

      {agreed ? (
        <div className="rounded-xl border border-dashed bg-muted/40 p-5">
          <h2 className="font-heading text-lg font-semibold text-primary">
            Musterdateien herunterladen
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {openedPayPal
              ? "PayPal wurde in einem neuen Tab geöffnet. Nach der Zahlung können Sie die Dateien hier laden."
              : "Sie können zuerst zahlen oder – wenn die Zahlung bereits erfolgt ist – die Dateien direkt laden."}{" "}
            Enthalten sind nur erfundene Musterstadt-Daten. Eine auf Ihre Angaben
            ausgefüllte Fassung schickt {site.owner} nach Eingang des Belegs per
            E-Mail.
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {product.files.map((file) => (
              <li key={file.href}>
                <Button variant="secondary" className="h-10 w-full justify-start" asChild>
                  <a href={file.href} download={file.name}>
                    <Download />
                    {file.label}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
