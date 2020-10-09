import { ICourse } from "../typesAndInterfaces/Course";
import {
  CourseActionTypes,
  FETCH_COURSE_DATA,
  EDIT_COURSE_DATA,
  FETCH_COURSES,
  CREATE_FETCHES_JOIN_FAILD,
  CREATE_FETCHES_JOIN_SUCCEED,
  CREATE_COURSE,
} from "../actions/ActionTypes";

const defaultState = {
  name: "",
  id: undefined,
  mode: undefined,
} as ICourse;

export const courseReducer = (
  state = defaultState,
  action: CourseActionTypes
): ICourse & { courses?: ICourse[] } => {
  switch (action.type) {
    case CREATE_COURSE:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_FETCHES_JOIN_SUCCEED:
      return {
        ...state,
        err: "",
      };
    case CREATE_FETCHES_JOIN_FAILD:
      return {
        ...state,
        err: action.payload,
      };
    case FETCH_COURSES:
      return {
        ...state,
        courses: [...action.payload],
      };
    case FETCH_COURSE_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case EDIT_COURSE_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state || ({} as ICourse);
  }
};
