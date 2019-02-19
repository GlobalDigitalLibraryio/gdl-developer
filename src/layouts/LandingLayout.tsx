import React from 'react';
import { graphql, Link } from 'gatsby';
import rehypeReact from 'rehype-react';
import { Typography, Button } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import styled from '@emotion/styled';
import facepaint from 'facepaint';

const mq = facepaint([`@media(min-width: 960px)`]);

import Layout from './Layout';

const Cover = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 380px;
  width: 100%;
  color: white;
  background-image: linear-gradient(#015b7c, #014269);
  ${p => mq({ padding: ['30px', '50px 120px'] })}
`;

const Section = styled.div`
  display: grid;
  ${p =>
    mq({
      padding: ['30px', '50px 120px'],
      gridGap: ['1em', '3em'],
      gridTemplateAreas: [
        `
  'header'
  'image'
  'content'
  'button'`,
        p.invert
          ? `
  'header image'
  'content image'
  'button image'
  `
          : `
'image header'
'image content'
'image button'
`
      ]
    })};
  min-height: 380px;
  width: 100%;
  ${props =>
    props.invert &&
    'background-image: radial-gradient(#ffffff, rgba(209, 209, 209, 0.2));'}
  background-color: ${props => (props.invert ? '#FAFAFA' : 'white')};
`;

const Grid = withWidth()(styled.div`
  display: grid;
  align-content: center;
  min-height: 380px;
  background-color: #fafafa;
  ${props =>
    isWidthUp('md', props.width)
      ? 'grid-template-columns: 1fr 1fr'
      : 'grid-template-rows: 1fr 1fr'};
`);

const GridItem = styled.div`
  display: flex;
  ${p =>
    mq({
      padding: ['30px', '5px 50px'],
      borderRight: [p.divider ? '1px solid #e5e5e5' : 'inherit']
    })}
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  p {
    ${p => mq({ textAlign: ['start', 'center'] })};
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1060px;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  height: 100%;
  flex: 1 0 auto;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.2);
`;

const Paragraph = props => {
  if (props.children.length === 1 && typeof props.children[0] === 'object') {
    const firstChild = props.children[0];
    if (!!firstChild.props.src) {
      return <p {...props} style={{ gridArea: 'image' }} />;
    } else if (!!firstChild.props.href) {
      return (
        <p
          {...props}
          css={mq({
            gridArea: 'button',
            marginLeft: ['auto', 'inherit'],
            marginRight: ['auto', 'inherit']
          })}
        />
      );
    } else if (firstChild.props.className === 'gatsby-resp-image-wrapper') {
      return (
        <p
          {...props}
          css={mq({
            gridArea: 'image',
            width: 180,
            marginLeft: ['auto', 'inherit'],
            marginRight: ['auto', 'inherit']
          })}
        />
      );
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
      <Typography {...props} variant="h4" style={{ color: 'white' }} />
    ),
    h2: props => (
      <Typography
        {...props}
        variant="h5"
        css={mq({
          gridArea: 'header',
          marginLeft: ['auto', 'inherit'],
          marginRight: ['auto', 'inherit']
        })}
      />
    ),
    h3: props => <Typography {...props} variant="h5" />,
    h4: props => <Typography {...props} />,
    cover: Cover,
    section: Section,
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
