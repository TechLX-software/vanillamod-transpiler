module.exports = {
  title: 'vMod',
  tagline: 'Learn and Accelerate Game Development in Minecraft',
  url: 'https://bakerfugu.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/32x32-dark.png',
  organizationName: 'bakerfugu', // Usually your GitHub org/user name.
  projectName: 'vanillamod-transpiler', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Home',
      logo: {
        alt: 'My Site Logo',
        src: 'img/flower-icon-256.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'playground',
          activeBasePath: 'playground',
          label: 'Playground',
          position: 'left',
        },
        {
          href: 'https://www.vanillamod.com/',
          label: 'VanillaMod.com',
          position: 'right',
        },
        {
          href: 'https://www.techlx.com/blog/',
          label: 'Blog',
          position: 'right',
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
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass'],
};
