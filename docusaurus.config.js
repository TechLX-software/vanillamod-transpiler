module.exports = {
  title: 'vMod',
  tagline: 'Learn and Accelerate Game Development in Minecraft',
  url: 'https://bakerfugu.github.io/',
  baseUrl: '/vanillamod-transpiler/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'TechLX', // Usually your GitHub org/user name.
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
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/mdx/',
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
              label: 'Github Discussions',
              href: 'https://github.com/bakerfugu/vanillamod-transpiler/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'TechLX',
              href: 'https://www.techlx.com/',
            },
            {
              label: 'Blog',
              href: 'https://www.techlx.com/blog/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/bakerfugu/vanillamod-transpiler',
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
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
