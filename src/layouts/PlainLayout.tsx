import React from 'react';
import { graphql, Link } from 'gatsby';
import { Typography } from '@material-ui/core';
import rehypeReact from 'rehype-react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Layout from './Layout';
import SafeButton from '../components/SafeButton';
import { mq } from '../styles';
import { Main } from '../elements';
import { Data } from '../types';

const styles = {
  h1: css`
    font-weight: 600;
    font-size: 2.6rem;
    margin-bottom: 20px;
  `,
  h2: css`
    margin-top: 30px;
    font-size: 1.7rem;
    font-weight: 600;
  `,
  body1: css`
    line-height: 1.7;
    font-size: 1rem;
  `,
  section: mq({
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'hidden',
    padding: ['70px 30px', '80px 120px']
  }),
  content: mq({
    padding: ['70px 30px', '50px 120px']
  }),
  button: {
    marginTop: 20,
    gridArea: 'button'
  }
};

const ImageWrapper = styled.div`
  position: absolute;
  bottom: -80px;
  ${mq({ right: [0, '70px'] })};
  width: 300px;
  span {
    opacity: 0.3;
  }
`;

const Div = (props: any) => {
  if (props.children.length === 1 && typeof props.children[0] === 'object') {
    if (props.className === 'gatsby-highlight') {
      return <div {...props} style={{ width: 'auto' }} />;
    }
  }
  return <div {...props} style={{ width: '100vw' }} />;
};

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: (p: any) => <Typography {...p} variant="h3" css={styles.h1} />,
    h2: (p: any) => <Typography {...p} variant="h5" css={styles.h2} />,
    h3: (p: any) => <Typography {...p} variant="h5" />,
    p: (p: any) => <Typography {...p} css={styles.body1} />,
    code: (p: any) => (
      <code {...p} style={{ whiteSpace: 'pre-wrap', width: '100vw' }} />
    ),
    button: (p: any) => <SafeButton {...p} css={styles.button} />,
    section: (p: any) => <section {...p} css={styles.section} />,
    content: (p: any) => <div {...p} css={styles.content} />,
    bottomimagewrapper: ImageWrapper,
    div: Div
  }
}).Compiler;

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
    }
  }
`;

export default ({ data }: { data: Data }) => (
  <Layout>
    <Main>{renderAst(data.markdownRemark.htmlAst)}</Main>
  </Layout>
);
