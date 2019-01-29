/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

// https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /swagger-ui/,
            use: loaders.null()
          }
        ]
      }
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const landingPage = path.resolve('src/pages/index.tsx');

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      // Landing page
      if (node.frontmatter.path === '/') {
        createPage({
          path: node.frontmatter.path,
          component: landingPage,
          context: {} // additional data can be passed via context
        });
      }
    });
  });
};
