import React from 'react';
import { Routes, Route } from 'react-router-dom';

// SCSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/Style.scss";

// LAYOUT
import Layout from "./components/Layout";

// PAGES
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </Layout>
  );
}

export default App;