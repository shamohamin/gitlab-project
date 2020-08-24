import { FetchCourseData, FETCH_COURSE_DATA, AppActions } from "./ActionTypes";
import { ICourse } from "../typesAndInterfaces/Course";
import { Dispatch } from "redux";

const courseFetch = (payload: ICourse): FetchCourseData => ({
  type: FETCH_COURSE_DATA,
  payload: payload,
});

export const fetchCourse = (
  data: any,
  params?: { [key: string]: string }
) => async (dispatch: Dispatch<AppActions>) => {
  console.log(params);
  dispatch(courseFetch(data as ICourse));
};
