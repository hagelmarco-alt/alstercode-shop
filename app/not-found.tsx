import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-start px-4 py-20 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-primary">
        Seite nicht gefunden
      </h1>
      <p className="mt-3 text-muted-foreground">
        Diese Adresse gibt es hier nicht. Das Pack liegt auf der Startseite.
      </p>
      <Button className="mt-6" asChild>
        <Link href="/">Zur Startseite</Link>
      </Button>
    </div>
  );
}
