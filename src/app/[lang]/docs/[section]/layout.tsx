import { DocsSidebarTabs, DocsTopTabs } from '@/components/docs-top-tabs';
import type { Locale } from '@/lib/i18n';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import type { Node, Root } from 'fumadocs-core/page-tree';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { notFound } from 'next/navigation';

function containsSection(node: Node, sectionPath: string): boolean {
  if (node.type === 'page') return node.url.includes(sectionPath);
  if (node.type === 'folder') {
    return node.index?.url.includes(sectionPath) || node.children.some((child) => containsSection(child, sectionPath));
  }
  return false;
}

function getSectionTree(tree: Root, section: string): Root | undefined {
  const sectionPath = `/docs/${section}/`;
  const folder = tree.children.find(
    (node) => node.type === 'folder' && containsSection(node, sectionPath),
  );

  if (!folder || folder.type !== 'folder') return;

  return {
    ...tree,
    $id: `${tree.$id ?? 'docs'}:${section}`,
    name: folder.name,
    children: folder.children,
  };
}

export default async function Layout({ params, children }: LayoutProps<'/[lang]/docs/[section]'>) {
  const { lang, section } = await params;
  const tree = getSectionTree(source.getPageTree(lang), section);
  if (!tree) notFound();

  return (
    <DocsLayout
      {...baseOptions(lang)}
      tree={tree}
      sidebar={{
        prefetch: true,
        banner: <DocsSidebarTabs lang={lang as Locale} />,
      }}
      tabs={false}
    >
      <DocsTopTabs lang={lang as Locale} section={section} />
      {children}
    </DocsLayout>
  );
}
