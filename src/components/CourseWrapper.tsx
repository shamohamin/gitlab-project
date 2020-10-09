import React from "react";
import { interfaces } from "./interfaces";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { RoutePropsType } from "../routes";
import { DashboardTemplate } from "../views/dashboard_and_panel/DashboardTemplate";
import { CourseView } from "../views/dashboard_and_panel/course/Course";
import { DefineCourseWrapper } from "./dashbaordToolWrappers/DefineCourseWrapper";
import { AdddingToCourse } from "../views/dashboard_and_panel/course/AddingToCourse";
import { CourseConnector } from "./redux_connectors/CRUD_CourseConnector";

const ConnectedAddCourseComponent = CourseConnector(AdddingToCourse);
const ConnectedCreatedCourse = CourseConnector(DefineCourseWrapper)

type CourseWrapperTypes = interfaces.MainNavbarWrapperTypes &
  RouteComponentProps<RoutePropsType> & { isAdmin: boolean };

export class CourseWrapper
  extends React.Component<CourseWrapperTypes, {}>
  implements interfaces.RouteComponents<RoutePropsType> {
  chooseComponentsUtil(
    RouteProps: RouteComponentProps<
      RoutePropsType,
      import("react-router").StaticContext,
      import("history").History.PoorMansUnknown
    >
  ) {
    const {
      match: {
        params: { courseIdOrMode },
      },
    } = RouteProps;

    if (courseIdOrMode) {
      switch (courseIdOrMode) {
        case "create":
          return <ConnectedCreatedCourse />;
        case "add":
          return <ConnectedAddCourseComponent />;
        default:
          break;
      }
      if (Number.isInteger(parseInt(courseIdOrMode) as number)) {
        return <CourseView homeworks={["hello"]} />;
      }
    }

    return <Redirect to="/dashboard" />;
  }
  chooseComponents = (RouteProps: RouteComponentProps<RoutePropsType>) => {
    return this.chooseComponentsUtil(RouteProps);
  };

  render() {
    return (
      <>
        <DashboardTemplate section={"course"} routes={this.props.routes}>
          {this.chooseComponents({ ...this.props })}
        </DashboardTemplate>
      </>
    );
  }
}
