import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import SwaggerUI from '../components/SwaggerUI';
import Layout from '../layouts/Layout';

const BookApiPage = () => (
  <StaticQuery
    query={graphql`
      query BookApiQuery {
        site {
          siteMetadata {
            oauthId
            bookApiDocs
            oauthRedirectUrl
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <SwaggerUI
          domId="swagger-book-api"
          redirectUrl={data.site.siteMetadata.oauthRedirectUrl}
          clientId={data.site.siteMetadata.oauthId}
          url={data.site.siteMetadata.bookApiDocs}
        />
      </Layout>
    )}
  />
);

export default BookApiPage;
