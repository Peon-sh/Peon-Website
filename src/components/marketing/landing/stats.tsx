import { Container, Section } from '@/components/ui/container';
import { StatTile } from '@/components/ui/stat-tile';

/** Staggered colour tiles with the numbers that matter. */
export function Stats() {
  return (
    <Section divider={false} className="pt-20 sm:pt-28">
      <Container>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile surface="pink" value="$3" label="per project per month on Cloud" className="min-h-56 lg:min-h-72" />
          <StatTile surface="cream" value="∞" label="team members on every plan" className="min-h-56 lg:mt-10 lg:min-h-72" />
          <StatTile surface="cyan" value="300+" label="one-click marketplace templates" className="min-h-56 lg:min-h-72" />
          <StatTile surface="indigo" value="0 s" label="downtime on rollouts" className="min-h-56 lg:mt-10 lg:min-h-72" />
        </div>
      </Container>
    </Section>
  );
}
