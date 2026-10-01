/**
 * One-off generator for the landing-page art (public/art/**.webp).
 *
 *   pnpm tsx scripts/generate-brand-art.ts            # generate missing images
 *   pnpm tsx scripts/generate-brand-art.ts --force    # regenerate all
 *   pnpm tsx scripts/generate-brand-art.ts --only strip|sections
 *
 * Reads OPENAI_API_KEY from .env. Idempotent: existing files are skipped
 * unless --force is passed. Output is committed, so this only needs to run
 * when an image is added or the style changes.
 */
import 'dotenv/config';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import OpenAI from 'openai';

const OUT_DIR = join(process.cwd(), 'public', 'art');
const MODEL = 'gpt-image-1.5';
const FORCE = process.argv.includes('--force');
const ONLY = process.argv[process.argv.indexOf('--only') + 1];

/**
 * Vintage 1980s–90s technology-magazine editorial print look, colour-shifted to the
 * Peon palette (indigo / near-black blocking, pink and cyan accents) so it sits with
 * the logo and the colour-block panels.
 */
const STYLE =
  'Contemporary editorial print photography with a vintage 1980s-90s technology-magazine aesthetic: ' +
  'coarse halftone dots, visible paper grain, analog film noise, soft-focus slightly blurry photography, ' +
  'slightly faded colours, subtle ink bleeding, imperfect offset-print texture, tactile paper surface, ' +
  'muted photographic tones, bold electric-indigo (#7170FF) and near-black colour blocking with vivid ' +
  'hot-pink (#F472B6) and cyan (#22D3EE) accents, flat chunky geometric graphics, minimal retro-futurist ' +
  'design, understated colour separation, scanned-print imperfections, nostalgic but sophisticated, ' +
  'premium independent magazine art direction. Absolutely no text, no letters, no numbers, no logos, no UI screenshots. ' +
  'Subject: ';

type Img = { file: string; prompt: string };

/** Hero marquee tiles. */
const STRIP: Img[] = [
  { file: 'server-rack', prompt: 'a tall server rack in a dim data centre, rows of blinking status lights, shot on film' },
  { file: 'git-push', prompt: 'a chunky geometric arrow launching upward out of a branching line diagram, cut-paper collage over a photo of a keyboard' },
  { file: 'database-backup', prompt: 'stacked glossy cylinders beside a soft-focus photo of magnetic tape reels, representing backups' },
  { file: 'tls-shield', prompt: 'a heavy brass padlock photographed on textured paper with a bold geometric shield shape behind it' },
  { file: 'terminal', prompt: 'a CRT monitor glowing in a dark room, scanlines visible, abstract colour bars on screen' },
  { file: 'team', prompt: 'four people seen from behind at a long desk of computers, 1990s office, colour-blocked wall behind them' },
  { file: 'domains', prompt: 'a vintage globe with bold geometric lines radiating to small rectangles, collage on grainy paper' },
  { file: 'compose-blocks', prompt: 'isometric shipping containers stacked like building blocks, photographed as a scale model' },
];

/** In-section images replacing the code-block mocks. */
const SECTIONS: Img[] = [
  // "The whole stack" rows
  { file: 'sections/git-push', prompt: 'a developer\'s hands on a mechanical keyboard, a bold geometric arrow graphic sweeping across the frame toward a glowing rectangle' },
  { file: 'sections/dashboard', prompt: 'a wide control-room desk with several CRT monitors showing abstract colour-blocked graphs and bars, soft focus, 1990s operations centre' },
  { file: 'sections/databases', prompt: 'rows of glossy cylinders on a shelf lit by a single lamp, a looping arrow graphic to a bold square, representing database backups' },
  { file: 'sections/domains', prompt: 'a close-up photo of a padlock and a globe on a desk, with chunky geometric route lines drawn over the print' },
  { file: 'sections/compose', prompt: 'a scale model of stacked shipping containers on a tabletop, geometric block shapes overlaid, offset-print look' },
  { file: 'sections/ssh-cron', prompt: 'a vintage analogue wall clock beside a glowing terminal screen, cut-paper geometric gear shapes, grainy print' },
  // "How it works" cards
  { file: 'sections/step-connect', prompt: 'a hand plugging a thick cable into the back of a beige 1990s server, dramatic side light, halftone print' },
  { file: 'sections/step-push', prompt: 'a close-up of a CRT monitor with an abstract branching line diagram, a bold arrow graphic pointing up and right' },
  { file: 'sections/step-run', prompt: 'a satellite dish and antenna tower against a colour-blocked sky, signal rings drawn as chunky geometric circles' },
  // Indigo panel rows
  { file: 'sections/mcp-chat', prompt: 'two vintage telephones connected by a bold geometric zigzag line, a glowing CRT in the background, retro-futurist collage' },
  { file: 'sections/audit-log', prompt: 'a stack of punched cards and a ledger book under a desk lamp, a row of chunky geometric avatar circles along the bottom edge' },
];

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');
  const openai = new OpenAI({ apiKey });

  const jobs = ONLY === 'strip' ? STRIP : ONLY === 'sections' ? SECTIONS : [...STRIP, ...SECTIONS];
  for (const img of jobs) {
    const out = join(OUT_DIR, `${img.file}.webp`);
    mkdirSync(join(out, '..'), { recursive: true });
    if (existsSync(out) && !FORCE) {
      console.log(`skip  ${img.file} (exists)`);
      continue;
    }
    process.stdout.write(`gen   ${img.file} … `);
    const res = await openai.images.generate({
      model: MODEL,
      prompt: STYLE + img.prompt,
      size: '1536x1024',
      quality: 'medium',
      output_format: 'webp',
      n: 1,
    });
    const b64 = res.data?.[0]?.b64_json;
    if (!b64) throw new Error(`no image returned for ${img.file}`);
    writeFileSync(out, Buffer.from(b64, 'base64'));
    console.log(`ok (${Math.round(Buffer.byteLength(b64, 'base64') / 1024)} KB)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
