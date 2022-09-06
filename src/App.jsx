import React, { useMemo } from "react";
import { Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";
import { AppRoute } from "./assets/services/consts/routes";

import Layout from "./modules/todo/_components/Layout/Layout";
import AuthPage from "./modules/todo/auth/pages/AuthPage/AuthPage";
import { getAuthStatus } from "./store/reducers/user/selectors";
import { AuthorizationStatus } from "./store/reducers/user/user";
import { Redirect } from "./Routes";

const App = () => {
  const authorizationStatus = useSelector(getAuthStatus);

  const isAuth = useMemo(() => {
    return authorizationStatus === AuthorizationStatus.AUTH;
  }, [authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.WAIT_SERVER_RESPONSE) {
    return null;
  }

  // т.к. незарегистрированный пользователь должен видеть список моковых данных пускаем в приложение без регистрации
  return (
    <Routes>
      <Route
        path={AppRoute.AUTH}
        element={<AuthPage isAuth={isAuth} />}
        exact
      />
      <Route path={AppRoute.ROOT} element={<Layout isAuth={isAuth} />} />
      <Route path="*" element={<Redirect to={AppRoute.ROOT} />} />
    </Routes>
  );
};

export default App;
