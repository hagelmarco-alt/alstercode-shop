import Link from "next/link";

import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-heading text-lg font-semibold tracking-tight text-primary">
            {site.name}
          </span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Vorlagen für Kleinunternehmer
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/#pack" className="text-muted-foreground hover:text-foreground">
            Pack
          </Link>
          <Link href="/kurztext" className="text-muted-foreground hover:text-foreground">
            Kurztext
          </Link>
          <Link href="/kaufen" className="font-medium text-primary hover:underline">
            Kaufen
          </Link>
        </nav>
      </div>
    </header>
  );
}
