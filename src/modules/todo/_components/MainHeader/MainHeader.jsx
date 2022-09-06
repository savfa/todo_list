import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./styles.scss";

import { AppRoute } from "../../../../assets/services/consts/routes";

const MainHeader = (props) => {
  const { user, isAuth, logout } = props;

  const navigate = useNavigate();

  return (
    <div className="auth d-flex">
      {isAuth && (
        <>
          <p className="auth__name">
            Привет: <i>{user?.login || user?.email}</i>
          </p>
          <p className="auth__logout">
            <Link to="/" className="auth" onClick={logout}>
              выйти
            </Link>
          </p>
        </>
      )}
      {!isAuth && (
        <Button variant="primary" onClick={() => navigate(AppRoute.LOGIN)}>
          Войти
        </Button>
      )}
    </div>
  );
};

export default MainHeader;
