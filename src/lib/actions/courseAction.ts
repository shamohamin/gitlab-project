import {
  // FetchCourseData,
  // FETCH_COURSE_DATA,
  AppActions,
  CreateCourse,
  CreateFetchJoinFaild,
  CreateFetchJoinSucced,
  CREATE_COURSE,
  CREATE_FETCHES_JOIN_FAILD,
  CREATE_FETCHES_JOIN_SUCCEED,
  FetchCourses,
  FETCH_COURSES,
} from "./ActionTypes";
import { ICourse } from "../typesAndInterfaces/Course";
import { Dispatch } from "redux";
import { RequestHandler } from "../RESTDATA/RequestHandlers";
import { URLS } from "../RESTDATA/URLS";

// const courseFetch = (payload: ICourse): FetchCourseData => ({
//   type: FETCH_COURSE_DATA,
//   payload,
// });
const failedFetchJoinCreate = (payload: string): CreateFetchJoinFaild => ({
  type: CREATE_FETCHES_JOIN_FAILD,
  payload,
});

const succedFetchJoinCreate = (): CreateFetchJoinSucced => ({
  type: CREATE_FETCHES_JOIN_SUCCEED,
});

const createCourseAction = (payload: {
  name: string;
  id: number;
}): CreateCourse => ({
  type: CREATE_COURSE,
  payload,
});

const allCoursesFetch = (payload: ICourse[]): FetchCourses => ({
  type: FETCH_COURSES,
  payload,
});

export const fetchCourse = (
  data?: any,
  params?: { [key: string]: string }
) => async (dispatch: Dispatch<AppActions>) => {
  try {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const data = await new RequestHandler(URLS["GETCLASSROOMS"]).getRequest(
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );
      dispatch(allCoursesFetch(data.data as ICourse[]));
      dispatch(succedFetchJoinCreate());
    } else {
      throw new Error("doenst have token");
    }
  } catch (ex) {
    if (Object.keys(ex).indexOf("response")) {
      dispatch(failedFetchJoinCreate(ex.response.data));
    } else {
      dispatch(failedFetchJoinCreate(ex));
    }
    throw new Error(ex);
  }
};

export const createCourse = (
  data?: any,
  params?: { [key: string]: string }
) => async (dispatch: Dispatch<AppActions>) => {
  try {
    if (localStorage.getItem("token") && data) {
      const token = localStorage.getItem("token");
      const classInfo = await new RequestHandler(
        URLS["GETCLASSROOMS"]
      ).postRequest(
        {},
        { ...data },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      dispatch(
        createCourseAction(
          (classInfo.data as unknown) as { name: string; id: number }
        )
      );
      dispatch(succedFetchJoinCreate());
    } else {
      throw new Error("doenst have token");
    }
  } catch (ex) {
    if (Object.keys(ex).indexOf("response")) {
      dispatch(failedFetchJoinCreate(ex.response.data));
    } else {
      dispatch(failedFetchJoinCreate(ex));
    }
    throw new Error(ex);
  }
};
