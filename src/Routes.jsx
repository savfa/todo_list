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
  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<TodoListPage />} />

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export { Redirect, MainRoutes };
