import React from 'react';
import { graphql, Link } from 'gatsby';
import rehypeReact from 'rehype-react';
import { Typography, Button } from '@material-ui/core';
import styled from '@emotion/styled';

import Layout from './Layout';

const Cover = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 50px 150px;
  height: 380px;
  width: 100%;
  color: white;
  background-image: linear-gradient(#015b7c, #014269);
`;

const Section = styled.div`
  display: grid;
  grid-gap: 3em;
  grid-template-areas: ${props =>
    props.invert
      ? `
      'header image'
      'content image'
      'button image'
      `
      : `
    'image header'
    'image content'
    'image button'
    `};

  padding: 50px 150px;
  height: 380px;
  width: 100%;
  background-color: ${props => (props.invert ? '#FAFAFA' : 'white')};
`;

const Grid = styled.div`
  display: grid;
  height: 380px;
  background-color: #fafafa;
  grid-template-columns: 1fr 1fr;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px;

  p {
    text-align: center;
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1060px;
  margin-left: auto;
  margin-right: auto;
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.2);
`;

const Paragraph = props => {
  if (props.children.length === 1 && typeof props.children[0] === 'object') {
    const firstChild = props.children[0];
    if (!!firstChild.props.src) {
      return <p {...props} style={{ gridArea: 'image' }} />;
    } else if (!!firstChild.props.href) {
      return <p {...props} style={{ gridArea: 'button' }} />;
    } else {
      return <p {...props} />;
    }
  } else {
    return <p {...props} />;
  }
};

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: props => (
      <Typography {...props} variant="h3" style={{ color: 'white' }} />
    ),
    h2: props => (
      <Typography {...props} variant="h5" style={{ gridArea: 'header' }} />
    ),
    h3: props => <Typography {...props} variant="h5" />,
    h4: props => <Typography {...props} />,
    p: Paragraph,
    a: (props: any) => (
      <Button
        {...props}
        variant="outlined"
        color="primary"
        to={props.href}
        component={Link}
      />
    ),
    cover: Cover,
    section: Section,
    grid: Grid,
    griditem: GridItem
  }
}).Compiler;

const LandingLayout = ({ data }) => (
  <Layout>
    <Main>{renderAst(data.markdownRemark.htmlAst)}</Main>
  </Layout>
);

export const query = graphql`
  query LandingQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
    }
  }
`;

export default LandingLayout;
