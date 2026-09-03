import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { NextResponse } from "next/server";

import { extraPackFilename, findExtraProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const product = findExtraProduct(slug);
  if (!product) {
    return NextResponse.json({ error: "Datei nicht gefunden." }, { status: 404 });
  }

  const filename = extraPackFilename(product.slug);
  const filePath = join(process.cwd(), "content", "packs", filename);

  try {
    const body = await readFile(filePath);
    return new Response(new Uint8Array(body), {
      headers: {
        "Content-Type": "application/gzip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Datei nicht gefunden." }, { status: 404 });
  }
}
