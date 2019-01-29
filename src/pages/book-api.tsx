import React from 'react';
import SwaggerUI from '../components/SwaggerUI';
import Layout from '../components/Layout';
import withRoot from '../hocs/withRoot';

const BookApiPage = () => (
  <Layout>
    <SwaggerUI
      domId="swagger-book-api"
      url="https://api.test.digitallibrary.io/book-api/api-docs"
    />
  </Layout>
);

export default withRoot(BookApiPage);
