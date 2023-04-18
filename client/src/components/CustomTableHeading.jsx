import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

const CustomTableHeading = ({ rows }) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={6} sx={{ fontSize: '1.2rem', width: '50%' }}>
            {rows.title}
          </TableCell>
          <TableCell
            colSpan={6}
            sx={{
              color: rows.value >= 0 ? 'green' : 'tomato',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              width: '50%',
            }}
          >
            <Typography
              style={{
                direction: 'ltr',
                fontWeight: 'bold',
                color: rows.value >= 0 ? 'green' : 'tomato',
              }}
            >
              {rows.value}
            </Typography>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={6} sx={{ fontSize: '1.2rem' }}>
            قيمة {rows.title}
          </TableCell>
          <TableCell
            colSpan={1}
            sx={{
              color: rows.value >= 0 ? 'green' : 'tomato',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            <Typography
              style={{
                direction: 'ltr',
                fontWeight: 'bold',
                color: rows.values >= 0 ? 'green' : 'tomato',
              }}
            >
              {rows.values}
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CustomTableHeading;
