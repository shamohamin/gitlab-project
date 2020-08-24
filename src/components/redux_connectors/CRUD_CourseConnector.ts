// redux
import { ThunkDispatch } from "redux-thunk";
import { fetchCourse } from "../../lib/actions/courseAction";
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
    data: state.courseModel.data,
    mode: ownProps.match.params.mode || "read",
  });

  const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>
  ) => ({
    submitCourse: (data: ICourse) => dispatch(fetchCourse(data)),
  });

  return withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PresentedComponent)
  );
};
