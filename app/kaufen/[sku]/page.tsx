import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { Checkout } from "@/components/checkout";
import { checkoutFromExtra } from "@/lib/checkout";
import { ExtraDisclaimer } from "@/components/extra-disclaimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  extraProducts,
  findExtraProduct,
  formatEuro,
  isCorePackSku,
} from "@/lib/products";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ sku: string }>;
};

export function generateStaticParams() {
  return extraProducts.flatMap((product) => [
    { sku: product.sku },
    { sku: product.slug },
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sku } = await params;
  if (isCorePackSku(sku)) {
    return { title: "Kaufen" };
  }
  const product = findExtraProduct(sku);
  if (!product) {
    return { title: "Nicht gefunden" };
  }
  return {
    title: product.title,
    description: `${product.title}, ${formatEuro(product.priceEuro)}, Zahlung über PayPal.`,
  };
}

export default async function ExtraBuyPage({ params }: PageProps) {
  const { sku } = await params;
  if (isCorePackSku(sku)) {
    redirect("/kaufen");
  }

  const product = findExtraProduct(sku);
  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_20rem]">
      <div>
        <p className="text-sm font-medium text-primary">{product.sku}</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
          {product.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted-foreground">
          {product.description} {formatEuro(product.priceEuro)}. PayPal öffnet
          paypal.me/alstercode/{product.priceEuro}. Eine automatische Lieferung
          nach der Zahlung ist bei PayPal.me nicht zuverlässig. Deshalb stehen
          die Musterdateien hier bereit; den Beleg senden Sie an {site.email}.
        </p>
        <div className="mt-6">
          <ExtraDisclaimer draftAid={product.draftAid} />
        </div>
        <div className="mt-8">
          <Checkout product={checkoutFromExtra(product)} />
        </div>
      </div>
      <aside className="space-y-4">
        <Card>
          <CardContent className="space-y-4">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              {product.sku}
            </p>
            <p className="font-heading text-3xl font-semibold text-primary">
              {formatEuro(product.priceEuro)}
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              Einmaliger Download als tar.gz. Kein Abo. Keine Umsatzsteuer
              ausgewiesen (§ 19 UStG).
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground">
              {product.contents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Button variant="outline" className="h-10 w-full" asChild>
          <a href="/#weitere-vorlagen">Alle Extra-Vorlagen</a>
        </Button>
      </aside>
    </div>
  );
}
