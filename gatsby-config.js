module.exports = {
  siteMetadata: {
    title: 'GDL developer portal'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-material-ui',
        short_name: 'developer-portal',
        start_url: '/',
        background_color: '#0277bd',
        theme_color: '#0277bd',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript'
  ]
};
