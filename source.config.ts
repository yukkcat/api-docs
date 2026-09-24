import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    files: ['models/**/*.mdx', 'image/**/*.mdx', 'chat/**/*.mdx', 'admin/**/*.mdx'],
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    files: ['meta*.json', 'models/meta*.json', 'image/meta*.json', 'chat/meta*.json', 'admin/meta*.json'],
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
