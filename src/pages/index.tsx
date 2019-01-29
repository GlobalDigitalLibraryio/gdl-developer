import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Link, graphql } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import cogs from '../assets/cogs.svg';

import Layout from '../components/Layout';
import withRoot from '../hocs/withRoot';

const IndexPage = ({ data }: { data: any }) => {
  const {
    markdownRemark: {
      frontmatter: { title, subtitle }
    }
  } = data;

  return (
    <Layout>
      <Card css={styles.card}>
        <CardContent>
          <Grid container direction="row">
            <Grid item>
              <img
                src={cogs}
                style={{
                  width: 100,
                  height: 100,
                  marginRight: 20,
                  marginBottom: 20
                }}
              />
            </Grid>
            <Grid item css={styles.center}>
              <Typography
                variant="h2"
                style={{ color: '#fff', marginBottom: 10 }}
              >
                {title}
              </Typography>
              <Typography variant="h5" style={{ color: '#fff', marginLeft: 4 }}>
                {subtitle}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Section>
        <Link to="/browse">
          <Typography variant="h6">Browse API</Typography>
        </Link>
        <Link to="/example">
          <Typography style={{ marginTop: 20 }} variant="h6">
            example
          </Typography>
        </Link>
      </Section>
    </Layout>
  );
};

const styles = {
  center: css`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  `,
  card: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
    background-color: #0277bd;
  `
};

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
`;

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        subtitle
      }
    }
  }
`;

export default withRoot(IndexPage);
