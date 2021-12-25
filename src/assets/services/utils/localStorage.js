const Key = {
  TOKEN: `token`,
  ADMIN_TOKEN: `token_admin`,
  URL_ADDRESS: `url_address`,
};

export const getUserAuthToken = () => {
  return JSON.parse(localStorage.getItem(Key.TOKEN));
};

export const setUserAuthToken = (token) => {
  localStorage.setItem(Key.TOKEN, JSON.stringify(token));
};

export const deleteUserAuthToken = () => {
  return localStorage.removeItem(Key.TOKEN);
};

export const getAdminAuthToken = () => {
  return JSON.parse(localStorage.getItem(Key.ADMIN_TOKEN));
};

export const setAdminAuthToken = (token) => {
  return localStorage.setItem(Key.ADMIN_TOKEN, JSON.stringify(token));
};

export const deleteAdminAuthToken = () => {
  return localStorage.removeItem(Key.ADMIN_TOKEN);
};

export const getUrlAddress = () => {
  return JSON.parse(localStorage.getItem(Key.URL_ADDRESS));
};

export const setUrlAddress = (address) => {
  localStorage.setItem(Key.URL_ADDRESS, JSON.stringify(address));
};

export const deleteUrlAddress = () => {
  return localStorage.removeItem(Key.URL_ADDRESS);
};
