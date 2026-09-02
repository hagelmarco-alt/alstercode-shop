import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz">
      <p>
        Verantwortlicher: {site.owner}, {site.street}, {site.zip} {site.city},{" "}
        {site.email}.
      </p>
      <p>
        Diese Website speichert keine Nutzerkonten und setzt keine Analyse- oder
        Werbe-Cookies. Es findet kein Tracking über das technisch Nötige hinaus
        statt. Der Serverbetreiber (Hosting) kann übliche Verbindungsdaten wie
        IP-Adresse, Zeitpunkt und aufgerufene Datei in Serverlogs erfassen,
        soweit das für Betrieb und Sicherheit erforderlich ist.
      </p>
      <p>
        Der Kauf erfolgt über PayPal (PayPal.me). Dabei gelten die
        Datenschutzhinweise von PayPal. Diese Website erhält keine
        Zahlungsdaten und keine automatische Zahlungsbestätigung.
      </p>
      <p>
        Wenn Sie eine E-Mail an {site.email} senden oder das Kurztext-Formular
        Ihr E-Mail-Programm öffnet, werden die von Ihnen angegebenen Daten nur
        zur Bearbeitung der Anfrage verwendet. Es werden keine Formulardaten auf
        dieser Website gespeichert.
      </p>
      <p>
        Downloads der Musterdateien sind öffentlich erreichbar, nachdem Sie auf
        der Kaufseite dem Sofort-Download zugestimmt haben. Eine
        personenbezogene Protokollierung des Downloads findet durch ALSTERCODE
        nicht statt.
      </p>
      <p>
        Sie haben die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung,
        Datenübertragbarkeit und Widerspruch sowie das Beschwerderecht bei einer
        Aufsichtsbehörde, insbesondere der Hamburgischen Beauftragten für
        Datenschutz und Informationsfreiheit.
      </p>
    </LegalPage>
  );
}
