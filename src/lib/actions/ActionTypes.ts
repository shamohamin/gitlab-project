import { Users } from "../typesAndInterfaces/Users";

export const LOGIN = "LOGIN";
export const AUTHENTICATION_SUCCEED = "AUTHENTICATION_SUCCEED";
export const AUTHENTICATION_FAILD = "AUTHENTICATION_FAILD";
export const LOGOUT = "LOGOUT";
export const FETCH_USER = "FETCH_USER";

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface AuthenticationSucceedAction {
  type: typeof AUTHENTICATION_SUCCEED;
}

export interface FetchUserAction {
  type: typeof FETCH_USER;
  payload: Users | undefined;
}

export interface LoginAction {
  type: typeof LOGIN;
}

export interface AuthenticationFaildAction {
  type: typeof AUTHENTICATION_FAILD;
  payload: string;
}

export type UserActionTypes =
  | LoginAction
  | AuthenticationSucceedAction
  | FetchUserAction
  | LogoutAction
  | AuthenticationFaildAction;

export type AppActions = UserActionTypes;
