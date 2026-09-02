import Link from "next/link";

import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-foreground">{site.name}</p>
          <p>
            {site.owner}
            <br />
            {site.street}, {site.zip} {site.city}
            <br />
            <a className="underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p>Kleinunternehmer gemäß § 19 UStG. Kein Ausweis von Umsatzsteuer.</p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/impressum" className="hover:text-foreground">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-foreground">
            Datenschutz
          </Link>
          <Link href="/widerruf" className="hover:text-foreground">
            Widerruf
          </Link>
        </nav>
      </div>
    </footer>
  );
}
