export const ROUTE_ID = `:id`;
export const AUTH_NAME = `:authName`;

export const AppRoute = {
  ROOT: `/`,
  AUTH: `/auth/${AUTH_NAME}`,
  LOGIN: `/auth/login`, // вход
  REGISTER: `/auth/register`, // регистрация
};

export const ServerURL = {
  // auth
  LOGIN: `/api/login/`,
  REGISTER: `/api/register/`,
  // user
  USER: `/api/user/`,
  // todos
  TODOS: `/api/todos/`,
  TODO: `/api/todos/${ROUTE_ID}`,
  FILTER_TODOS: `/api/filter/todos/`,
};
