import { defineI18n } from 'fumadocs-core/i18n';

export type Locale = 'zh-CN' | 'en';

export const i18n = defineI18n({
  defaultLanguage: 'zh-CN',
  languages: ['zh-CN', 'en'],
  parser: 'dot',
  hideLocale: 'default-locale',
  fallbackLanguage: null,
});

export function localizePath(locale: string, path: string) {
  return locale === i18n.defaultLanguage ? path : `/${locale}${path}`;
}
