// https://www.gatsbyjs.org/docs/environment-variables/#additional-environments-staging-test-etc
const GDL_ENVIRONMENT = process.env.GDL_ENVIRONMENT || 'dev';

const bookApiDocs = () => {
  switch (GDL_ENVIRONMENT) {
    case 'dev':
      return 'https://api.test.digitallibrary.io/book-api/api-docs';
    case 'prod':
      return 'https://api.digitallibrary.io/book-api/api-docs';
    default:
      return `https://api.${GDL_ENVIRONMENT}.digitallibrary.io/book-api/api-docs`;
  }
};

const imageApiDocs = () => {
  switch (GDL_ENVIRONMENT) {
    case 'dev':
      return 'https://api.test.digitallibrary.io/image-api/api-docs';
    case 'prod':
      return 'https://api.digitallibrary.io/image-api/api-docs';
    default:
      return `https://api.${GDL_ENVIRONMENT}.digitallibrary.io/image-api/api-docs`;
  }
};

console.log(`Using environment config: '${GDL_ENVIRONMENT}'`);

module.exports = {
  siteMetadata: {
    title: 'GDL developer portal',
    bookApiDocs: bookApiDocs(),
    imageApiDocs: imageApiDocs()
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-remark-images',
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      }
    },
    // Expose the file system to Gatsby's GrapQL API
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages'
      }
    },
    // Handle our static markdown files
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {}
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in src/layouts/index.js
              // right after importing the prism color scheme:
              //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'GDL developer portal',
        short_name: 'developer-portal',
        start_url: '/',
        background_color: '#0277bd',
        theme_color: '#0277bd',
        display: 'minimal-ui',
        icon: 'src/assets/favicon.png' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript'
  ]
};
