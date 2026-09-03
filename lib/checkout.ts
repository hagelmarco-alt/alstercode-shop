import {
  extraPackFilename,
  paypalMeUrl,
  type ExtraProduct,
} from "@/lib/products";
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
  const filename = extraPackFilename(product.slug);
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
