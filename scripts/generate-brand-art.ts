/**
 * One-off generator for the landing-page art strip (public/art/*.webp).
 *
 *   pnpm tsx scripts/generate-brand-art.ts            # generate missing tiles
 *   pnpm tsx scripts/generate-brand-art.ts --force    # regenerate all
 *
 * Reads OPENAI_API_KEY from .env. Idempotent: existing files are skipped
 * unless --force is passed. Output is committed, so this only needs to run
 * when a tile is added or the style changes.
 */
import 'dotenv/config';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import OpenAI from 'openai';

const OUT_DIR = join(process.cwd(), 'public', 'art');
const MODEL = 'gpt-image-1.5';
const FORCE = process.argv.includes('--force');

const STYLE =
  'Flat vector illustration, bold geometric shapes, thick rounded strokes, no gradients, no shading, no text, no letters, no logos. ' +
  'Solid near-black background #0A0A0A. Use ONLY these colours for shapes: electric indigo #7170FF, hot pink #F472B6, bright cyan #22D3EE, and white. ' +
  'Composition centred with generous margins, playful but technical, suitable as a marketing tile for a developer tool. Subject: ';

const TILES: ReadonlyArray<{ file: string; prompt: string }> = [
  { file: 'server-rack', prompt: 'a tall server rack with glowing status lights and stacked blade units' },
  { file: 'git-push', prompt: 'a rocket-like arrow launching out of a git branch graph with commit dots' },
  { file: 'database-backup', prompt: 'a cylindrical database with a looping arrow into a cloud bucket, representing scheduled backups' },
  { file: 'tls-shield', prompt: 'a shield with a padlock in front of a globe, representing automatic HTTPS' },
  { file: 'terminal', prompt: 'a terminal window with a blinking cursor and a few abstract code bars, slightly tilted in 3D' },
  { file: 'team', prompt: 'four overlapping abstract avatar circles with a key icon, representing team roles and access' },
  { file: 'domains', prompt: 'a globe wrapped with routing lines pointing to several small browser windows' },
  { file: 'compose-blocks', prompt: 'isometric stacked containers snapping together like building blocks' },
];

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');
  const openai = new OpenAI({ apiKey });
  mkdirSync(OUT_DIR, { recursive: true });

  for (const tile of TILES) {
    const out = join(OUT_DIR, `${tile.file}.webp`);
    if (existsSync(out) && !FORCE) {
      console.log(`skip  ${tile.file} (exists)`);
      continue;
    }
    process.stdout.write(`gen   ${tile.file} … `);
    const res = await openai.images.generate({
      model: MODEL,
      prompt: STYLE + tile.prompt,
      size: '1536x1024',
      quality: 'medium',
      output_format: 'webp',
      n: 1,
    });
    const b64 = res.data?.[0]?.b64_json;
    if (!b64) throw new Error(`no image returned for ${tile.file}`);
    writeFileSync(out, Buffer.from(b64, 'base64'));
    console.log(`ok (${Math.round(Buffer.byteLength(b64, 'base64') / 1024)} KB)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
