import { useEffect, useState } from 'react';

const dictionary = {
  customers: 'الزبائن',
  invoices: 'الفواتير',
  storage: 'المستودع',
  'monthly-inventory': 'الجرد الشهري',
  withdrawals: 'السحوبات',
  expenses: 'المصروف',
  shops: 'السوق',
  daily: 'اليومية',
  transfer: 'التحويل',
  // add more translations here
};

export default () => {
  const [trail, setTrail] = useState([{ label: 'الرئيسية', link: '/' }]);

  useEffect(() => {
    const segments = window.location.pathname.split('/').filter(Boolean);
    const newTrail = segments.map((segment, index) => {
      const label = dictionary[segment] || segment;
      const link = `/${segments.slice(0, index + 1).join('/')}`;
      return { label, link };
    });
    setTrail([{ label: 'الرئيسية', link: '/' }, ...newTrail]);
  }, [window.location.pathname]);

  return trail;
};
