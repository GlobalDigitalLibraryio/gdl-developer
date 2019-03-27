import React from 'react';
import { Card, List, ListItem, Typography } from '@material-ui/core';
import { Link } from 'gatsby';
import Layout from '../layouts/Layout';
import { Main } from '../elements';

const BrowsePage = () => (
  <Layout>
    <Main>
      <Card style={{ padding: 50 }}>
        <List>
          <ListItem component="div">
            <Typography variant="h6">Available</Typography>
          </ListItem>
          <ListItem>
            <Link to="/book-api">
              <Typography>book-api</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/image-api">
              <Typography>image-api</Typography>
            </Link>
          </ListItem>
        </List>
      </Card>
    </Main>
  </Layout>
);

export default BrowsePage;
