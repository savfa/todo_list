import { setAPIAuthHeaders } from "../../../assets/services/api";
import {
  deleteUserAuthToken,
  getUserAuthToken,
  setUserAuthToken,
} from "../../../assets/services/utils/localStorage";
import { ServerURL } from "../../../assets/services/consts/routes";
import { extendObject } from "../../../assets/services/utils/common";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
  WAIT_SERVER_RESPONSE: `WAIT_SERVER_RESPONSE`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.WAIT_SERVER_RESPONSE,
  user: {},
};

const ActionType = {
  SET_AUTHORIZATION: `SET_AUTHORIZATION`,
  SET_USER: `SET_USER`,
};

const ActionCreator = {
  setAuthorization: (status) => ({
    type: ActionType.SET_AUTHORIZATION,
    payload: status,
  }),
  setUser: (user) => ({
    type: ActionType.SET_USER,
    payload: user,
  }),
};

const authorizeUser = (dispatch, api, response) => {
  const { user, token } = response.data;
  const accessToken = token.access;
  setUserAuthToken(accessToken);
  setAPIAuthHeaders(api, accessToken);
  dispatch(ActionCreator.setUser(user));
};

const Operation = {
  login: (authData) => (dispatch, getState, api) => {
    return api
      .post(ServerURL.LOGIN, authData)
      .then((response) => {
        authorizeUser(dispatch, api, response);
        dispatch(ActionCreator.setAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        dispatch(ActionCreator.setAuthorization(AuthorizationStatus.NO_AUTH));
      });
  },
  register: (data) => (dispatch, getState, api) => {
    return api.post(ServerURL.REGISTER, data).then((response) => {
      authorizeUser(dispatch, api, response);
      dispatch(ActionCreator.setAuthorization(AuthorizationStatus.AUTH));
    });
  },
  checkAuth: () => (dispatch, getState, api) => {
    const token = getUserAuthToken();
    if (!token) {
      dispatch(ActionCreator.setAuthorization(AuthorizationStatus.NO_AUTH));
      return Promise.resolve();
    }
    setAPIAuthHeaders(api, token);
    return api
      .get(ServerURL.USER)
      .then((response) => {
        const { data: user } = response.data;
        dispatch(ActionCreator.setUser(user));
        dispatch(ActionCreator.setAuthorization(AuthorizationStatus.AUTH));
      })
      .catch(() => {
        dispatch(ActionCreator.setAuthorization(AuthorizationStatus.NO_AUTH));
      });
  },
  logout: () => (dispatch, getState, api) => {
    setAPIAuthHeaders(api);
    deleteUserAuthToken();
    // deleteAdminAuthToken();
    dispatch(ActionCreator.setUser({}));
    dispatch(ActionCreator.setAuthorization(AuthorizationStatus.NO_AUTH));

    return Promise.resolve();
  },
  fetchUser: () => (dispatch, getState, api) => {
    return api.get(ServerURL.USER).then((response) => {
      const { data: user } = response.data;
      dispatch(ActionCreator.setUser(user));
    });
  },
  update: (data) => (dispatch, getState, api) => {
    /* return api.post(ServerURL.UPDATE_PROFILE, data).then((response) => {
      const { data: user } = response.data;
      dispatch(ActionCreator.setUser(user));
      return user;
    }); */
  },
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION:
      return extendObject(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SET_USER:
      return extendObject(state, {
        user: action.payload,
      });
    default:
      return state;
  }
};

export {
  reducer,
  ActionType,
  ActionCreator as UserActionCreator,
  AuthorizationStatus,
  Operation as UserOperation,
};
