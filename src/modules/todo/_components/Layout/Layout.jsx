import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useSelector } from "react-redux";
import MainHeader from "../MainHeader/MainHeader";
import { MainRoutes } from "../../../../Routes";
import { getUser } from "../../../../store/reducers/user/selectors";
import { useOnAuthorised } from "../../../../assets/services/hooks/hooks";

const Layout = (props) => {
  const { isAuth } = props;

  const user = useSelector(getUser);
  const handleLogout = useOnAuthorised();

  return (
    <Container className="layout">
      <Row className="layout__header-wrap">
        <Col>
          <header className="layout__header d-flex justify-content-end">
            <MainHeader user={user} isAuth={isAuth} logout={handleLogout} />
          </header>
        </Col>
      </Row>
      <Row className="layout__main-wrap">
        <Col>
          <main className="layout__main">
            <MainRoutes isAuth={isAuth} />
          </main>
        </Col>
      </Row>
      <Row className="layout__footer-wrap">
        <Col>
          <footer className="layout__footer">
            <p>
              <i>copyright&copy; savfa</i>
            </p>
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
