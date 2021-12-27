/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import {AppRoute} from "../../../../assets/services/consts/routes";

const MainHeader = (props) => {
  const { user, isAuth, logout } = props;

  return (
    <div className="d-flex">
      {isAuth && (
        <>
          <p className="auth">
            Привет: <i>{user.userName}</i>
          </p>
          <p className="auth" onClick={logout}>
            <Link to="/" className="auth">
              выйти
            </Link>
          </p>
        </>
      )}
      {!isAuth && (
        <p className="auth">
          <Link to={AppRoute.LOGIN}>вход</Link>
          <i> / </i>
          <Link to={AppRoute.REGISTER}>регистрация</Link>
        </p>
      )}
    </div>
  );
};

export default MainHeader;
