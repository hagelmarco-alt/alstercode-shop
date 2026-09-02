"use client";

import { FormEvent, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

export function KurztextForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [briefing, setBriefing] = useState("");

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("Kurztext-Auftrag 49 €");
    const body = encodeURIComponent(
      `Name: ${name || "[Ihr Name]"}\nE-Mail: ${email || "[Ihre E-Mail]"}\nPayPal: paypal.me/alstercode, 49,00 €\n\nBriefing:\n${briefing || "[Ihr Briefing]"}`
    );
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  }, [name, email, briefing]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    window.location.href = mailto;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">E-Mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="briefing">Briefing</Label>
        <Textarea
          id="briefing"
          name="briefing"
          rows={8}
          value={briefing}
          onChange={(event) => setBriefing(event.target.value)}
          placeholder="Anlass, Länge, Ton, Empfänger, Frist."
          required
        />
      </div>
      <p className="text-sm leading-6 text-muted-foreground">
        Es gibt keinen Sofortgenerator. Zahlen Sie {site.kurztextPrice} über
        PayPal und senden Sie das Briefing an {site.email}. Die Schaltflächen
        öffnen PayPal und Ihr E-Mail-Programm. Es werden keine Daten auf diesem
        Server gespeichert.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" size="lg" className="h-11 px-5" asChild>
          <a href={site.paypalKurztext} target="_blank" rel="noopener noreferrer">
            49 € mit PayPal zahlen
            <ExternalLink />
          </a>
        </Button>
        <Button type="submit" size="lg" variant="outline" className="h-11 px-5">
          Briefing per E-Mail senden
        </Button>
      </div>
    </form>
  );
}
