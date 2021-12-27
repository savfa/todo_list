export const ROUTE_ID = `:id`;
export const AUTH_NAME = `:authName`;

export const AppRoute = {
  ROOT: `/`,
  AUTH: `/auth/${AUTH_NAME}`,
  LOGIN: `/auth/login`, // вход
  REGISTER: `/auth/register`, // регистрация
};

export const ServerURL = {
  // user
  USER: `/api/user/`,
  USERS: `/api/users/${ROUTE_ID}/`,
  // auth
  LOGIN: `/api/login/`,
  REGISTER: `/api/register/`,
};
