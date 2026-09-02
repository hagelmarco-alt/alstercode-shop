import JSZip from "jszip";

import { getPackFiles } from "@/scripts/generate-docs.mjs";

export const dynamic = "force-dynamic";

export async function GET() {
  const files = await getPackFiles();
  const zip = new JSZip();
  for (const [name, data] of Object.entries(files)) {
    zip.file(name, data);
  }
  const body = await zip.generateAsync({ type: "uint8array" });
  return new Response(body, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition":
        'attachment; filename="alstercode-kleinunternehmer-pack.zip"',
      "Cache-Control": "no-store",
    },
  });
}
