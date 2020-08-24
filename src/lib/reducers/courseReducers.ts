import { ICourse } from "../typesAndInterfaces/Course";
import {
  CourseActionTypes,
  FETCH_COURSE_DATA,
  EDIT_COURSE_DATA,
} from "../actions/ActionTypes";

const defaultState = {
  data: "",
  mode: undefined,
} as ICourse;

export const courseReducer = (
  state = defaultState,
  action: CourseActionTypes
): ICourse => {
  switch (action.type) {
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
