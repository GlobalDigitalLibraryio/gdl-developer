import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import SwaggerUI from '../components/SwaggerUI';
import Layout from '../layouts/Layout';

const GameServicePage = () => (
  <StaticQuery
    query={graphql`
      query GameServiceQuery {
        site {
          siteMetadata {
            oauthId
            gameServiceDocs
            oauthRedirectUrl
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <SwaggerUI
          domId="swagger-game-service"
          redirectUrl={data.site.siteMetadata.oauthRedirectUrl}
          clientId={data.site.siteMetadata.oauthId}
          url={data.site.siteMetadata.gameServiceDocs}
        />
      </Layout>
    )}
  />
);

export default GameServicePage;
