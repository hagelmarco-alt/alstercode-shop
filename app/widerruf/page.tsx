import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Widerrufsbelehrung" };

export default function WiderrufPage() {
  return (
    <LegalPage title="Widerrufsbelehrung">
      <p>
        Verbraucher haben bei Fernabsatzverträgen grundsätzlich ein
        Widerrufsrecht von 14 Tagen. Für digitale Inhalte, die nicht auf einem
        körperlichen Datenträger geliefert werden, erlischt dieses Recht, wenn
        Sie ausdrücklich zustimmen, dass die Ausführung vor Ablauf der Frist
        beginnt, und Sie Ihre Kenntnis vom Verlust des Widerrufsrechts
        bestätigen (§ 356 Abs. 5 BGB).
      </p>
      <p>
        Beim Kleinunternehmer-Pack ist der Download der Dateien die Ausführung.
        Die Zustimmung holt ALSTERCODE auf der{" "}
        <Link className="underline underline-offset-4" href="/kaufen">
          Kaufseite
        </Link>{" "}
        per Pflichtfeld ein. Ohne diese Zustimmung werden Zahlung und Download
        nicht freigegeben.
      </p>
      <p>
        Der Kurztext ist eine Dienstleistung nach individuellem Briefing. Soweit
        die Leistung vollständig erbracht wurde und Sie dem Beginn vor Ablauf
        der Frist zugestimmt haben, erlischt das Widerrufsrecht ebenfalls.
      </p>
      <p>
        Muster-Widerrufsformular, falls das Recht noch besteht: An {site.owner},{" "}
        {site.street}, {site.zip} {site.city}, {site.email}. Hiermit widerrufe
        ich den Vertrag über den Kauf des Kleinunternehmer-Packs / den
        Kurztext-Auftrag, bestellt am [Datum], Name, Anschrift, Datum.
      </p>
    </LegalPage>
  );
}
