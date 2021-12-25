import React, { useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import { AppRoute } from "./assets/services/consts/routes";
import TodoListPage from "./modules/todo/todo/pages/TodoListPage/TodoListPage";

const AuthRoutes = (props) => {
  return (
    <Routes>
      {/* <Redirect
        from={
          ![
            AppRoute.LOGIN,
            AppRoute.REGISTER,
            AppRoute.FORGOT_PASSWORD,
            AppRoute.UPDATE_PASSWORD,
            AppRoute.UPDATE_PHONE,
          ].includes(location.pathname) ||
          ([AppRoute.UPDATE_PASSWORD].includes(location.pathname) &&
            !tokenFromUrl)
            ? location.pathname
            : `no redirect`
        }
        to={AppRoute.LOGIN}
      />
      <Route path={[AppRoute.AUTH]} component={AuthPage} exact /> */}
    </Routes>
  );
};

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(AppRoute.TODO);
  }, [navigate]);

  return null;
};

const MainRoutes = (props) => {
  return (
    <Routes>
      <Route path={AppRoute.TODO} element={<TodoListPage />} />

      <Route path="*" element={<Redirect />} />
    </Routes>
  );
};

export { AuthRoutes, MainRoutes };
