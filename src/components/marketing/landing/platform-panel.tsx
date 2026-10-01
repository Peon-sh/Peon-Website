import { GithubIcon } from '@/components/icons/github';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SPONSOR_LINKS } from '@/lib/sponsors';
import { MockAudit, MockChat } from './mock-bits';

/** Indigo colour-block panel: platform-level promises with the detail folded into rows. */
export function PlatformPanel() {
  return (
    <Section divider={false} className="py-0 sm:py-0">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-between bg-surface-indigo px-6 py-16 text-surface-indigo-foreground sm:px-10 lg:min-h-[640px] lg:px-16 lg:py-20">
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

        <div className="bg-surface-indigo px-6 pb-16 text-surface-indigo-foreground sm:px-10 lg:py-20 lg:pr-16 lg:pl-12">
          <div className="border-t border-white/70">
            <Reveal tone="inverse" size="lg" title="MCP server and in-app AI assistant">
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
              <div className="mt-6">
                <MockChat />
              </div>
            </Reveal>
            <Reveal tone="inverse" size="lg" title="Team roles and audit logs">
              <p className="max-w-xl text-sm leading-relaxed sm:text-base">
                Workspace and project roles so teammates get an app, not root on every server.
                Owners see who did what, included on every plan, not gated behind Enterprise.
              </p>
              <div className="mt-6">
                <MockAudit />
              </div>
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
    </Section>
  );
}
