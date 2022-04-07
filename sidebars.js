// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  main: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        {
          type: 'doc',
          id: 'fancyhooks',
          label: 'Getting Started',
        },
        {
          type: 'doc',
          id: 'installation',
          label: 'Installation',
        },
      ],
    },
    {
      type: 'category',
      label: 'Tutorial',
      items: [
        {
          type: 'doc',
          label: 'Tutorial Index',
          id: 'tutorialindex',
        },
        {
          type: 'doc',
          label: 'useFancyState',
          id: 'usefancystate',
        },
        {
          type: 'doc',
          label: 'useFancyEffect',
          id: 'usefancyeffect',
        },
      ],
    },
  ],
};

module.exports = sidebars;
