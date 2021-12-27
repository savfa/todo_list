import React from "react";
import { Route, Routes } from "react-router-dom";

import { AppRoute } from "./assets/services/consts/routes";

import Layout from "./modules/todo/_components/Layout/Layout";
import AuthPage from "./modules/todo/auth/pages/AuthPage/AuthPage";

const App = () => {
  // т.к. незарегистрированный пользователь должен видеть список моковых данных пускаем в приложение
  return (
    <Routes>
      <Route path={AppRoute.AUTH} element={<AuthPage />} exact />
      <Route path={AppRoute.ROOT} element={<Layout />} />
    </Routes>
  );
};

export default App;
