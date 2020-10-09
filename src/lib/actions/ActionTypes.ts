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
export const FETCH_COURSES = "FETCH_COURSES";
export const CREATE_COURSE = "CREATE_COURSE";
export const CREATE_FETCHES_JOIN_SUCCEED = "CREATE_FETCHES_JOIN_SUCCEED";
export const CREATE_FETCHES_JOIN_FAILD = "CREATE_FETCHES_JOIN_FAILD";

export interface CreateFetchJoinFaild {
  type: typeof CREATE_FETCHES_JOIN_FAILD;
  payload: string;
}

export interface CreateFetchJoinSucced {
  type: typeof CREATE_FETCHES_JOIN_SUCCEED;
}

export interface FetchCourses {
  type: typeof FETCH_COURSES;
  payload: ICourse[];
}

export interface CreateCourse {
  type: typeof CREATE_COURSE;
  payload: { name: string; id: number };
}

export interface FetchCourseData {
  type: typeof FETCH_COURSE_DATA;
  payload: ICourse;
}

export interface EditCourseData {
  type: typeof EDIT_COURSE_DATA;
  payload: ICourse;
}

export type CourseActionTypes =
  | EditCourseData
  | FetchCourseData
  | FetchCourses
  | CreateCourse
  | CreateFetchJoinFaild
  | CreateFetchJoinSucced;

export type AppActions = UserActionTypes | CourseActionTypes;
