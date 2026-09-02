import { NextResponse } from "next/server";

import { getPackFiles } from "@/scripts/generate-docs.mjs";

export const dynamic = "force-dynamic";

const types: Record<string, string> = {
  "Rechnung-Muster.docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "Rechnung-Muster.pdf": "application/pdf",
  "Zahlungserinnerung-Muster.docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "Zahlungserinnerung-Muster.pdf": "application/pdf",
  "LIESMICH.txt": "text/plain; charset=utf-8",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> }
) {
  const { name } = await context.params;
  const type = types[name];
  if (!type) {
    return NextResponse.json({ error: "Datei nicht gefunden." }, { status: 404 });
  }

  const files = (await getPackFiles()) as Record<string, Buffer>;
  const body = files[name];
  if (!body) {
    return NextResponse.json({ error: "Datei nicht gefunden." }, { status: 404 });
  }

  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": type,
      "Content-Disposition": `attachment; filename="${name}"`,
      "Cache-Control": "no-store",
    },
  });
}
