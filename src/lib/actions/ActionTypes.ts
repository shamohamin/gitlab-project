import { Users } from "../typesAndInterfaces/Users";
import { ICourse } from "../typesAndInterfaces/Course";

export const LOGIN = "LOGIN";
export const AUTHENTICATION_SUCCEED = "AUTHENTICATION_SUCCEED";
export const AUTHENTICATION_FAILD = "AUTHENTICATION_FAILD";
export const LOGOUT = "LOGOUT";
export const FETCH_USER = "FETCH_USER";
export const SIGN_UP = "SIGN_UP";

export interface SignUp {
  type: typeof SIGN_UP;
}

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
  | AuthenticationFaildAction
  | SignUp;

export const FETCH_COURSE_DATA = "FETCH_COURSE_DATA";
export const EDIT_COURSE_DATA = "EDIT_COURSE_DATA";
export const CREATE_COURSE_DATA = "CREATE_COURSE_DATA";

export interface FetchCourseData {
  type: typeof FETCH_COURSE_DATA;
  payload: ICourse;
}

export interface EditCourseData {
  type: typeof EDIT_COURSE_DATA;
  payload: ICourse;
}

export type CourseActionTypes = EditCourseData | FetchCourseData;

export type AppActions = UserActionTypes | CourseActionTypes;
