import { SiteHeader } from '@/components/marketing/site-header';
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
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-phosphor">Legal</p>
        <h1 className="mt-2 text-3xl font-800 sm:text-4xl">{title}</h1>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-faint">
          Last updated {updated}
        </p>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{intro}</p>

        <div className="mt-10 space-y-9">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="panel-title-slashes text-lg font-700">{section.title}</h2>
              {section.paragraphs.map((para, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-phosphor">›</span>
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
