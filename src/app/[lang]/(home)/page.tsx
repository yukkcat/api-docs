import { localizePath, type Locale } from '@/lib/i18n';
import { apiConsoleUrl, brandLogoUrl, shopUrl } from '@/lib/shared';
import {
  ArrowRight,
  Braces,
  ExternalLink,
  ImageIcon,
  MessageSquareText,
  ShoppingBag,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

const copy = {
  'zh-CN': {
    title: 'Klong API 接口文档',
    description: 'OpenAI 兼容接口',
    console: 'API 控制台',
    shop: '购买额度',
    sections: [
      ['快速开始', '获取 API Key，配置 Base URL，完成首次调用'],
      ['图像接口', 'GPT Image 2 与 Nano Banana 的生成和编辑调用'],
      ['对话接口', 'Chat Completions、Responses 与 Claude Messages'],
      ['开源项目', 'ChatGPT2API 与 Gemini Business2API 部署文档'],
    ],
  },
  en: {
    title: 'Klong API Documentation',
    description: 'OpenAI-compatible API',
    console: 'API Console',
    shop: 'Buy Credits',
    sections: [
      ['Quick Start', 'Get an API key, set the Base URL, and make your first request'],
      ['Image API', 'Generate and edit images with GPT Image 2 and Nano Banana'],
      ['Chat API', 'Chat Completions, Responses, and Claude Messages'],
      ['Open Source', 'Deployment guides for ChatGPT2API and Gemini Business2API'],
    ],
  },
} satisfies Record<Locale, {
  title: string;
  description: string;
  console: string;
  shop: string;
  sections: [string, string][];
}>;

const sections = [
  { href: '/docs/start/quick-start', icon: null },
  { href: '/docs/image/gpt-image-2', icon: ImageIcon },
  { href: '/docs/chat/chat-completions', icon: MessageSquareText },
  { href: '/docs/client/chatgpt2api', icon: Braces },
] as const;

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const locale = lang as Locale;
  const text = copy[locale];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-14 sm:px-8 sm:py-20">
      <section className="border-b border-fd-border pb-10">
        <h1 className="max-w-3xl text-3xl font-semibold tracking-normal text-fd-foreground sm:text-4xl">
          {text.title}
        </h1>
        <p className="mt-4 text-base text-fd-muted-foreground">
          {text.description}
          <span aria-hidden="true"> · </span>
          <code className="rounded bg-fd-muted px-1.5 py-1 font-mono text-sm text-fd-foreground">
            https://api.klong.lat/v1
          </code>
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={apiConsoleUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-fd-primary px-4 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            {text.console}
            <ExternalLink className="size-4" />
          </a>
          <a
            href={shopUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-4 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            <ShoppingBag className="size-4" />
            {text.shop}
          </a>
        </div>
      </section>

      <section className="grid gap-3 pt-8 sm:grid-cols-2" aria-label={locale === 'zh-CN' ? '文档分类' : 'Documentation sections'}>
        {sections.map((section, index) => {
          const Icon = section.icon;
          const [title, description] = text.sections[index];

          return (
            <Link
              key={section.href}
              href={localizePath(locale, section.href)}
              prefetch
              className="group flex min-h-32 items-start gap-4 rounded-lg border border-fd-border bg-fd-card p-5 transition-colors hover:border-fd-primary/45 hover:bg-fd-accent/55"
            >
              <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-fd-muted text-fd-primary">
                {Icon ? (
                  <Icon className="size-5" />
                ) : (
                  <img src={brandLogoUrl} alt="" aria-hidden="true" className="size-full object-cover" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-3 font-semibold text-fd-foreground">
                  {title}
                  <ArrowRight className="size-4 shrink-0 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-fd-primary" />
                </span>
                <span className="mt-2 block text-sm leading-6 text-fd-muted-foreground">{description}</span>
              </span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  const text = copy[lang as Locale];

  return {
    title: text.title,
    description: `${text.description}: https://api.klong.lat/v1`,
  };
}
