import React from 'react';
import Typography from '@mui/material/Typography';
const TableSubHeader = ({ title }) => {
  return (
    <Typography
      sx={{
        textAlign: 'center',
        p: 2,
        m: 5,
        borderRadius: '30px',
        fontSize: { xs: '1.3rem', sm: '2rem' },
        boxShadow: '8px 6px 0px 3px #134d87',
        backgroundColor: 'gainsboro',
      }}
    >
      {title}
    </Typography>
  );
};

export default TableSubHeader;
