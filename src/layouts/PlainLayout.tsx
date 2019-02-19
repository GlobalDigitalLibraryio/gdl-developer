import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from './Layout';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const styles = (theme: Theme) => ({
  root: {
    margin: 50,
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    }
  }
});

const PlainLayout = ({ data, classes }) => (
  <Layout>
    <div className={classes.root}>
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
    </div>
  </Layout>
);

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default withStyles(styles)(PlainLayout);
