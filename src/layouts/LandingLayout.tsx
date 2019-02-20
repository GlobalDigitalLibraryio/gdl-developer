import React from 'react';
import { graphql, Link } from 'gatsby';
import rehypeReact from 'rehype-react';
import { Typography, Button } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import styled from '@emotion/styled';

import Layout from './Layout';
import { mq, misc } from '../styles';

const Cover = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 380px;
  width: 100%;
  color: white;
  background-image: linear-gradient(#015b7c, #014269);
  ${mq({ padding: ['30px', '50px 120px'] })}
`;

const Section = styled.div<{ invert: string }>`
  display: grid;
  min-height: 380px;
  width: 100%;
  background-color: ${p => (p.invert ? '#FAFAFA' : 'white')};

  ${p =>
    p.invert &&
    'background-image: radial-gradient(#ffffff 50%, rgba(209, 209, 209, 0.3));'}
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
`;

const Grid = withWidth()(styled.div`
  display: grid;
  align-content: center;
  min-height: 380px;
  background-color: #fafafa;
  background-image: radial-gradient(#ffffff 50%, rgba(209, 209, 209, 0.3));
  ${p =>
    isWidthUp('md', p.width)
      ? 'grid-template-columns: 1fr 1fr'
      : 'grid-template-rows: 1fr 1fr'};
`);

const GridItem = styled.div<{ divider: string }>`
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
    ${mq({ textAlign: ['start', 'center'] })};
  }
`;

const GridHeader = styled.div`
  display: flex;
  ${mq({ flexDirection: ['row', 'column'] })};
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${misc.containers.large}px;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  height: 100%;
  flex: 1 0 auto;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.2);
`;

const Paragraph = (props: any) => {
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
    h1: (props: any) => (
      <Typography {...props} variant="h4" style={{ color: 'white' }} />
    ),
    h2: (props: any) => (
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
    h3: (props: any) => (
      <Typography {...props} css={mq({ marginLeft: [10, 0] })} variant="h5" />
    ),
    h4: (props: any) => <Typography {...props} />,
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
