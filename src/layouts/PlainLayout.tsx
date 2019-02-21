import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from './Layout';
import { Button, Typography } from '@material-ui/core';
import rehypeReact from 'rehype-react';

import styled from '@emotion/styled';
import { mq } from '../styles';
import { Main } from '../elements';
import { css } from '@emotion/core';

const styles = {
  h1: css`
    font-weight: 600;
    font-size: 2.6rem;
    margin-bottom: 20px;
  `,
  h2: css`
    font-size: 1.7rem;
    font-weight: 600;
  `,
  body1: css`
    line-height: 1.7;
    font-size: 1rem;
  `,

  content: mq({
    padding: ['70px 30px', '50px 120px']
  }),
  section: mq({
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'hidden',
    padding: ['70px 30px', '80px 120px']
  })
};

const ImageWrapper = styled.p`
  position: absolute;
  bottom: -80px;
  ${mq({ right: [0, '70px'] })};
  width: 300px;
  span {
    opacity: 0.3;
  }
`;

const Paragraph = (props: any) => {
  if (props.children.length === 1 && typeof props.children[0] === 'object') {
    const firstChild = props.children[0];
    if (firstChild.props.className === 'gatsby-resp-image-wrapper') {
      return <ImageWrapper {...props} />;
    }
  }
  return <Typography {...props} css={styles.body1} />;
};

const Div = (props: any) => {
  if (props.children.length === 1 && typeof props.children[0] === 'object') {
    if (props.className === 'gatsby-highlight') {
      return <div {...props} css={mq({ width: ['auto', 'inherit'] })} />;
    }
  }
  return <div {...props} style={{ width: '100vw' }} />;
};

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: (props: any) => <Typography {...props} variant="h3" css={styles.h1} />,
    h2: (props: any) => <Typography {...props} variant="h5" css={styles.h2} />,
    h3: (props: any) => <Typography {...props} variant="h5" />,
    code: (props: any) => (
      <code {...props} style={{ whiteSpace: 'pre-wrap', width: '100vw' }} />
    ),

    button: props => (
      <Button
        {...props}
        variant="outlined"
        color="primary"
        component={Link}
        style={{ marginTop: 20, gridArea: 'button' }}
      >
        {props.title}
      </Button>
    ),
    div: Div,
    section: props => <section {...props} css={styles.section} />,
    content: props => <div {...props} css={styles.content} />,
    p: Paragraph
  }
}).Compiler;

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
    }
  }
`;

export default ({ data }) => (
  <Layout>
    <Main>{renderAst(data.markdownRemark.htmlAst)}</Main>
  </Layout>
);
