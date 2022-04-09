import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';

// SCSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/Style.scss";

// LAYOUT
import Layout from "./components/Layout";
import NotLayout from "./components/NotLayout";

// PAGES
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import CreateCase from "./pages/CreateCase";
import CasesId from "./pages/CasesId";
import Customers from "./pages/Customers";
import Employees from "./pages/Employees";

import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {

  const location = useLocation();

  const { id } = useParams();

  return (
    <>
      { ((location.pathname == '/dashboard') || (location.pathname == '/cases') || (location.pathname == '/cases/create') || (location.pathname == '/cases/') || (location.pathname == '/customers') || (location.pathname == '/employees')) &&
        <Layout>
          <Routes>
            <Route path="/dashboard" element={ <Dashboard /> } />
            <Route path="/cases" element={ <Cases /> } />
            <Route path="/cases/create" element={ <CreateCase /> } />
            <Route path="/cases/:id" element={ <CasesId /> } />
            <Route path="/customers" element={ <Customers /> } />
            <Route path="/employees" element={ <Employees /> } />
          </Routes>
        </Layout>
      }
      { ((location.pathname == '/') || (location.pathname == '/login')) &&
        <NotLayout>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={ <Login /> } />
          </Routes>
        </NotLayout>
      }
    </>
  );
}

export default App;