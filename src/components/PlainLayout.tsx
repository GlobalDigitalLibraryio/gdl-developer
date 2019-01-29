import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from './Layout';
import withRoot from '../hocs/withRoot';
import { Typography } from '@material-ui/core';

const PlainLayout = ({ data }) => (
  <Layout>
    <div style={{ marginBottom: 20 }}>
      <Typography variant="h2">
        {data.markdownRemark.frontmatter.title}
      </Typography>
    </div>
    {data.markdownRemark.frontmatter.image && (
      <div style={{ width: '60%', marginBottom: 50 }}>
        <Img
          fluid={data.markdownRemark.frontmatter.image.childImageSharp.fluid}
        />
      </div>
    )}
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </Layout>
);

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default withRoot(PlainLayout);
