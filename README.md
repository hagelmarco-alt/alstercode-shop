# ALSTERCODE Shop

Kleiner Verkauf für das Kleinunternehmer-Pack (ACK-KU-12, 12 €) und 14 Extra-Vorlagen.
Zahlung über PayPal.me, Download auf Vertrauensbasis. Kurztext bleibt 49 €.

Anbieter: Marco Hagel, Laukamp 7, 22417 Hamburg, hagel@alstercode-ai.de.

## Was Sie bekommen

- Word- und PDF-Muster mit erfundenen Musterstadt-Daten
- Zahlung über [paypal.me/alstercode](https://www.paypal.me/alstercode/12) (12,00 €)
- Sofort-Download der Musterdateien auf der Kaufseite (nach Widerrufs-Zustimmung)
- Optional: Beleg an hagel@alstercode-ai.de; ausgefülltes Pack per E-Mail

Extra-SKUs liegen unter `/#weitere-vorlagen`, Kauf unter `/kaufen/ACK-…` bzw. `/produkt/[slug]`.
Die Archive stehen in `content/packs/` und werden über `/api/extra/[slug]` ausgeliefert.

Kein Abo. Keine Stripe-Anbindung. Kein Tracking über das technisch Nötige hinaus. Keine Rechts- oder Steuerberatung.

## Lokal starten

```bash
npm install
npm run generate:pack
npm run dev
```

Die Seite läuft auf [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Inhalt der Vorlagen neu erzeugen

Chrome/Chromium wird für PDF und Produktfotos benötigt.

```bash
npm run generate:pack
```
