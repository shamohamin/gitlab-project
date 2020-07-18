import {
  LogoutAction,
  LOGOUT,
  AppActions,
  LoginAction,
  LOGIN,
  FetchUserAction,
  FETCH_USER,
  AuthenticationSucceedAction,
  AUTHENTICATION_SUCCEED,
  AuthenticationFaildAction,
  AUTHENTICATION_FAILD,
} from "./ActionTypes";
import { Dispatch } from "redux";
import { Users } from "../typesAndInterfaces/Users";
import { RequestHandler } from "../RESTDATA/RequestHandlers";

export const logout: () => LogoutAction = () => ({
  type: LOGOUT,
});

export const login = (): LoginAction => ({
  type: LOGIN,
});

export const authenticateSuccess = (): AuthenticationSucceedAction => ({
  type: AUTHENTICATION_SUCCEED,
});

export const authenticateFailed = (
  error: string
): AuthenticationFaildAction => ({
  type: AUTHENTICATION_FAILD,
  payload: error,
});

export const userFetch = (user: Users): FetchUserAction => ({
  type: FETCH_USER,
  payload: user,
});

export const fetchUser = (psotdata: { [key: string]: string }, url: string) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      const data = await new RequestHandler(url).postRequest({}, psotdata);
      const user = data?.data as Users;
      dispatch(login());
      dispatch(userFetch(user));
      dispatch(authenticateSuccess());
    } catch (ex) {
      dispatch(authenticateFailed(ex.toString()));
    }
  };
};
