import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appNames, githubProfileUrl } from './shared';
import { ArrowUpRight } from 'lucide-react';
import { i18n } from './i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';

const qqGroupUrl = 'https://qm.qq.com/q/Jt1AF4ZH0s';

function GitHubIcon() {
  return (
    <svg className="size-4 text-fd-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c6.63 0 12 5.276 12 11.79-.001 5.067-3.29 9.567-8.175 11.187-.6.118-.825-.25-.825-.56 0-.398.015-1.665.015-3.242 0-1.105-.375-1.813-.81-2.181 2.67-.295 5.475-1.297 5.475-5.822 0-1.297-.465-2.344-1.23-3.169.12-.295.54-1.503-.12-3.125 0 0-1.005-.324-3.3 1.209a11.32 11.32 0 0 0-3-.398c-1.02 0-2.04.133-3 .398-2.295-1.518-3.3-1.209-3.3-1.209-.66 1.622-.24 2.83-.12 3.125-.765.825-1.23 1.887-1.23 3.169 0 4.51 2.79 5.527 5.46 5.822-.345.294-.66.81-.765 1.577-.69.31-2.415.81-3.495-.973-.225-.354-.9-1.223-1.845-1.209-1.005.015-.405.56.015.781.51.28 1.095 1.327 1.23 1.666.24.663 1.02 1.93 4.035 1.385 0 .988.015 1.916.015 2.196 0 .31-.225.664-.825.56C3.303 21.374-.003 16.867 0 11.791 0 5.276 5.37 0 12 0Z" />
    </svg>
  );
}

function QQIcon() {
  return (
    <svg className="size-4 text-fd-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673" />
    </svg>
  );
}

export const translations = i18n.translations().extend(uiTranslations()).add('ui', {
  en: {
    displayName: 'English',
  },
  'zh-CN': {
    displayName: '简体中文',
    search: '搜索文档',
    searchNoResult: '没有找到结果',
    searchOpen: '打开搜索',
    searchClose: '关闭搜索',
    toc: '本页目录',
    tocNoHeadings: '本页没有标题',
    tocInline: '本页内容',
    chooseLanguage: '选择语言',
    nextPage: '下一页',
    previousPage: '上一页',
    chooseTheme: '选择主题',
    themeToggle: '切换主题',
    themeLight: '浅色',
    themeDark: '深色',
    themeSystem: '跟随系统',
    codeBlockCopy: '复制代码',
    codeBlockCopied: '已复制',
    menuToggle: '切换菜单',
    pageActionsCopyMarkdown: '复制 Markdown',
    sidebarOpen: '打开侧边栏',
    sidebarCollapse: '收起侧边栏',
    notFoundTitle: '页面不存在',
    notFoundDescription: '你访问的页面不存在。',
    notFoundLink: '返回首页',
  },
});

export function baseOptions(locale: string): BaseLayoutProps {
  const chinese = locale === 'zh-CN';
  const appName = appNames[locale as keyof typeof appNames];

  return {
    nav: {
      title: <span className="font-semibold">{appName}</span>,
    },
    links: [
      {
        text: (
          <span className="inline-flex items-center gap-1.5">
            <span>{chinese ? 'API 控制台' : 'API Console'}</span>
            <ArrowUpRight className="size-4" />
          </span>
        ),
        url: 'https://api.klong.lat/',
        external: true,
        on: 'nav',
      },
      {
        type: 'icon',
        text: 'GitHub',
        label: 'GitHub',
        url: githubProfileUrl,
        external: true,
        on: 'menu',
        icon: <GitHubIcon />,
      },
      {
        type: 'icon',
        text: chinese ? 'QQ群：1101399736' : 'QQ Group: 1101399736',
        label: chinese ? '加入恐龙售后通知群' : 'Join the Klong support group',
        url: qqGroupUrl,
        external: true,
        on: 'menu',
        icon: <QQIcon />,
      },
    ],
  };
}
