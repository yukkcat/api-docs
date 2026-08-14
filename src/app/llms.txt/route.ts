import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const revalidate = false;

const chineseIndexPath = join(process.cwd(), 'index.md');
const englishIndexPath = join(process.cwd(), 'index.en.md');

export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get('locale') ?? 'zh-CN';
  const docsIndex = await readFile(locale === 'en' ? englishIndexPath : chineseIndexPath, 'utf8');
  return new Response([docsIndex, llms(source).index(locale)].join('\n\n'));
}
