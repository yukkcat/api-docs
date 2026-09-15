import { redirect } from 'next/navigation';
import { localizePath } from '@/lib/i18n';

export default async function Page({ params }: PageProps<'/[lang]/docs'>) {
  const { lang } = await params;
  redirect(localizePath(lang, '/docs/models/overview'));
}
