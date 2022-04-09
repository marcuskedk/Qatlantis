import React from 'react';

// COMPONENTS
import Sidebar from "./Sidebar";
import Footer from "./Footer";

// BOOTSTRAP
import { Container, Row } from "react-bootstrap";

const Layout = ({children}) => {
  return (
    <>
        <main>
            <Sidebar />
            <div className="content">
              <Container fluid="xxxl">
                <Row className="justify-content-center g-3">
                  {children}
                  <Footer />
                </Row>
              </Container>
            </div>
        </main>
    </>
  );
}

export default Layout;