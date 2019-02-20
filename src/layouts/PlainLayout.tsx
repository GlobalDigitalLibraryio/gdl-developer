import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from './Layout';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import rehypeReact from 'rehype-react';

import styled from '@emotion/styled';

import { mq, misc } from '../styles';

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${misc.containers.large}px;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  flex: 1 0 auto;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.2);

  div {
    width: 100%;
  }
`;

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: (props: any) => (
      <Typography
        {...props}
        variant="h4"
        style={{ color: 'white', marginBottom: 15 }}
      />
    ),
    h2: (props: any) => (
      <Typography
        {...props}
        variant="h5"
        css={mq({
          gridArea: 'header',
          fontSize: '1.7rem',
          marginLeft: ['auto', 'inherit'],
          marginRight: ['auto', 'inherit'],
          marginTop: ['inherit', 'auto']
        })}
      />
    ),
    h3: (props: any) => (
      <Typography {...props} css={mq({ marginLeft: [10, 0] })} variant="h5" />
    ),
    a: (props: any) => (
      <Button
        {...props}
        variant="outlined"
        color="primary"
        to={props.href}
        component={Link}
      />
    )
  }
}).Compiler;

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
    }
  }
`;

export default ({ data, classes }) => (
  <Layout>
    <Main>{renderAst(data.markdownRemark.htmlAst)}</Main>
  </Layout>
);
