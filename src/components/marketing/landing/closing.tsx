import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export function FinalCta() {
  return (
    <section className="bg-surface-indigo text-surface-indigo-foreground">
      <Container className="py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end">
          <h2 className="display">
            Own your
            <br />
            deployment platform.
          </h2>
          <div>
            <p className="max-w-md text-lg leading-snug text-white/85 sm:text-xl">
              Connect a server, push your code, and go live in minutes. Self-host for free or start
              on Cloud for $3 per project.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                appPath="/register"
                variant="primary"
                size="lg"
                className="bg-white text-[#0a0a0a] hover:bg-white/90"
              >
                Start deploying
                <ArrowRight className="size-4" />
              </Button>
              <Button
                href="/marketplace"
                variant="secondary"
                size="lg"
                className="border-white/60 text-white hover:border-white hover:bg-white/10"
              >
                Browse 300+ templates
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
