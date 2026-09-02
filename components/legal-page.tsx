import type { ReactNode } from "react";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-primary">
        {title}
      </h1>
      <div className="prose-legal mt-8 space-y-4 text-[15px] leading-7 text-foreground/90">
        {children}
      </div>
    </article>
  );
}
