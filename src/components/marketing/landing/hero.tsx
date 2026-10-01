import { ArrowRight } from 'lucide-react';
import { ArrowCircle } from '@/components/ui/arrow-circle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="bg-dots pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_40%,transparent_85%)]" aria-hidden />
      <Container className="pt-16 pb-14 sm:pt-24 sm:pb-16">
        <div className="mx-auto max-w-5xl text-center">
          <Badge tone="neutral" className="mb-8">
            <span className="size-1.5 rounded-full bg-brand-pink" />
            Open source · MIT licensed
          </Badge>
          <h1 className="display">
            Deploy your apps on
            <br />
            your server in clicks
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg text-muted-foreground sm:text-xl">
            The open-source deployment platform for servers you already own.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button appPath="/register" variant="primary" size="lg">
              Start deploying
              <ArrowRight className="size-4" />
            </Button>
            <Button href="/docs/first-deployment" variant="secondary" size="lg">
              Read the docs
            </Button>
          </div>

          {/* Full positioning copy stays in the HTML for crawlers; visually collapsed. */}
          <details className="group mx-auto mt-10 max-w-2xl text-left">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-3 text-sm font-medium text-muted-foreground select-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              What is Peon?
              <ArrowCircle size="sm" />
            </summary>
            <p className="mt-5 text-center text-base leading-relaxed text-muted-foreground">
              Peon is an open-source application deployment platform you can run yourself. Git push
              to deploy, databases, Compose stacks, TLS, backups and team access on hardware you
              control. A practical Vercel or Heroku alternative for your own servers. Free to
              self-host · $3 per project on Cloud · unlimited team members.
            </p>
          </details>
        </div>
      </Container>
    </section>
  );
}
