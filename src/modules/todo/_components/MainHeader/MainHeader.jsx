/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";

const MainHeader = (props) => {
  const { userName, isAuth, logout } = props;

  return (
    <div>
      {isAuth && (
        <>
          <p className="auth">
            Привет: <i>{userName}</i>
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
          <Link to="/login">вход</Link>
          <i> / </i>
          <Link to="/registration">регистрация</Link>
        </p>
      )}
    </div>
  );
};

export default MainHeader;
