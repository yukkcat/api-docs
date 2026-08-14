import { getLLMText, source } from '@/lib/source';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const revalidate = false;

const chineseIndexPath = join(process.cwd(), 'index.md');
const englishIndexPath = join(process.cwd(), 'index.en.md');

export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get('locale') ?? 'zh-CN';
  const docsIndex = await readFile(locale === 'en' ? englishIndexPath : chineseIndexPath, 'utf8');
  const scan = source.getPages(locale).map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response([docsIndex, ...scanned].join('\n\n'));
}
