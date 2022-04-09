import React from 'react';

// COMPONENTS
import Header from "./Header";
import Footer from "./Footer";

// BOOTSTRAP
import { Container, Row } from "react-bootstrap";

const NotLayout = ({children}) => {
  return (
    <>
        <Header />
        {children}
        <Footer />
    </>
  );
}

export default NotLayout;