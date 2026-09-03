import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "content", "packs");
const workRoot = join(root, "tmp-pack", "extras");

const CONTACT = `Marco Hagel · ALSTERCODE
Laukamp 7 · 22417 Hamburg
hagel@alstercode-ai.de`;

const DISCLAIMER = `Musterstadt
-----------
Alle Namen, Anschriften, Konten, Steuernummern und Vorgänge sind erfunden
(Musterstadt). Ersetzen Sie jede Angabe vor dem Versand.

Keine Beratung
--------------
Die Dateien ersetzen keine Rechtsberatung, Steuerberatung oder
Anwaltsprüfung. Ob § 19 UStG für Sie gilt, prüfen Sie selbst oder mit
Ihrer Steuerberatung.

AGB und NDA
-----------
Soweit enthalten, sind AGB und NDA Entwurfshilfen – kein geprüfter Vertrag.`;

function liesmich({ sku, title, files }) {
  return `ALSTERCODE – ${title}
${"=".repeat(Math.min(40, 12 + title.length))}

SKU: ${sku}
Anbieter: ${CONTACT}

Inhalt
------
${files.map((name) => `- ${name}`).join("\n")}

${DISCLAIMER}

Nutzung
-------
1. Dateien entpacken (tar.gz).
2. Platzhalter in eckigen Klammern ersetzen.
3. Vor dem Versand selbst prüfen.

Zahlung über paypal.me/alstercode. Download auf Vertrauensbasis.
`;
}

function doc(title, body) {
  return `${title}
${"=".repeat(title.length)}

Muster – Daten ersetzen. Nur Musterstadt.

${body.trim()}

—
${CONTACT}
Kleinunternehmer gemäß § 19 UStG, soweit angegeben.
Keine Rechts- oder Steuerberatung.
`;
}

const packs = [
  {
    slug: "01-geschaeftsbriefe",
    sku: "ACK-GB-19",
    title: "Geschäftsbriefe (Angebot/AB/Mahnung/Storno)",
    files: {
      "01-Angebot.txt": doc(
        "Angebot",
        `Absender
Mira Soltau · Satz und Text
Keplerweg 14 · 99084 Musterstadt
StNr. 156/208/12345

An
Beispielbau GmbH
Frau Inge Beispiel
Industriestraße 8
12345 Musterstadt

Musterstadt, 03.09.2026
Angebotsnr. A-2026-014

Sehr geehrte Frau Beispiel,

für die von Ihnen angefragten Texte biete ich an:

Pos.  Leistung                                              Menge     Betrag
1     Website-Texte Startseite und Leistungsseite           1 Psch.   180,00 EUR
2     Kurzfassung für Suchmaschinen-Snippets                4 St.     120,00 EUR

Netto / Gesamt                                              300,00 EUR

Gültig bis: 17.09.2026
Leistungszeitraum: nach Auftrag, voraussichtlich 10 Arbeitstage
Zahlungsziel: 14 Tage nach Rechnung

Kein Ausweis von Umsatzsteuer. Für diese Leistung gilt die Steuerbefreiung
für Kleinunternehmer gemäß § 19 UStG.

Mit freundlichen Grüßen
Mira Soltau`
      ),
      "02-Auftragsbestaetigung.txt": doc(
        "Auftragsbestätigung",
        `Absender: Mira Soltau, Keplerweg 14, 99084 Musterstadt
Empfänger: Beispielbau GmbH, Industriestraße 8, 12345 Musterstadt

Musterstadt, 04.09.2026
AB-Nr. AB-2026-014  ·  Bezug: Angebot A-2026-014

Sehr geehrte Frau Beispiel,

hiermit bestätige ich Ihren Auftrag vom 04.09.2026:

- Website-Texte Startseite und Leistungsseite, zwei Korrekturläufe
- Kurzfassung für Suchmaschinen-Snippets (4 Stück)
- Gesamt 300,00 EUR, kein Ausweis von Umsatzsteuer (§ 19 UStG)
- Lieferung als bearbeitbare Datei per E-Mail bis 18.09.2026

Änderungen außerhalb des vereinbarten Umfangs bedürfen einer neuen Absprache.

Mit freundlichen Grüßen
Mira Soltau`
      ),
      "03-Mahnung.txt": doc(
        "Mahnung",
        `Absender: Mira Soltau, Keplerweg 14, 99084 Musterstadt
Empfänger: Beispielbau GmbH, Frau Inge Beispiel, Industriestraße 8, 12345 Musterstadt

Musterstadt, 25.09.2026
Rechnung 2026-008 vom 10.08.2026 · offen 300,00 EUR

Sehr geehrte Frau Beispiel,

zu meiner Rechnung Nr. 2026-008 vom 10.08.2026 über 300,00 EUR habe ich
bisher keinen Zahlungseingang feststellen können. Falls sich die Überweisung
mit diesem Schreiben gekreuzt hat, betrachten Sie es bitte als gegenstandslos.

Andernfalls bitte ich Sie, den offenen Betrag bis zum 09.10.2026 zu
überweisen.

Kontoinhaber Mira Soltau
IBAN DE00 0000 0000 0000 0000 00 · BIC MUSTDEFFXXX · Musterbank AG
Verwendungszweck 2026-008

Der zugrunde liegende Umsatz unterliegt der Steuerbefreiung für
Kleinunternehmer gemäß § 19 UStG.

Mit freundlichen Grüßen
Mira Soltau`
      ),
      "04-Storno.txt": doc(
        "Stornoschreiben",
        `Absender: Mira Soltau, Keplerweg 14, 99084 Musterstadt
Empfänger: Beispielbau GmbH, Industriestraße 8, 12345 Musterstadt

Musterstadt, 08.09.2026
Storno zu AB-2026-014 / Angebot A-2026-014

Sehr geehrte Frau Beispiel,

den Auftrag AB-2026-014 storniere ich im gegenseitigen Einvernehmen.
Es sind keine Teilleistungen erbracht und keine Beträge fällig.

Bitte betrachten Sie Angebot A-2026-014 und die Auftragsbestätigung
als gegenstandslos.

Mit freundlichen Grüßen
Mira Soltau`
      ),
    },
  },
  {
    slug: "02-angebot-vorlage",
    sku: "ACK-AN-12",
    title: "Angebots-/Kostenvoranschlag-Vorlage",
    files: {
      "Angebot-Kostenvoranschlag.txt": doc(
        "Angebot / Kostenvoranschlag",
        `Anbieter
[Ihr Name] · [Tätigkeit]
[Straße] · [PLZ] Musterstadt
Steuernummer [156/208/12345]

An
[Firma / Name]
[Straße]
[PLZ] Musterstadt

Musterstadt, [Datum]
Angebot / Kostenvoranschlag Nr. [A-2026-000]

Sehr geehrte Damen und Herren,

für die angefragte Leistung biete ich an bzw. schätze ich wie folgt:

Pos.  Beschreibung                         Menge      Einzel      Betrag
1     [Leistung]                           [1 Psch.]  [0,00]      [0,00] EUR
2     [Option / Zusatz]                    [–]        [–]         [0,00] EUR

Gesamtbetrag                                                      [0,00] EUR

Art: [ ] verbindliches Angebot   [ ] unverbindlicher Kostenvoranschlag
Gültigkeit: [14 Tage]
Ausführung: [nach Auftrag / KW …]
Zahlungsziel: [14 Tage nach Rechnung]

Abweichungen vom geschätzten Aufwand spreche ich an, bevor sie entstehen.

Kein Ausweis von Umsatzsteuer. Soweit § 19 UStG für mich gilt, bleibt
die Steuerbefreiung für Kleinunternehmer vorbehalten. Ob das für Sie
als Empfänger relevant ist, prüft Ihre Steuerberatung.

Mit freundlichen Grüßen
[Ihr Name]`
      ),
    },
  },
  {
    slug: "03-website-textpaket-handwerk",
    sku: "ACK-WH-29",
    title: "Website-Textpaket Handwerk",
    files: {
      "01-Startseite.txt": `Website-Textpaket Handwerk – Startseite
=======================================

Nur Muster. Firma, Ort und Leistungen ersetzen.

Überschrift
-----------
Klarer Handwerksservice in Musterstadt – termintreu, nachvollziehbar, ohne Fachchinesisch.

Unterzeile
----------
Nordholz Handwerk (Musterbetrieb) übernimmt [Sanitär / Ausbau / Elektro] für Wohnungen
und kleine Gewerbeeinheiten in Musterstadt. Sie bekommen einen festen Ansprechpartner
und eine schriftliche Leistungsbeschreibung, bevor die Arbeit beginnt.

Drei Nutzen
-----------
- Termin und Ablauf stehen vorab, nicht erst auf der Baustelle.
- Nacharbeit und Gewährleistung sind benannt, nicht nur mündlich.
- Eine Ansprechperson, keine Weiterleitungskette.

Kurz zu uns
-----------
Nordholz Handwerk ist ein erfundener Musterbetrieb in Musterstadt. Ersetzen Sie
Namen, Gewerk und Einzugsgebiet.

Hinweis
-------
Keine Rechts- oder Steuerberatung. Texte sind Vorlagen zum Umschreiben.
`,
      "02-Leistungen.txt": `Website-Textpaket Handwerk – Leistungen
=======================================

Leistungsseite (Muster)
-----------------------
Wir arbeiten in Musterstadt und Umgebung. Typische Aufträge:

1. Instandsetzung
   Leckagen, defekte Armaturen, kleine Folgeschäden – nach Besichtigung.

2. Modernisierung im Bestand
   Austausch und Anpassung an den vorhandenen Stand, ohne Komplettumbau.

3. Kleine Neubau- und Ausbauarbeiten
   Abgestimmte Gewerkeabschnitte, schriftlich umrissen.

Was nicht automatisch enthalten ist
-----------------------------------
Statik, Genehmigungen, Entsorgung Sonderabfall, Gerüst – sofern nicht extra
vereinbart. Das ist eine Textvorlage, kein Leistungsverzeichnis.
`,
      "03-Ablauf.txt": `Website-Textpaket Handwerk – Ablauf
===================================

1. Kurzanfrage mit Adresse, Gewerk und Wunschtermin (Musterstadt).
2. Besichtigung oder Fotos, danach schriftliches Angebot.
3. Terminfixierung erst nach Auftrag.
4. Ausführung, Abnahme, Rechnung mit §-19-Hinweis, falls zutreffend.

Keine Garantie für Fristen in dieser Vorlage. Eigene Zeiten einsetzen.
`,
      "04-Ueber-uns.txt": `Website-Textpaket Handwerk – Über uns
=====================================

Nordholz Handwerk, Musterstraße 2, 12345 Musterstadt.
Inhaber: [Name ersetzen]. Kein echter Betrieb.

Wir schreiben, was wir tun – und was nicht. Meisterpflicht, Versicherungen
und Einzugsgebiet tragen Sie selbst ein. Keine Werbung mit Titeln, die
Ihnen nicht zustehen.
`,
      "05-Kontakt.txt": `Website-Textpaket Handwerk – Kontakt
====================================

Nordholz Handwerk (Muster)
Musterstraße 2 · 12345 Musterstadt
Telefon [00 00 / 00 00 00]
E-Mail [werkstatt@musterstadt.example]

Anfahrt nur nach Termin. Notdienst nur, wenn Sie ihn wirklich anbieten.

Impressum und Datenschutz gehören nicht in dieses Textpaket – die liegen
im Shop unter /impressum und /datenschutz als Seiten, nicht als Vorlage.
`,
    },
  },
  {
    slug: "04-mahnwesen-1-3",
    sku: "ACK-MH-19",
    title: "Mahnwesen Stufe 1–3",
    files: {
      "Stufe-1-Zahlungserinnerung.txt": doc(
        "Stufe 1 – Zahlungserinnerung",
        `Mira Soltau · Keplerweg 14 · 99084 Musterstadt
An: Beispielbau GmbH, Frau Inge Beispiel, Industriestraße 8, 12345 Musterstadt

Musterstadt, 31.08.2026
Rechnung 2026-008 vom 10.08.2026 · fällig 24.08.2026 · offen 300,00 EUR

Sehr geehrte Frau Beispiel,

zu meiner Rechnung Nr. 2026-008 vom 10.08.2026 über 300,00 EUR habe ich
bisher keinen Zahlungseingang feststellen können. Falls sich die Überweisung
mit diesem Schreiben gekreuzt hat, betrachten Sie es bitte als gegenstandslos.

Andernfalls bitte ich um Überweisung bis zum 09.09.2026. Eine erste Mahnung
oder Verzugszinsen sind mit diesem Schreiben nicht verbunden.

Konto: Mira Soltau · IBAN DE00 0000 0000 0000 0000 00 · Musterbank AG
Verwendungszweck 2026-008

Kein Ausweis von Umsatzsteuer (§ 19 UStG).`
      ),
      "Stufe-2-Mahnung.txt": doc(
        "Stufe 2 – Mahnung",
        `Mira Soltau · Keplerweg 14 · 99084 Musterstadt
An: Beispielbau GmbH, Industriestraße 8, 12345 Musterstadt

Musterstadt, 16.09.2026
Zweite Zahlungsaufforderung · Rechnung 2026-008 · offen 300,00 EUR

Sehr geehrte Damen und Herren,

auf meine Zahlungserinnerung vom 31.08.2026 habe ich den Betrag von
300,00 EUR zur Rechnung 2026-008 vom 10.08.2026 noch nicht feststellen
können. Ich bitte um Ausgleich bis zum 30.09.2026.

Dieses Schreiben ist eine Vorlage. Ob Verzug, Mahnkosten oder Zinsen
zulässig sind, prüft nicht ALSTERCODE. Setzen Sie keine Beträge ein,
die Sie nicht selbst verantworten.

Zahlungsdaten unverändert, Verwendungszweck 2026-008.
Kein Ausweis von Umsatzsteuer (§ 19 UStG).`
      ),
      "Stufe-3-Letzte-Aufforderung.txt": doc(
        "Stufe 3 – Letzte Zahlungsaufforderung",
        `Mira Soltau · Keplerweg 14 · 99084 Musterstadt
An: Beispielbau GmbH, Industriestraße 8, 12345 Musterstadt

Musterstadt, 05.10.2026
Letzte Zahlungsaufforderung · Rechnung 2026-008 · offen 300,00 EUR

Sehr geehrte Damen und Herren,

der Betrag von 300,00 EUR zur Rechnung 2026-008 ist weiterhin offen.
Ich bitte letztmalig um Zahlung bis zum 19.10.2026.

Diese Vorlage enthält keine Androhung eines Inkassos, keiner Klage und
keiner Schufa. Solche Schritte wären eine eigene rechtliche Entscheidung.
ALSTERCODE gibt dazu keine Empfehlung.

Zahlungsdaten: Mira Soltau, IBAN DE00 0000 0000 0000 0000 00,
Musterbank AG, Verwendungszweck 2026-008.
Kein Ausweis von Umsatzsteuer (§ 19 UStG).`
      ),
    },
  },
  {
    slug: "05-storno-paket",
    sku: "ACK-ST-12",
    title: "Storno-Paket",
    files: {
      "01-Storno-Auftraggeber.txt": doc(
        "Storno durch Auftraggeber",
        `Absender: Beispielbau GmbH, Industriestraße 8, 12345 Musterstadt
An: Mira Soltau, Keplerweg 14, 99084 Musterstadt

Musterstadt, 07.09.2026
Stornierung Auftrag AB-2026-014

Sehr geehrte Frau Soltau,

wir stornieren den Auftrag AB-2026-014 (Website-Texte, 300,00 EUR)
zum 07.09.2026. Bitte bestätigen Sie den Eingang.

Soweit noch keine Leistung erbracht wurde, gehen wir von keiner
Vergütung aus. Bereits erbrachte Teile rechnen Sie bitte nach
tatsächlichem Stand ab – das ist eine geschäftliche Absprache,
keine Rechtsauskunft.

Mit freundlichen Grüßen
Inge Beispiel`
      ),
      "02-Stornobestaetigung.txt": doc(
        "Stornobestätigung",
        `Absender: Mira Soltau, Keplerweg 14, 99084 Musterstadt
An: Beispielbau GmbH, Industriestraße 8, 12345 Musterstadt

Musterstadt, 08.09.2026
Bestätigung der Stornierung AB-2026-014

Sehr geehrte Frau Beispiel,

den Auftrag AB-2026-014 habe ich storniert. Es liegen keine
Teillieferungen vor. Es wird keine Rechnung gestellt.

Angebot A-2026-014 und die Auftragsbestätigung sind gegenstandslos.

Mit freundlichen Grüßen
Mira Soltau`
      ),
    },
  },
  {
    slug: "06-nda-light",
    sku: "ACK-ND-19",
    title: "NDA light (keine Anwaltsprüfung)",
    files: {
      "NDA-light-Entwurfshilfe.txt": `NDA light – Entwurfshilfe
=========================

KEINE ANWALTSPRÜFUNG. KEINE RECHTSBERATUNG.
Dieser Text ist eine Entwurfshilfe zum Umschreiben. Er ist kein Vertrag,
den ALSTERCODE geprüft oder für Ihren Fall freigegeben hat. Vor der
Verwendung eigene rechtliche Prüfung.

Parteien (Musterstadt)
----------------------
Partei A: Mira Soltau, Keplerweg 14, 99084 Musterstadt
Partei B: Beispielbau GmbH, Industriestraße 8, 12345 Musterstadt

Zweck
-----
Austausch von Informationen zur Prüfung einer möglichen Zusammenarbeit
an Website-Texten (Musterprojekt).

Was vertraulich bleiben soll
----------------------------
Von der anderen Seite schriftlich als vertraulich gekennzeichnete
Angaben zu Preisen, Kunden, Entwürfen und internen Abläufen.

Was nicht darunterfällt
-----------------------
Informationen, die öffentlich sind, die die empfangende Partei bereits
rechtmäßig kannte oder unabhängig entwickelt hat, oder die sie herausgeben
muss (Behörden, Gericht). Das ist eine Skizze, keine abschließende Liste.

Dauer
-----
[24 Monate] ab Unterzeichnung, soweit gesetzlich zulässig. Eigene Frist
einsetzen.

Weitergabe
----------
Nur an Personen, die den Zweck brauchen und zur Verschwiegenheit
angehalten sind. Keine eigene Verwertung außerhalb des Zwecks.

Schluss
-------
Musterstadt, [Datum]
Unterschrift A ________________     Unterschrift B ________________

Kein Gerichtsstand, kein Vertragsstrafen-Automatismus in dieser
Entwurfshilfe – solche Klauseln gehören in eine geprüfte Fassung.
`,
    },
  },
  {
    slug: "07-leistungsbeschreibung",
    sku: "ACK-LB-15",
    title: "Leistungsbeschreibung",
    files: {
      "Leistungsbeschreibung.txt": doc(
        "Leistungsbeschreibung",
        `Projekt (Muster)
---------------
Auftraggeber: Beispielbau GmbH, Industriestraße 8, 12345 Musterstadt
Auftragnehmer: Mira Soltau, Keplerweg 14, 99084 Musterstadt
Vorgang: Website-Texte Startseite und Leistungsseite, AB-2026-014

1. Liefergegenstand
- Startseitentext, ca. [2.000] Zeichen, eine Korrekturschleife
- Leistungsseite, ca. [3.000] Zeichen, eine Korrekturschleife
- Dateiformat: [docx / md], Abgabe per E-Mail

2. Nicht enthalten
- Fotos, Layout, technische SEO-Umsetzung, Übersetzungen
- Rechtstexte (Impressum, Datenschutz, AGB)
- Weitere Unterseiten ohne neue Vereinbarung

3. Mitwirkung Auftraggeber
- Briefing, Beispiele, Freigabe innerhalb von [7] Tagen
- Ansprechperson: Frau Inge Beispiel

4. Termin
- Abgabe Entwurf: [18.09.2026]
- Abnahme: schriftlich oder per E-Mail

5. Vergütung
- 300,00 EUR gesamt, kein Ausweis von Umsatzsteuer (§ 19 UStG)
- Fällig nach Abnahme, Zahlungsziel 14 Tage

Das ist eine Gliederung, keine Projektsteuerung und keine Rechtsberatung.`
      ),
    },
  },
  {
    slug: "08-agb-kurz",
    sku: "ACK-AG-24",
    title: "Kurz-AGB B2B (Entwurfshilfe, kein Anwalt)",
    files: {
      "Kurz-AGB-B2B-Entwurfshilfe.txt": `Kurz-AGB B2B – Entwurfshilfe
============================

KEIN ANWALT. KEINE RECHTSBERATUNG.
Diese Kurz-AGB sind eine Entwurfshilfe für B2B-Geschäfte zwischen
Unternehmerinnen und Unternehmern. Sie sind keine geprüften AGB,
kein Vertragsersatz und nicht für Verbraucher gedacht. Vor Verwendung
eigene rechtliche Prüfung. ALSTERCODE prüft Ihren Fall nicht.

Geltungsbereich (Skizze)
------------------------
Für Verträge zwischen [Ihr Name], [Adresse Musterstadt], und
unternehmerischen Kunden über [Texte / Vorlagen / Honorararbeit].
Abweichende Einkaufsbedingungen des Kunden gelten nur, wenn sie
schriftlich bestätigt wurden.

Leistung
--------
Der vereinbarte Liefergegenstand ergibt sich aus Angebot,
Auftragsbestätigung oder Leistungsbeschreibung. Keine Garantie
für Werbeerfolg oder Suchmaschinenrang.

Mitwirkung
----------
Der Kunde liefert Briefing, Freigaben und Zugang, soweit nötig.
Verzögerungen daraus verschieben Termine.

Vergütung und § 19 UStG
-----------------------
Preise in Euro. Soweit der Anbieter Kleinunternehmer nach § 19 UStG
ist, wird keine Umsatzsteuer ausgewiesen. Ob das für den Kunden
steuerlich passt, prüft der Kunde selbst.

Abnahme und Mängel
------------------
Offensichtliche Mängel unverzüglich anzeigen. Nachbesserung in
angemessener Frist. Weitergehende Ansprüche sind in dieser
Entwurfshilfe nicht ausformuliert – das wäre eine Rechtsfrage.

Haftung
-------
Eine Haftungsklausel gehört in eine geprüfte Fassung. Hier steht
bewusst keine fertige Haftungsbeschränkung.

Schluss
-------
Es gilt das Recht der Bundesrepublik Deutschland, soweit zulässig.
Gerichtsstand nicht voreingetragen.

Musterstadt, [Jahr]
[Ihr Name] · ALSTERCODE-Vorlage ACK-AG-24
`,
    },
  },
  {
    slug: "09-website-textpaket-dienstleister",
    sku: "ACK-WD-29",
    title: "Website-Textpaket Dienstleister",
    files: {
      "01-Startseite.txt": `Website-Textpaket Dienstleister – Startseite
============================================

Musterbetrieb: Mira Soltau, Satz und Text, Keplerweg 14, 99084 Musterstadt.

Überschrift
-----------
Texte, die den Auftrag erklären – nicht die Agentur.

Unterzeile
----------
Ich schreibe Leistungsseiten, Angebote und höfliche Geschäftsmail
für kleine Betriebe in Musterstadt. Sie bekommen eine Fassung zum
Weiterbearbeiten, keine Blackbox.

Nutzen
------
- Eine Ansprechperson, fester Umfang
- Korrekturschleife im Preis, wenn so vereinbart
- Kleinunternehmerin, kein Umsatzsteuerausweis (§ 19 UStG), soweit zutreffend

Keine Versprechen zu Rankings, Conversion oder Rechtskonformität.
`,
      "02-Leistungen.txt": `Website-Textpaket Dienstleister – Leistungen
============================================

1. Website-Texte
   Start, Leistung, Kontakt – nach Briefing, eine Korrekturschleife.

2. Geschäftsbriefe und Mails
   Angebot, Erinnerung, Abschluss. Keine anwaltlichen Schreiben.

3. Kurzfassung
   Snippets und Kurzprofile, ohne SEO-Garantie.

Nicht enthalten: Grafik, Programmierung, Steuer- und Rechtsberatung.
`,
      "03-Arbeitsweise.txt": `Website-Textpaket Dienstleister – Arbeitsweise
==============================================

1. Briefing (Ziel, Leser, Ton, Beispiele)
2. Angebot mit Umfang und Termin
3. Entwurf, Ihre Anmerkungen, Abgabe
4. Rechnung, §-19-Hinweis, falls zutreffend

Termine gelten nach vollständigen Unterlagen. Musterstadt-Beispiel,
keine Kapazitätszusage.
`,
      "04-Ueber-uns.txt": `Website-Textpaket Dienstleister – Über uns
==========================================

Mira Soltau ist eine erfundene Musterperson in Musterstadt.
Ersetzen Sie Vita, Schwerpunkte und Foto-Credits. Keine fremden
Referenzen erfinden.
`,
      "05-Kontakt.txt": `Website-Textpaket Dienstleister – Kontakt
=========================================

Mira Soltau · Satz und Text
Keplerweg 14 · 99084 Musterstadt
[mail@musterstadt.example]

Antwortzeiten selbst eintragen. Kein 24-Stunden-Versprechen in der Vorlage.
`,
    },
  },
  {
    slug: "10-email-paket-kunden",
    sku: "ACK-EK-16",
    title: "E-Mail-Paket Kunden",
    files: {
      "01-Auftragseingang.txt": `Betreff: Auftrag [AB-2026-014] eingegangen

Guten Tag [Frau Beispiel],

vielen Dank für den Auftrag [Website-Texte]. Ich habe ihn unter
[AB-2026-014] notiert. Nächster Schritt: [Entwurf bis 18.09.2026].

Wenn sich Unterlagen verzögern, verschiebt sich der Termin.

Freundliche Grüße
[Mira Soltau]
Musterstadt – Daten ersetzen.
`,
      "02-Rueckfrage.txt": `Betreff: Kurze Rückfrage zu [AB-2026-014]

Guten Tag [Frau Beispiel],

für die Leistungsseite fehlt mir noch [Zielgruppe / drei Beispielprojekte].
Eine Stichliste reicht.

Freundliche Grüße
[Mira Soltau]
`,
      "03-Lieferung.txt": `Betreff: Abgabe [AB-2026-014]

Guten Tag [Frau Beispiel],

anbei der vereinbarte Liefergegenstand zu [AB-2026-014].
Bitte kurz bestätigen, ob der Umfang passt. Offene Punkte
sammle ich in einer Liste.

Freundliche Grüße
[Mira Soltau]
`,
      "04-Zahlungserinnerung.txt": `Betreff: Zahlungserinnerung Rechnung [2026-008]

Guten Tag [Frau Beispiel],

zur Rechnung [2026-008] vom [10.08.2026] über [300,00 EUR]
habe ich noch keinen Eingang gesehen. Falls bereits überwiesen,
genügt ein kurzer Hinweis.

Sonst bitte ich um Ausgleich unter Verwendungszweck [2026-008].
Kein Ausweis von Umsatzsteuer (§ 19 UStG), soweit zutreffend.

Freundliche Grüße
[Mira Soltau]
`,
      "05-Abschluss.txt": `Betreff: Abschluss [AB-2026-014]

Guten Tag [Frau Beispiel],

der Auftrag [AB-2026-014] ist aus meiner Sicht abgeschlossen.
Die Dateien dürfen Sie intern weiterverwenden, wie vereinbart.

Danke für die Zusammenarbeit.

Freundliche Grüße
[Mira Soltau]
`,
    },
  },
  {
    slug: "11-email-paket-akquise",
    sku: "ACK-EA-14",
    title: "E-Mail-Paket Akquise",
    files: {
      "01-Erstansprache.txt": `Betreff: Kurze Frage zu Ihren [Leistungsseiten]

Guten Tag [Name],

ich schreibe Sie einmalig an: Ich formuliere Leistungs- und
Angebotstexte für kleine Betriebe (Musterstadt-Beispiel, kein
Massenversand-Skript).

Wenn gerade kein Bedarf ist, reicht Schweigen. Wenn doch,
antworte ich mit einem knappen Umfang und Preis.

Freundliche Grüße
[Ihr Name]
[Tätigkeit] · Musterstadt

Keine Rechts- oder Vertriebsberatung. Keine erfundenen Referenzen.
`,
      "02-Nachfassen.txt": `Betreff: Kurz nachgefasst – [Leistungsseiten]

Guten Tag [Name],

ich hakte einmal nach, ohne Erinnerungsschleife. Falls unpassend,
bitte diese Mail ignorieren.

Freundliche Grüße
[Ihr Name]
`,
      "03-Absage-Danke.txt": `Betreff: Danke und Schluss

Guten Tag [Name],

danke für die Rückmeldung. Ich hakte nicht weiter nach.

Freundliche Grüße
[Ihr Name]
`,
    },
  },
  {
    slug: "12-abnahmeprotokoll",
    sku: "ACK-AP-12",
    title: "Abnahmeprotokoll",
    files: {
      "Abnahmeprotokoll.txt": doc(
        "Abnahmeprotokoll",
        `Vorgang: [AB-2026-014]  Datum: [18.09.2026]  Ort: Musterstadt / remote

Auftraggeber: Beispielbau GmbH, Industriestraße 8, 12345 Musterstadt
Vertreten durch: Frau Inge Beispiel

Auftragnehmer: Mira Soltau, Keplerweg 14, 99084 Musterstadt

Gegenstand
----------
[Website-Texte Startseite und Leistungsseite, zwei Dateien]

Geprüft
-------
[ ] Lieferumfang vollständig
[ ] Vereinbarte Korrekturschleife erledigt
[ ] Offene Mängel siehe Liste

Mängel / Vorbehalte
-------------------
1. [–]
2. [–]

Ergebnis
--------
[ ] Abgenommen ohne Vorbehalt
[ ] Abgenommen mit Vorbehalt (Mängel oben)
[ ] Nicht abgenommen

Das Protokoll dokumentiert den Stand. Es ist keine Rechtsberatung
zur Werkabnahme nach BGB.

Unterschrift Auftraggeber _____________   Auftragnehmer _____________
Ort Musterstadt, Datum _____________`
      ),
    },
  },
  {
    slug: "13-honorarvereinbarung",
    sku: "ACK-HV-18",
    title: "Honorarvereinbarung § 19",
    files: {
      "Honorarvereinbarung-Paragraf-19.txt": `Honorarvereinbarung (§ 19 UStG) – Entwurfshilfe
===============================================

KEINE STEUERBERATUNG. KEINE ANWALTSPRÜFUNG.
Ob § 19 UStG für eine Partei gilt, prüft nicht ALSTERCODE.

Parteien (Muster)
-----------------
Auftragnehmerin: Mira Soltau, Keplerweg 14, 99084 Musterstadt
Auftraggeberin: Beispielbau GmbH, Industriestraße 8, 12345 Musterstadt

Gegenstand
----------
[Website-Texte gemäß Leistungsbeschreibung / Angebot A-2026-014]

Honorar
-------
[300,00] EUR. Kein Ausweis von Umsatzsteuer, sofern die Auftragnehmerin
die Steuerbefreiung für Kleinunternehmer gemäß § 19 UStG in Anspruch
nimmt. Ein Vorsteuerabzug beim Empfänger ist aus dieser Rechnung
dann nicht möglich.

Fälligkeit
----------
Nach Abnahme, Zahlungsziel [14] Tage, ohne Skonto.

Änderungen
----------
Mehrarbeit nur nach schriftlicher Absprache.

Schluss
-------
Musterstadt, [Datum]
Unterschrift Auftragnehmerin _____________
Unterschrift Auftraggeberin _____________

Entwurfshilfe zum Umschreiben, kein geprüfter Vertrag.
`,
    },
  },
  {
    slug: "14-terminbestaetigung",
    sku: "ACK-TB-09",
    title: "Terminbestätigung",
    files: {
      "Terminbestaetigung.txt": doc(
        "Terminbestätigung",
        `An: [Frau Inge Beispiel, Beispielbau GmbH, 12345 Musterstadt]
Von: [Mira Soltau, Keplerweg 14, 99084 Musterstadt]

Termin
------
Datum: [15.09.2026]
Uhrzeit: [10:00–10:30 Uhr]
Ort / Kanal: [Video / Musterstadt, Musterstraße 2]
Teilnehmende: [Inge Beispiel, Mira Soltau]
Thema: [Briefing Website-Texte AB-2026-014]

Absage
------
Bitte mindestens [24 Stunden] vorher per E-Mail.

Das ist eine organisatorische Bestätigung, kein Vertrag.`
      ),
    },
  },
];

function writePack(pack) {
  const dir = join(workRoot, pack.slug);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const names = Object.keys(pack.files);
  writeFileSync(join(dir, "LIESMICH.txt"), liesmich({ ...pack, files: names }), "utf8");
  for (const [name, content] of Object.entries(pack.files)) {
    writeFileSync(join(dir, name), content, "utf8");
  }

  const archive = join(outDir, `${pack.slug}.tar.gz`);
  execFileSync("tar", ["-czf", archive, "-C", dir, ...["LIESMICH.txt", ...names]]);
  return archive;
}

mkdirSync(outDir, { recursive: true });
mkdirSync(workRoot, { recursive: true });

for (const pack of packs) {
  const archive = writePack(pack);
  console.log(archive);
}

console.log(`Wrote ${packs.length} packs to ${outDir}`);
