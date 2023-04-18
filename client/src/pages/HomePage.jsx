import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PageHeading from '../components/PageLayout';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { getIconComponent } from '../store/pages';
import axios from 'axios';
const PageBoxes = () => {
  let pages = useSelector((state) => state.pages);
  pages = pages.map((page) => ({ ...page, icon: getIconComponent(page.icon) }));

  pages = pages.filter((page) => page.url !== '/');
  return (
    <Grid container spacing={3}>
      {pages.map((page, i) => (
        <Grid
          item
          xs={i === 0 ? 12 : 6}
          key={i}
          sx={{
            justifyContent: 'center',
            mb: 2,
            p: 1,
          }}
        >
          <Link to={page.url} style={{ listStyle: 'none' }}>
            <Button
              variant="contained"
              sx={{
                fontSize: '1.5rem',
                display: 'flex',
                justifyContent: i === 0 ? 'space-evenly' : 'space-between',
                width: '100%',
                height: '80px',
              }}
            >
              {<page.icon />}
              <Typography fontSize="1.2rem">{page.title}</Typography>
            </Button>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

const HomePage = () => {
  return (
    <PageLayout>
      {/* <PageHeading title="صفحة اليومية" /> */}
      <PageBoxes />
    </PageLayout>
  );
};

export default HomePage;
