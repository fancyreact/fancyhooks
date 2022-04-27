// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const fullYear = new Date().getFullYear();
const github = 'https://github.com/fancyreact/fancyhooks';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fancy Hooks',
  tagline: 'Apply FancY conditions to React Hooks',
  url: 'https://fancyreact.github.io',
  baseUrl: '/fancyhooks/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'fancyreact',
  projectName: 'fancyhooks',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: './documents',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: `${github}/website`,
          lastVersion: 'current',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Fancy Hooks',
        logo: {
          alt: 'fanyc hooks logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'fancyhooks',
            position: 'left',
            label: 'Getting Started',
          },
          {
            type: 'doc',
            docId: 'tutorialindex',
            position: 'left',
            label: 'Tutorial',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {
            href: github,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/fancyhooks',
              },
              {
                label: 'Tutorial',
                to: '/docs/tutorialindex',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: github,
              },
              {
                label: 'Give it a star!',
                href: `${github}/stargazers`,
              }
            ],
          },
        ],
        copyright: `Copyright © ${fullYear === 2022 ? '' : '2022 -'} ${fullYear} Fancy React`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
