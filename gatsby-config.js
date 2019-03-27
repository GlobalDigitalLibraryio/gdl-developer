const {
  GDL_AUTH_CLIENT_ID,
  GDL_ENVIRONMENT,
  apiDocs,
  oauthRedirectUrl
} = require('./config');

console.log(`Using environment config: '${GDL_ENVIRONMENT}'`);

const PRIMARY_COLOR = '#0277bd';

module.exports = {
  siteMetadata: {
    title: 'Developer portal',
    bookApiDocs: apiDocs('book-api'),
    imageApiDocs: apiDocs('image-api'),
    oauthId: GDL_AUTH_CLIENT_ID,
    oauthRedirectUrl: oauthRedirectUrl(),
    zendeskUrl: 'https://digitallibrary.zendesk.com/hc/en-us/requests/new'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        theme: {
          primaryColor: PRIMARY_COLOR
        }
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
            options: {
              maxWidth: 1060,
              linkImagesToOriginal: false,
              backgroundColor: 'transparent'
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              ignoreFileExtensions: []
            }
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
        background_color: PRIMARY_COLOR,
        theme_color: PRIMARY_COLOR,
        display: 'minimal-ui',
        icon: 'src/assets/favicon.png' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript'
  ]
};
