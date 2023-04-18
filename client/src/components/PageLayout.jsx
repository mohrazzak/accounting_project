import React from 'react';
import Container from '@mui/material/Container';
import Header from './Header';
import PageLinks from './PageLinks';
import usePageLinks from '../hooks/usePageLinks';
const PageLayout = (props) => {
  const history = usePageLinks();
  return (
    <Container maxWidth="lg" sx={{ pt: 3, pb: 3 }}>
      <PageLinks history={history} />
      {props.children}
    </Container>
  );
};

export default PageLayout;
