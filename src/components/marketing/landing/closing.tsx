import { ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/icons/github';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/container';
import { SPONSOR_LINKS } from '@/lib/sponsors';

export function OpenSourceStrip() {
  return (
    <Section className="py-10 sm:py-10">
      <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <GithubIcon className="mt-0.5 size-6 shrink-0 text-muted-foreground" />
          <div>
            <p className="font-medium">Open source, MIT licensed</p>
            <p className="mt-1 text-sm text-muted-foreground">
              The deployment engine, dashboard and pipelines are public code. No proprietary agent runs on your servers.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button href={SPONSOR_LINKS.githubApp} variant="secondary" size="sm" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </Button>
          <Button href="/open-source" variant="ghost" size="sm">
            Our open source stance →
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 rotate-180" aria-hidden />
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl text-3xl sm:text-5xl">Own your deployment platform.</h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
          Connect a server, push your code, and go live in minutes. Self-host for free or start on Cloud for $3 per project.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button appPath="/register" variant="primary" size="lg">
            Start deploying
            <ArrowRight className="size-4" />
          </Button>
          <Button href="/marketplace" variant="secondary" size="lg">
            Browse 300+ templates
          </Button>
        </div>
      </Container>
    </Section>
  );
}
