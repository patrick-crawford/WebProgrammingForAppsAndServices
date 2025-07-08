const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Web Programming for Apps and Services',
  tagline: 'Course Notes for Web Programming for Apps and Services',
  url: 'https://patrick-crawford.github.io',
  baseUrl: '/WebProgrammingForAppsAndServices',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'SDDS',
  projectName: 'WebProgrammingForAppsAndServices',
  themeConfig: {
    navbar: {
      title: 'Web Programming for Apps and Services',
      logo: {
        alt: 'Seneca Polytechnic',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Web Programming for Apps and Services',
          items: [
            {
              html: `<a href='#' id='pwa-button' class='footer__link-item' hidden>Install as an App</a>`,
            },
            {
              html: `<a href='./pdf/WebProgrammingForAppsAndServices.pdf' id='download-pdf' class='footer__link-item' download='WebProgrammingForAppsAndServices.pdf'>Download Notes (PDF)</a>`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Seneca Polytechnic.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: 'https://github.com/catherine-leung/OERTemplate/tree/main',
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, { strict: false }]],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  clientModules: [require.resolve('./pwaCustomButton.js')],
  plugins: [
    require.resolve('docusaurus-lunr-search'),
    [
      '@docusaurus/plugin-pwa',
      {
        offlineModeActivationStrategies: ['standalone', 'queryString'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: 'img/pwa/icon-512x512.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#DA291C',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#DA291C',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: 'img/pwa/icon-192x192.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: 'img/pwa/icon-512x512.png',
            color: '#DA291C',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: 'img/pwa/icon-512x512.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#DA291C',
          },
        ],
      },
    ],
  ],
};
