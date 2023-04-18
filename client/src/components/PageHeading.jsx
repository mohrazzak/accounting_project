import React from 'react';
import Typography from '@mui/material/Typography';

const PageHeading = (props) => {
  return (
    <Typography
      sx={{
        textAlign: 'center',
        fontSize: '2rem',
        border: '2px solid dodgerblue',
        borderRadius: '10px',
        color: 'black',
        fontWeight: 'bold',
        p: 2,
        mb: 3,
      }}
    >
      {props.title}
    </Typography>
  );
};

export default PageHeading;
