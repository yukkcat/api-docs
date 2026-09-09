import { Provider } from '@/components/provider';
import '../global.css';
import { i18n } from '@/lib/i18n';
import type { Metadata } from 'next';

const siteIconUrl = 'https://yu-chat-model.oss-cn-beijing.aliyuncs.com/lg.gif';

export const metadata: Metadata = {
  icons: {
    icon: [{ url: siteIconUrl, type: 'image/gif' }],
    shortcut: [{ url: siteIconUrl, type: 'image/gif' }],
    apple: [{ url: siteIconUrl, type: 'image/gif' }],
  },
};

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider locale={lang}>{children}</Provider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
