import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <p>
        Angaben gemäß § 5 DDG:
        <br />
        {site.owner}
        <br />
        {site.street}
        <br />
        {site.zip} {site.city}
      </p>
      <p>
        E-Mail:{" "}
        <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </p>
      <p>
        Umsatzsteuer: Kleinunternehmer gemäß § 19 UStG. Es wird keine
        Umsatzsteuer ausgewiesen. Eine Umsatzsteuer-Identifikationsnummer liegt
        nicht vor.
      </p>
      <p>
        Handelsregister: nicht eingetragen. Es besteht kein Handelsregistereintrag.
      </p>
      <p>
        Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: {site.owner},{" "}
        {site.street}, {site.zip} {site.city}.
      </p>
    </LegalPage>
  );
}
