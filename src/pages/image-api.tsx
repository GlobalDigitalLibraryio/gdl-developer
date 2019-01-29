import React from 'react';
import SwaggerUI from '../components/SwaggerUI';
import Layout from '../components/Layout';
import withRoot from '../hocs/withRoot';

const ImageApiPage = () => (
  <Layout>
    <SwaggerUI
      domId="swagger-image-api"
      url="https://api.test.digitallibrary.io/image-api/api-docs"
    />
  </Layout>
);

export default withRoot(ImageApiPage);
