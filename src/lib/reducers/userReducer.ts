import { Users } from "../typesAndInterfaces/Users";
import {
  UserActionTypes,
  LOGOUT,
  FETCH_USER,
  AUTHENTICATION_SUCCEED,
  AUTHENTICATION_FAILD,
  LOGIN,
} from "../actions/ActionTypes";

const defaultUserState: Users = {
  isAuthenticated: false,
  email: "",
  id: "",
  first_name: "",
  last_name: "",
  role: "",
} as Users;

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
        authenticationErr: "",
      };
    case AUTHENTICATION_FAILD:
      return {
        ...state,
        isAuthenticated: false,
        authenticationErr: action.payload,
      };
    case LOGOUT:
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      return defaultUserState as Users;
    default:
      return state || ({} as Users);
  }
};
