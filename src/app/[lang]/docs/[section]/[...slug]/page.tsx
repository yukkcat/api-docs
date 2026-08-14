import { DocPageContent, getDocPageMetadata } from '@/lib/doc-page';
import { source } from '@/lib/source';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page(props: PageProps<'/[lang]/docs/[section]/[...slug]'>) {
  const params = await props.params;
  const page = source.getPage([params.section, ...params.slug], params.lang);
  if (!page) notFound();

  return <DocPageContent page={page} />;
}

export async function generateMetadata(
  props: PageProps<'/[lang]/docs/[section]/[...slug]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage([params.section, ...params.slug], params.lang);
  if (!page) notFound();

  return getDocPageMetadata(page);
}

export function generateStaticParams() {
  return source.generateParams().flatMap(({ lang, slug }) => {
    const [section, ...pageSlug] = slug;
    if (!section || pageSlug.length === 0) return [];

    return [{ lang, section, slug: pageSlug }];
  });
}
