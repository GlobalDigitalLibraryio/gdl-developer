import React, { Fragment, ReactNode } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Header from './Header';

const styles = (theme: Theme) => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    }
  }
});

const Layout = ({
  children,
  classes
}: {
  children: ReactNode;
  classes: any;
}) => (
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
        <div className={classes.root}>{children}</div>
      </Fragment>
    )}
  />
);

export default withStyles(styles)(Layout);
