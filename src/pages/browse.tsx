import React from 'react';
import SwaggerUI from '../components/SwaggerUI';
import Layout from '../components/Layout';
import withRoot from '../withRoot';

const BrowsePage = () => (
    <Layout>
        <div style={{ margin: 50 }}>
            <SwaggerUI />
        </div>
    </Layout>
);

export default withRoot(BrowsePage);
