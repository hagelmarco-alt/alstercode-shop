import type { Metadata } from "next";

import { KurztextForm } from "@/components/kurztext-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kurztext",
  description: "Kurzen Text beauftragen: 49 € über PayPal, Briefing per E-Mail.",
};

export default function KurztextPage() {
  return (
    <article className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-primary">
        Kurztext, {site.kurztextPrice}
      </h1>
      <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
        Für einen kurzen Auftragstext – nicht für die Vorlagen selbst. Es gibt
        keinen Generator und keine Sofortlieferung. Nach der PayPal-Zahlung
        bearbeitet {site.owner} das Briefing und antwortet von {site.email}.
      </p>
      <div className="mt-8">
        <KurztextForm />
      </div>
    </article>
  );
}
