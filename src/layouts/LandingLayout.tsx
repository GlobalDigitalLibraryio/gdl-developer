import React from 'react';
import { graphql, Link } from 'gatsby';
import rehypeReact from 'rehype-react';
import { Typography, Button } from '@material-ui/core';

import { Cover, Section, Main, Grid, GridItem, GridHeader } from '../elements';
import Layout from './Layout';
import { mq } from '../styles';
import { css } from '@emotion/core';

const styles = {
  h1: css`
    color: white;
    margin-bottom: 15px;
  `,
  h2: mq({
    gridArea: 'header',
    fontSize: '1.7rem',
    marginLeft: ['auto', 'inherit'],
    marginRight: ['auto', 'inherit'],
    marginTop: ['inherit', 'auto']
  }),
  h3: mq({ marginLeft: [10, 0] }),
  body1: css`
    line-height: 1.7;
    font-size: 1rem;
  `,
  button: mq({
    gridArea: 'button',
    marginLeft: ['auto', 'inherit'],
    marginRight: ['auto', 'inherit']
  }),
  imageWrapper: mq({
    gridArea: 'image',
    width: 180,
    marginLeft: ['auto', 'inherit'],
    marginRight: ['auto', 'inherit']
  })
};

const Paragraph = (props: any) => {
  if (props.children.length === 1 && typeof props.children[0] === 'object') {
    const firstChild = props.children[0];
    if (!!firstChild.props.src) {
      return <p {...props} style={{ gridArea: 'image' }} />;
    } else if (!!firstChild.props.href) {
      return <p {...props} css={styles.button} />;
    } else if (firstChild.props.className === 'gatsby-resp-image-wrapper') {
      return <p {...props} css={styles.imageWrapper} />;
    } else {
      return <p {...props} />;
    }
  } else {
    return <Typography {...props} css={styles.body1} />;
  }
};

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: (props: any) => <Typography {...props} css={styles.h1} variant="h4" />,
    h2: (props: any) => <Typography {...props} css={styles.h2} variant="h5" />,
    h3: (props: any) => <Typography {...props} css={styles.h3} variant="h5" />,
    a: (props: any) => (
      <Button
        {...props}
        variant="outlined"
        color="primary"
        to={props.href}
        component={Link}
      />
    ),

    p: Paragraph,
    cover: Cover,
    section: Section,
    grid: Grid,
    griditem: GridItem,
    gridheader: GridHeader
  }
}).Compiler;

export const query = graphql`
  query LandingQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
    }
  }
`;

export default ({
  data
}: {
  data: { markdownRemark: { htmlAst: string } };
}) => (
  <Layout>
    <Main>{renderAst(data.markdownRemark.htmlAst)}</Main>
  </Layout>
);
