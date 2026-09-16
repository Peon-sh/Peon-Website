import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MockDashboard } from './mock-dashboard';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <Container className="pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="neutral" className="mb-6">
            <span className="size-1.5 rounded-full bg-phosphor" />
            Open source · MIT licensed
          </Badge>
          <h1 className="text-4xl leading-[1.06] sm:text-6xl">
            Deploy your apps on your server in clicks
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Peon is an open-source application deployment platform you can run yourself. Git push
            to deploy, databases, Compose stacks, TLS, backups and team access on hardware you
            control. A practical Vercel or Heroku alternative for your own servers.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button appPath="/register" variant="primary" size="lg">
              Start deploying
              <ArrowRight className="size-4" />
            </Button>
            <Button href="/docs/first-deployment" variant="secondary" size="lg">
              Read the docs
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Free to self-host · $3 per project on Cloud · unlimited team members
          </p>
        </div>

        <div className="relative mt-16 sm:mt-20">
          <div
            className="pointer-events-none absolute -inset-x-10 -top-24 -z-10 h-64 bg-phosphor/10 blur-3xl"
            aria-hidden
          />
          <MockDashboard />
          <div className="pointer-events-none absolute inset-x-0 -bottom-px h-32 bg-gradient-to-t from-background to-transparent" aria-hidden />
        </div>
      </Container>
    </section>
  );
}
