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
import { Link, useParams } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
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
    backgroundColor: '#c7e0ff !important',
  },
}));

const MyTable = ({ COLUMNS, setDialog, deletedLabel, rows, dispatchers }) => {
  const params = useParams();
  // console.log(params); //TODO make sure to get the invoice from backend because the cud based on it
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
  let slicedRows = [];
  if (rows?.length > 0) slicedRows = rows.slice(startIndex, endIndex);

  const columnsWithOptions = [
    ...COLUMNS,
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
    },
    {
      label: 'حذف',
      id: 'delete',
      icon: <AiFillDelete />,
      onClick: (row) => {
        setOpenConfirm({ status: true, id: row.invoice ?? row.id });
      },
    },
  ];

  const stylingFunction = (column, value, row) => {
    const { accountId, accountType, billType, id, userId } = row;

    const linkStyle = {
      fontWeight: 'bold',
      color: 'black',
    };
    const moneyStyles = {
      color: value >= 0 ? 'green' : 'tomato',
      fontWeight: 'bold',
    };
    switch (true) {
      case column.isBill:
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
      case column.isMoney:
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
      case row.accountType === 'زبون' && column.isLink:
      case row.accountType === 'شريك' && column.isLink:
        return (
          <Link
            to={`${userId}`}
            style={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {value}
          </Link>
        );
      case column.isInvoice && accountType === 'تاجر سوق':
        return (
          <Link
            to={`/shops/${row.accountId}/invoices/${id}`}
            style={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {value}
          </Link>
        );
      case column.isInvoice && accountType === 'زبون':
        return (
          <Link
            to={`/customers/${row.accountId}/invoices/${id}`}
            style={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {value}
          </Link>
        );
      case accountType === 'تاجر سوق' && column.isLink:
        return (
          <Link
            to={`/shops/${accountId ?? id}`}
            style={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {value}
          </Link>
        );
      case accountType === 'شريك' && column.isLink:
        return (
          <Link
            to={`/withdrawals/${row.userId}`}
            style={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {value}
          </Link>
        );
      case billType === 'سحوبات' && column.isLink:
        return (
          <Link
            to={`/withdrawals/${row.userId}`}
            style={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {value}
          </Link>
        );
      case billType === 'مصروف' && column.isLink:
        return (
          <Link
            to={`${row.userId}`}
            style={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {value}
          </Link>
        );
      case column.isLink:
        return (
          <Link
            to={`${accountId ?? id}`}
            style={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {value}
          </Link>
        );
      case column.isInvoice:
        return (
          <Link
            to={`invoices/${id}`}
            style={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {value}
          </Link>
        );
      default:
        return value;
    }
  };

  // const stylingFunction = (column, value, row) => {
  //   const accountId = column.id === 'accountName' ? row.accountId : row.id;
  //   switch (true) {
  //     case column.isBill:
  //       return (
  //         <Typography
  //           sx={{
  //             color: row.billType === 'ادخال' ? 'green' : 'tomato',
  //             fontWeight: 'bold',
  //           }}
  //         >
  //           {value}
  //         </Typography>
  //       );
  //     case column.isMoney:
  //       return (
  //         <Typography
  //           sx={{
  //             color: value >= 0 ? 'green' : 'tomato',
  //             fontWeight: 'bold',
  //             direction: 'rtl',
  //           }}
  //         >
  //           {value}
  //         </Typography>
  //       );
  //     case row.accountType === 'customer' && column.isLink:
  //       return (
  //         <Link
  //           to={`/shops/${accountId ?? row.id}`}
  //           style={{
  //             fontWeight: 'bold',
  //             color: 'black',
  //           }}
  //         >
  //           {value}
  //         </Link>
  //       );
  //     case row.accountType === 'shop' && column.isLink:
  //       return (
  //         <Link
  //           to={`/customers/${accountId ?? row.id}`}
  //           style={{
  //             fontWeight: 'bold',
  //             color: 'black',
  //           }}
  //         >
  //           {value}
  //         </Link>
  //       );
  //     case column.isLink:
  //       return (
  //         <Link
  //           to={`${accountId ?? row.id}`}
  //           style={{
  //             fontWeight: 'bold',
  //             color: 'black',
  //           }}
  //         >
  //           {value}
  //         </Link>
  //       );

  //     case column.isInvoice:
  //       return (
  //         <Link
  //           to={`invoices/${row.id}`}
  //           style={{
  //             fontWeight: 'bold',
  //             color: 'black',
  //           }}
  //         >
  //           {value}
  //         </Link>
  //       );
  //     default:
  //       return value;
  //   }
  // };

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
            {slicedRows?.map((row, index) => {
              return (
                <StyledTableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  // return the invoice if it exists
                  key={row.id ?? row.UserId}
                >
                  {COLUMNS.map((column) => {
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
          count={rows?.length || 0}
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
    </>
  );
};

export default MyTable;
