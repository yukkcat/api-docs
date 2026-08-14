import { redirect } from 'next/navigation';
import { localizePath } from '@/lib/i18n';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  redirect(localizePath(lang, '/docs/image/gpt-image-2'));
}
