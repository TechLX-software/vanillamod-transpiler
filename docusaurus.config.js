module.exports = {
  title: 'vMod',
  tagline: 'Learn and Accelerate Game Development in Minecraft',
  url: 'https://bakerfugu.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'bakerfugu', // Usually your GitHub org/user name.
  projectName: 'vanillamod-transpiler', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'vMod',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://www.techlx.com/blog/',
          label: 'Blog',
          position: 'left',
        },
        {
          href: 'https://github.com/bakerfugu/vanillamod-transpiler',
          label: 'Source',
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
              label: 'Introduction',
              to: 'docs/',
            },
            {
              label: 'Code Reference',
              to: 'docs/Code/quick-reference',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/WPMCMjy',
            },
            {
              label: 'Reddit',
              href: 'https://www.reddit.com/r/VanillaMod/',
            },
            {
              label: 'Github',
              href: 'https://github.com/bakerfugu/vanillamod-transpiler/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://www.techlx.com/blog/',
            },
            {
              label: 'Source',
              href: 'https://github.com/bakerfugu/vanillamod-transpiler',
            },
            {
              label: 'TechLX',
              href: 'https://www.techlx.com/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} TechLX, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/bakerfugu/vanillamod-transpiler/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
