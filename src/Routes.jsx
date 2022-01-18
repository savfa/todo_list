import React, { useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import { AppRoute } from "./assets/services/consts/routes";
import TodoListPage from "./modules/todo/todo/pages/TodoListPage/TodoListPage";

const Redirect = (props) => {
  const { to } = props;

  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  return null;
};

const MainRoutes = (props) => {
  const { isAuth } = props;

  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<TodoListPage isAuth={isAuth} />} />
    </Routes>
  );
};

export { Redirect, MainRoutes };
