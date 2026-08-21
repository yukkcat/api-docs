'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { localizePath, type Locale } from '@/lib/i18n';
import { SidebarTabsDropdown } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import {
  ImageIcon,
  MessageSquareText,
  type LucideIcon,
} from 'lucide-react';

type DocsSection = {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  icon: LucideIcon;
  href?: string;
  prefix?: string;
  paths?: readonly string[];
};

const tabs: DocsSection[] = [
  {
    title: { 'zh-CN': '图像接口', en: 'Image API' },
    description: { 'zh-CN': 'GPT Image 与 Nano Banana', en: 'GPT Image and Nano Banana' },
    href: '/docs/image/gpt-image-2',
    prefix: '/docs/image',
    paths: ['/docs/image/gpt-image-2', '/docs/image/nano-banana'],
    icon: ImageIcon,
  },
  {
    title: { 'zh-CN': '对话接口', en: 'Chat API' },
    description: { 'zh-CN': 'OpenAI 与 Claude 对话', en: 'OpenAI and Claude chat' },
    href: '/docs/chat/chat-completions',
    prefix: '/docs/chat',
    paths: [
      '/docs/chat/chat-completions',
      '/docs/chat/responses',
      '/docs/chat/claude-messages',
      '/docs/chat/models',
    ],
    icon: MessageSquareText,
  },
];

export function DocsSidebarTabs({ lang }: { lang: Locale }) {
  const options: LayoutTab[] = tabs.map((tab) => {
    const Icon = tab.icon;
    const disabled = !tab.href;

    return {
      title: tab.title[lang],
      description: tab.description[lang],
      url: tab.href ? localizePath(lang, tab.href) : '#',
      urls: new Set(tab.paths?.map((path) => localizePath(lang, path))),
      icon: (
        <span className="flex size-full items-center justify-center rounded-md bg-fd-primary/10 text-fd-primary">
          <Icon className="size-4" />
        </span>
      ),
      props: disabled
        ? {
            'aria-disabled': true,
            className: 'pointer-events-none opacity-45',
          }
        : undefined,
    };
  });

  return <SidebarTabsDropdown className="md:hidden" options={options} />;
}

export function DocsTopTabs({ lang, section }: { lang: Locale; section: string }) {
  return (
    <nav
      aria-label={lang === 'zh-CN' ? '文档分类' : 'Documentation sections'}
      className="sticky top-(--fd-docs-row-3) z-[5] hidden h-12 self-start overflow-x-auto border-b bg-fd-background/95 px-6 pt-3 backdrop-blur [grid-area:main] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex xl:px-8"
    >
      <div className="flex min-w-max flex-row items-end gap-5 md:gap-6">
        {tabs.map((tab) => {
          if (!tab.href || !tab.prefix) {
            return (
              <span
                key={tab.title.en}
                aria-disabled="true"
                className="inline-flex cursor-default border-b-2 border-transparent pb-1.5 text-sm font-medium text-fd-muted-foreground/55 text-nowrap"
              >
                {tab.title[lang]}
              </span>
            );
          }

          const href = localizePath(lang, tab.href);
          const active = tab.prefix === `/docs/${section}`;

          return (
            <Link
              key={href}
              href={href}
              prefetch
              className={cn(
                'inline-flex border-b-2 border-transparent pb-1.5 text-sm font-medium text-nowrap text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground',
                active && 'border-fd-primary text-fd-primary',
              )}
            >
              {tab.title[lang]}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
