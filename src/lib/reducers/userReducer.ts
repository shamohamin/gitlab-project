import { Users } from "../typesAndInterfaces/Users";
import {
  UserActionTypes,
  LOGOUT,
  FETCH_USER,
  AUTHENTICATION_SUCCEED,
  AUTHENTICATION_FAILD,
  LOGIN,
} from "../actions/ActionTypes";

const defaultUserState: Users = {} as Users;

export const userReducer = (
  state = defaultUserState,
  action: UserActionTypes
): Users => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
      };
    case FETCH_USER:
      return {
        ...state,
        ...action.payload,
      };
    case AUTHENTICATION_SUCCEED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTHENTICATION_FAILD:
      return {
        ...state,
        isAuthenticated: false,
        authenticationErr: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {} as Users;
    default:
      return state || ({} as Users);
  }
};
