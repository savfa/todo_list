import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import MainHeader from "../MainHeader/MainHeader";
import { MainRoutes } from "../../../../Routes";

const Layout = () => {
  return (
    <Container className="layout">
      <Row>
        <Col>
          <header className="layout__header d-flex justify-content-end">
            <MainHeader />
          </header>
        </Col>
      </Row>
      <Row>
        <Col>
          <main className="layout__main">
            <MainRoutes />
          </main>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <footer className="layout__footer">футер</footer>
        </Col>
      </Row> */}
    </Container>
  );
};

export default Layout;
