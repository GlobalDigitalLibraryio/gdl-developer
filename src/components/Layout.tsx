import React, { Fragment, ReactNode } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Fragment>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'A developer portal for GDL' },
            { name: 'keywords', content: 'Developer, portal, gdl' }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        {children}
      </Fragment>
    )}
  />
);

export default Layout;
