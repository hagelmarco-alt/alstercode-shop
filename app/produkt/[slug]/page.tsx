import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  extraProducts,
  findExtraProduct,
  formatEuro,
  isCorePackSku,
} from "@/lib/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return extraProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = findExtraProduct(slug);
  if (!product) {
    return { title: "Nicht gefunden" };
  }
  return {
    title: product.title,
    description: `${product.title}, ${formatEuro(product.priceEuro)}, Zahlung über PayPal.`,
  };
}

export default async function ProductAliasPage({ params }: PageProps) {
  const { slug } = await params;
  if (isCorePackSku(slug)) {
    redirect("/kaufen");
  }
  const product = findExtraProduct(slug);
  if (!product) {
    notFound();
  }
  redirect(`/kaufen/${product.sku}`);
}
