export function ExtraDisclaimer({ draftAid = false }: { draftAid?: boolean }) {
  return (
    <div className="space-y-3 text-sm leading-6 text-muted-foreground">
      <p>
        Nur erfundene Musterstadt-Daten. Keine Rechtsberatung, keine
        Steuerberatung, keine Anwaltsprüfung. Ob § 19 UStG für Sie gilt, prüfen
        Sie selbst oder mit Ihrer Steuerberatung.
      </p>
      {draftAid ? (
        <p>
          AGB, NDA und Honorarvereinbarung sind Entwurfshilfen zum Umschreiben –
          kein geprüfter Vertrag und kein Ersatz für anwaltliche Beratung.
        </p>
      ) : null}
    </div>
  );
}
