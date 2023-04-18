import React, { useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../store/users';
import { useDispatch, useSelector } from 'react-redux';
const PageLinks = ({ history }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  useEffect(() => {
    if (params?.id || params?.shopId || params?.customerId) {
      dispatch(getUser(params.id ?? params.customerId ?? params.shopId));
    }
  }, []);
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, padding: '.5rem 2rem' }}>
      {history.map((segment, index) => {
        const isInvoiceLink = /\/[A-Za-z0-9]+\/[0-9]+\/[A-Za-z0-9]+\/[0-9]+/i;
        if (segment.label === 'الفواتير') return;
        if (segment.link.match(isInvoiceLink))
          return (
            <Link
              key={segment.link}
              style={{
                color: index === history.length - 1 ? 'textPrimary' : 'inherit',
              }}
              to={segment.link}
            >
              {` فاتورة رقم ${segment.label}`}
            </Link>
          );
        const isAddInvoiceRelated = /\/[A-Za-z]+\/[0-9]+\/invoices\/add/i;
        if (segment.link.match(isAddInvoiceRelated)) {
          const userName = 'فاتورة جديدة';
          return (
            <Link
              key={segment.link}
              style={{
                color: index === history.length - 1 ? 'textPrimary' : 'inherit',
              }}
              to={segment.link}
            >
              {userName}
            </Link>
          );
        }
        const isCustomerOrShopsLink = /\/[A-Za-z0-9]+\/[0-9]+/i;
        if (segment.link.match(isCustomerOrShopsLink)) {
          const userName = user.name;
          return (
            <Link
              key={segment.link}
              style={{
                color: index === history.length - 1 ? 'textPrimary' : 'inherit',
              }}
              to={segment.link}
            >
              {userName}
            </Link>
          );
        }
        return (
          <Link
            key={segment.link}
            style={{
              color: index === history.length - 1 ? 'textPrimary' : 'inherit',
            }}
            to={segment.link}
          >
            {segment.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default PageLinks;
