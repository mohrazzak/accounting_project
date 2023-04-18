import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  tableCellClasses,
  TableCell,
  Paper,
  TablePagination,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// import { AiFillDelete } from 'react-icons/ai';
import { Delete as AiFillDelete, Edit as AiTwotoneEdit } from 'react-feather';

// import { AiTwotoneEdit } from 'react-icons/ai';
import ConfirmDialog from './ConfirmDialog';
import { Link } from 'react-router-dom';
import useTable from '../hooks/useTable';
import MyDialog from './MyDialog';

const dialogTitle = 'تجربة';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#237a23',
    color: 'white',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  transition: 'background-color 0.3s ease',

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: '#bdffdb !important',
  },
}));

const LogsTable = ({
  columns,
  isMonthly,
  deletedLabel,
  rows,
  rowInitialValue,
  validationSchema,
  dispatchers,
}) => {
  const { dialog, setDialog } = useTable(rowInitialValue);

  const [openConfirm, setOpenConfirm] = useState({
    status: false,
    id: null,
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleSelectEdit = (row) => {
    setDialog(() => ({ selectedRow: row, status: true, editing: true }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedRows = rows.slice(startIndex, endIndex);

  const columnsWithOptions = [
    ...columns,
    {
      id: 'edit',
      label: 'تعديل',
      align: 'center',
      minWidth: '40px',
    },
    {
      id: 'delete',
      label: 'حذف',
      align: 'center',
      minWidth: '40px',
    },
  ];

  const options = [
    {
      label: 'تعديل',
      id: 'edit',
      icon: <AiTwotoneEdit />,
      onClick: (row) => {
        handleSelectEdit(row);
      },
      align: 'center',
    },
    {
      label: 'حذف',
      id: 'delete',
      icon: <AiFillDelete />,
      onClick: (row) => {
        setOpenConfirm({ status: true, id: row.invoice ?? row.id });
      },
      align: 'center',
    },
  ];

  const stylingFunction = (column, value, row) => {
    const accountId = column.id === 'accountName' ? row.accountId : row.id;
    if (column.isBill) {
      return (
        <Typography
          sx={{
            color: row.billType === 'ادخال' ? 'green' : 'tomato',
            fontWeight: 'bold',
          }}
        >
          {value}
        </Typography>
      );
    }
    if (column.isMoney) {
      return (
        <Typography
          sx={{
            color: value >= 0 ? 'green' : 'tomato',
            fontWeight: 'bold',
            direction: 'rtl',
          }}
        >
          {value}
        </Typography>
      );
    }
    if (column.isLink) {
      return (
        <Link
          to={`/customers/${accountId}`}
          style={{
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          {value}
        </Link>
      );
    }
    return value;
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columnsWithOptions.map((column) => {
                return (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedRows.map((row, index) => {
              return (
                <StyledTableRow
                  style={{
                    backgroundColor:
                      row.month == new Date().getMonth() + 1 && '#bbff3666',
                  }}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  // return the invoice if it exists
                  key={row.invoice ?? row.id}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {stylingFunction(column, value, row)}
                      </StyledTableCell>
                    );
                  })}
                  {options.map((option, index) => {
                    return (
                      <StyledTableCell key={option.id} align={option.align}>
                        <IconButton
                          aria-label={option.id}
                          color={option.id === 'delete' ? 'error' : 'info'}
                          onClick={() => option.onClick(row)}
                        >
                          {option.icon}
                        </IconButton>
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          dir="ltr"
          labelRowsPerPage=""
        />
      </TableContainer>
      <ConfirmDialog
        deletedLabel={deletedLabel}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        dispatchers={dispatchers}
      />
      <MyDialog
        title={dialogTitle}
        dialog={dialog}
        setDialog={setDialog}
        ROW_INTIAL_VALUE={rowInitialValue}
        FIELDS={columns.filter((e) => e.isField)}
        rows={rows}
        validationSchema={validationSchema}
        dispatchers={dispatchers}
      />
    </>
  );
};

export default LogsTable;
