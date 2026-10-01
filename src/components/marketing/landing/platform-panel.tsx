import { GithubIcon } from '@/components/icons/github';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SPONSOR_LINKS } from '@/lib/sponsors';
import { ArtImage } from '@/components/ui/art-image';

/** Indigo colour-block panel: platform-level promises with the detail folded into rows. */
export function PlatformPanel() {
  return (
    <Section divider={false} className="bg-surface-indigo text-surface-indigo-foreground">
      <Container>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-between lg:min-h-[520px]">
          <h2 className="display max-w-md">
            Your servers.
            <br />
            Your rules.
          </h2>
          <p className="mt-12 max-w-sm text-lg leading-snug text-white/85 sm:text-xl">
            Everything a PaaS gives you, on hardware you control. No per-seat pricing, no
            proprietary agent on your machines.
          </p>
        </div>

        <div>
          <div className="border-t border-white/70">
            <Reveal tone="inverse" size="lg" title="MCP server and AI assistant">
              <p className="max-w-xl text-sm leading-relaxed sm:text-base">
                A hosted MCP endpoint for Cursor and Claude, plus a chat assistant that uses the same
                tools under the same RBAC. Mutations wait for your approval and land in the audit
                log.
              </p>
              <p className="mt-3 flex flex-wrap gap-x-4 text-sm font-medium">
                <a href="/docs/mcp" className="text-white underline-offset-4 hover:underline">
                  MCP setup →
                </a>
                <a href="/docs/chat-assistant" className="text-white underline-offset-4 hover:underline">
                  Chat assistant →
                </a>
              </p>
              <ArtImage
                name="mcp-chat"
                alt="Two vintage telephones joined by a zigzag line in front of a glowing monitor"
                className="mt-6"
              />
            </Reveal>
            <Reveal tone="inverse" size="lg" title="Team roles and audit logs">
              <p className="max-w-xl text-sm leading-relaxed sm:text-base">
                Workspace and project roles so teammates get an app, not root on every server.
                Owners see who did what, included on every plan, not gated behind Enterprise.
              </p>
              <ArtImage
                name="audit-log"
                alt="Punched cards and a ledger under a desk lamp"
                className="mt-6"
              />
            </Reveal>
            <Reveal tone="inverse" size="lg" title="Open source, MIT licensed">
              <p className="max-w-xl text-sm leading-relaxed sm:text-base">
                The deployment engine, dashboard and pipelines are public code. No proprietary
                agent runs on your servers. Read it, audit it, contribute to it, or self-host the
                whole control plane for free.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  href={SPONSOR_LINKS.githubApp}
                  variant="secondary"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-white/60 text-white hover:border-white hover:bg-white/10"
                >
                  <GithubIcon className="size-4" />
                  View on GitHub
                </Button>
                <Button href="/open-source" variant="ghost" size="sm" className="text-white/85 hover:text-white">
                  Our open source stance →
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      </Container>
    </Section>
  );
}
