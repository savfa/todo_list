import NameSpace from "../NameSpace";

const NAME_SPACE = NameSpace.USER;

export const getIsRegistered = (state) => {
  return state[NAME_SPACE].isRegistered;
};

export const getUser = (state) => {
  return state[NAME_SPACE].user;
};

export const getAuthStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

export const getCourtSites = (state) => {
  return state[NAME_SPACE].courtSites;
};
