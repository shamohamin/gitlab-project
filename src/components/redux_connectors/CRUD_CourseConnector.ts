// redux
import { ThunkDispatch } from "redux-thunk";
import { fetchCourse, createCourse } from "../../lib/actions/courseAction";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
// interfaces
import { ICourse } from "../../lib/typesAndInterfaces/Course";
import { AppState } from "../../lib";
import { AppActions } from "../../lib/actions/ActionTypes";
import { RoutePropsType } from "../../routes";

export const CourseConnector = (PresentedComponent: any) => {
  const mapStateToProps = (
    state: AppState,
    ownProps: RouteComponentProps<RoutePropsType>
  ) => ({
    name: state.courseModel.name || "",
    mode: ownProps.match.params.mode || "read",
    courses: state.courseModel.courses || [],
    err: state.courseModel.err,
    id: state.courseModel.id || undefined,
  });

  const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>
  ) => ({
    fetchCourse: (data?: ICourse) => dispatch(fetchCourse(data)),
    createCourse: (data?: any) => dispatch(createCourse(data)),
  });

  return withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PresentedComponent)
  );
};
