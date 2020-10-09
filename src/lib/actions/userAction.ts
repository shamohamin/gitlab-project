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
  SIGN_UP,
  SignUp,
} from "./ActionTypes";
import { Dispatch } from "redux";
import { Users } from "../typesAndInterfaces/Users";
import { RequestHandler } from "../RESTDATA/RequestHandlers";
import { URLS } from "../RESTDATA/URLS";

export const signUp: () => SignUp = () => ({
  type: SIGN_UP,
});

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

// sign up
export const singUser = (postData: { [key: string]: any }, url: string) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      await new RequestHandler(url).postRequest({}, postData);
      dispatch(signUp());
    } catch (ex) {
      if (Object.keys(ex).indexOf("response")) {
        dispatch(authenticateFailed(ex.response.data));
      } else {
        dispatch(
          authenticateFailed(
            "something went wrong refresh the page and try again !"
          )
        );
      }
      throw new Error(ex.response.data);
    }
  };
};

// sing in
export const signIn = (postData: { [key: string]: any }, url: string) => {
  return async (dispath: Dispatch<AppActions>) => {
    try {
      const token = await new RequestHandler(url).postRequest({}, postData);
      dispath(login());
      await retriveUser(token.data, URLS.RETRIVEUSER)(dispath);
      dispath(authenticateSuccess());
    } catch (ex) {
      dispath(authenticateFailed(ex.response.data));
      throw new Error(ex.response.data);
    }
  };
};

// retrive user from token
export const retriveUser = (token: string, url: string) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      const user = await new RequestHandler(url).getRequest(
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(user);
      dispatch(userFetch({ ...user.data, token: token } as Users));
      dispatch(authenticateSuccess());
      localStorage.setItem("token", token);
    } catch (ex) {
      throw new Error(ex);
    }
  };
};
