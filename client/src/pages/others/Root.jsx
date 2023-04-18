import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
