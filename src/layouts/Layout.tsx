import React, { Fragment, ReactNode } from 'react';
import Helmet from 'react-helmet';

import Header from '../components/Header';

const DEFAULT_TITLE = 'Developer portal';

const Layout = ({
  children,
  title
}: {
  children: ReactNode;
  title?: string;
}) => (
  <Fragment>
    <Helmet
      title={title || DEFAULT_TITLE}
      meta={[
        { name: 'description', content: 'A developer portal for GDL' },
        { name: 'keywords', content: 'Developer, portal, gdl' }
      ]}
    >
      <html lang="en" />
    </Helmet>
    <Header siteTitle={title || DEFAULT_TITLE} />
    {children}
  </Fragment>
);

export default Layout;
