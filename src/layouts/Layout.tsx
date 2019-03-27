import React, { Fragment, ReactNode } from 'react';
import Helmet from 'react-helmet';

import Header from '../components/Header';
import Footer from '../components/Footer';

const DEFAULT_TITLE = 'Developer portal';

const Layout = ({
  children,
  title,
  contentFromAsafeer
}: {
  children: ReactNode;
  title?: string;
  contentFromAsafeer?: boolean;
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
    <Footer contentFromAsafeer={contentFromAsafeer} />
  </Fragment>
);

export default Layout;
