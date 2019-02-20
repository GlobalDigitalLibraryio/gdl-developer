import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import SwaggerUI from '../components/SwaggerUI';
import Layout from '../layouts/Layout';

const ImageApiPage = () => (
  <StaticQuery
    query={graphql`
      query ImageApiQuery {
        site {
          siteMetadata {
            oauthId
            imageApiDocs
            oauthRedirectUrl
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <SwaggerUI
          domId="swagger-image-api"
          redirectUrl={data.site.siteMetadata.oauthRedirectUrl}
          clientId={data.site.siteMetadata.oauthId}
          url={data.site.siteMetadata.imageApiDocs}
        />
      </Layout>
    )}
  />
);

export default ImageApiPage;
