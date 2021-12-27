import React, { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useSelector } from "react-redux";
import MainHeader from "../MainHeader/MainHeader";
import { MainRoutes } from "../../../../Routes";
import {
  getAuthStatus,
  getUser,
} from "../../../../store/reducers/user/selectors";
import { AuthorizationStatus } from "../../../../store/reducers/user/user";
import { useOnAuthorised } from "../../../../assets/services/hooks/hooks";

const Layout = () => {
  const user = useSelector(getUser);
  const authorizationStatus = useSelector(getAuthStatus);
  const handleLogout = useOnAuthorised();

  const isAuth = useMemo(() => {
    return authorizationStatus === AuthorizationStatus.AUTH;
  }, [authorizationStatus]);

  return (
    <Container className="layout">
      <Row>
        <Col>
          <header className="layout__header d-flex justify-content-end">
            <MainHeader user={user} isAuth={isAuth} logout={handleLogout} />
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
      <Row>
        <Col xs={{ span: 1, offset: 11 }}>
          <footer className="layout__footer">&copy; savfa</footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
