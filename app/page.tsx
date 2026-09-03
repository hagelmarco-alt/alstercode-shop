import Link from "next/link";

import { DocumentPreview } from "@/components/document-preview";
import { ExtraDisclaimer } from "@/components/extra-disclaimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { extraProducts, formatEuro } from "@/lib/products";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <div>
      <section className="border-b bg-[color-mix(in_oklch,var(--background),var(--primary)_3%)]">
        <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-medium tracking-wide text-primary uppercase">
              {site.name} · Hamburg
            </p>
            <h1 className="mt-3 font-heading text-4xl leading-tight font-semibold tracking-tight text-primary sm:text-5xl">
              Rechnung und Zahlungserinnerung für Kleinunternehmer
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Ein Pack mit Word- und PDF-Vorlagen nach § 19 UStG. Die Dateien
              enthalten erfundene Musterstadt-Daten. Sie ersetzen Name, Anschrift,
              Steuernummer und Bankverbindung durch Ihre eigenen Angaben.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-11 px-5" asChild>
                <Link href="/kaufen">Pack für 12 € kaufen</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-5" asChild>
                <Link href="#pack">Inhalt ansehen</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Kein Ausweis von Umsatzsteuer. Zahlung über PayPal.me/alstercode.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <DocumentPreview
              src="/templates/rechnung.html"
              title="Muster einer Kleinunternehmer-Rechnung mit §-19-Hinweis"
            />
            <div className="mt-8">
              <DocumentPreview
                src="/templates/zahlungserinnerung.html"
                title="Muster einer höflichen Zahlungserinnerung"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="pack" className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-primary">
              Kleinunternehmer-Pack
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Eine Artikelnummer, {site.packPrice}. Enthalten sind Rechnung und
              Zahlungserinnerung – jeweils als Word-Datei zum Bearbeiten und als
              PDF zum Ansehen.
            </p>
            <ul className="mt-6 space-y-3 text-[15px] leading-7">
              <li>Rechnung mit Leistungszeitraum, Zahlungsziel und §-19-Klausel</li>
              <li>Zahlungserinnerung ohne Mahnungston, mit offenem Betrag</li>
              <li>Musterdaten nur aus Musterstadt, keine echten Konten</li>
              <li>Kurze LIESMICH-Datei zur Anpassung</li>
            </ul>
            <Separator className="my-8" />
            <h3 className="font-heading text-xl font-semibold">Ablauf</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-muted-foreground">
              <li>Widerruf für den Sofort-Download zustimmen</li>
              <li>12 € über PayPal zahlen</li>
              <li>Musterdateien auf der Kaufseite herunterladen</li>
              <li>
                PayPal-Beleg an {site.email} senden. Eine ausgefüllte Fassung
                kann von dort nachgeschickt werden.
              </li>
            </ol>
          </div>
          <Card>
            <CardContent className="space-y-4">
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                {site.packSku}
              </p>
              <p className="font-heading text-3xl font-semibold text-primary">
                {site.packPrice}
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                Einmaliger Download. Kein Abo. Keine Umsatzsteuer ausgewiesen
                (§ 19 UStG).
              </p>
              <Button className="h-10 w-full" asChild>
                <Link href="/kaufen">Zur Kasse</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="weitere-vorlagen" className="border-t">
        <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6">
          <h2 className="font-heading text-3xl font-semibold text-primary">
            Weitere Vorlagen
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Vierzehn Extra-Pakete zum Sofort-Download. Derselbe Ablauf wie beim
            Kleinunternehmer-Pack: Widerruf, PayPal.me/alstercode, Datei auf
            Vertrauensbasis. Das Pack {site.packSku} und der Kurztext für{" "}
            {site.kurztextPrice} bleiben unverändert.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {extraProducts.map((product) => (
              <li key={product.sku}>
                <Card size="sm" className="h-full">
                  <CardContent className="flex h-full flex-col gap-3">
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">
                      {product.sku}
                    </p>
                    <h3 className="font-heading text-base font-semibold text-primary">
                      {product.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                      <p className="font-heading text-lg font-semibold text-primary">
                        {formatEuro(product.priceEuro)}
                      </p>
                      <Button size="sm" asChild>
                        <Link href={`/kaufen/${product.sku}`}>Kaufen</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
          <div className="mt-8 max-w-2xl">
            <ExtraDisclaimer draftAid />
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-primary">
              Kurztext, 49 €
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
              Wenn Sie zusätzlich einen kurzen Text brauchen – etwa eine
              Leistungsbeschreibung oder eine höfliche Erinnerung – können Sie
              ein Briefing schicken. Es gibt keinen automatischen Generator.
              Sie zahlen {site.kurztextPrice} über PayPal und mailen den Auftrag
              an {site.email}.
            </p>
            <Button variant="outline" className="mt-5" asChild>
              <Link href="/kurztext">Briefing vorbereiten</Link>
            </Button>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-primary">
              Was dieser Shop nicht ist
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
              Keine Steuerberatung, keine Rechtsberatung, keine Buchhaltung,
              kein Abo. Die Vorlagen sind Muster mit erfundenen
              Musterstadt-Daten. AGB und NDA sind Entwurfshilfen. Ob § 19 UStG
              für Sie gilt, prüfen Sie selbst oder mit Ihrer Steuerberatung.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
