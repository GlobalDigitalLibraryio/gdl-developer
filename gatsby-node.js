/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

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
