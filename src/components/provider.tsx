'use client';
import SearchDialog from '@/components/search';
import { FrameworkProvider, type Framework } from 'fumadocs-core/framework';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { i18nProvider } from 'fumadocs-ui/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { type ReactNode } from 'react';
import { translations } from '@/lib/layout.shared';

const FrameworkLink = Link as NonNullable<Framework['Link']>;
const FrameworkImage = Image as NonNullable<Framework['Image']>;

function useNormalizedPathname() {
  const pathname = usePathname();

  if (pathname === '/zh-CN') return '/';
  return pathname.replace(/^\/zh-CN(?=\/|$)/, '');
}

export function Provider({ locale, children }: { locale: string; children: ReactNode }) {
  return (
    <RootProvider
      i18n={i18nProvider(translations, locale)}
      search={{
        SearchDialog,
        hotKey: [
          { key: (event) => event.metaKey || event.ctrlKey, display: 'Ctrl' },
          { key: 'k', display: 'K' },
        ],
      }}
    >
      <FrameworkProvider
        Link={FrameworkLink}
        Image={FrameworkImage}
        useParams={useParams}
        usePathname={useNormalizedPathname}
        useRouter={useRouter}
      >
        {children}
      </FrameworkProvider>
    </RootProvider>
  );
}
