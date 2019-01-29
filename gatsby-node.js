/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);
const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``));

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

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });

    createNodeField({
      node,
      name: `slug`,
      value: replacePath(slug)
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const landingPage = path.resolve('src/pages/index.tsx');
  const plainLayout = path.resolve('src/components/PlainLayout.tsx');

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
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
          context: {
            slug: node.fields.slug
          } // additional data can be passed via context
        });
      } else {
        createPage({
          path: node.fields.slug,
          component: plainLayout,
          context: {
            slug: node.fields.slug
          } // additional data can be passed via context
        });
      }
    });
  });
};
