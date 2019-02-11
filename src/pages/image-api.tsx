import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import SwaggerUI from '../components/SwaggerUI';
import Layout from '../components/Layout';

const ImageApiPage = () => (
  <StaticQuery
    query={graphql`
      query ImageApiQuery {
        site {
          siteMetadata {
            imageApiDocs
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <SwaggerUI
          domId="swagger-image-api"
          url={data.site.siteMetadata.imageApiDocs}
        />
      </Layout>
    )}
  />
);

export default ImageApiPage;
