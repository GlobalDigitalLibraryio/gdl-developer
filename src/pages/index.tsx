import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, Grid, Theme } from '@material-ui/core';
import { Link } from 'gatsby';
import cogs from '../assets/cogs.svg';

import Layout from '../components/Layout';
import withRoot from '../withRoot';

const styles = (theme: Theme) => ({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    margin: 50,
    backgroundColor: '#0277bd'
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 3
  },
  toolbar: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    marginRight: theme.spacing.unit
  }
});

const IndexPage = ({ classes }) => (
  <Layout>
    <Card className={classes.card}>
      <CardContent>
        <Grid container direction="row">
          <Grid item>
            <img
              src={cogs}
              style={{
                width: 100,
                height: 100,
                marginRight: 20,
                marginBottom: 20
              }}
            />
          </Grid>
          <Grid item className={classes.center}>
            <Typography
              variant="h2"
              style={{ color: '#fff', marginBottom: 10 }}
            >
              Global Digital Library
            </Typography>
            <Typography variant="h5" style={{ color: '#fff' }}>
              Developer portal
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

    <section className={classes.section}>
      <Link to="/browse">
        <Typography variant="h6">Browse API</Typography>
      </Link>
    </section>
  </Layout>
);

export default withRoot(withStyles(styles)(IndexPage));
