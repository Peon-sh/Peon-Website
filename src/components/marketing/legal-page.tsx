import { SiteHeader } from '@/components/marketing/site-header';
import { Check } from "lucide-react";
import { SiteFooter } from '@/components/marketing/site-footer';

type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <p className="text-sm font-medium text-phosphor">Legal</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-2 text-xs text-faint">
          Last updated {updated}
        </p>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{intro}</p>

        <div className="mt-10 space-y-9">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold">{section.title}</h2>
              {section.paragraphs.map((para, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-1 size-3.5 shrink-0 text-phosphor" strokeWidth={2.5} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
