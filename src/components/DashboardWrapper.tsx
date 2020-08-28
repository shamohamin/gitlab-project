import React from "react";
// routes
import { RouteComponentProps, Redirect } from "react-router-dom";
// interfaces
import { RoutePropsType } from "../routes";
import { interfaces } from "./interfaces";
// views
import { Profile } from "../views/dashboard_and_panel/Profile";
import { DashboardTemplate } from "../views/dashboard_and_panel/DashboardTemplate";
import { AdminPanel } from "../views/dashboard_and_panel/Admin.panel";
import { EditCreateCourse } from "../views/dashboard_and_panel/course/EditCreateHomeWorks";
import { Course } from "../views/dashboard_and_panel/course/Course";
import { Dashbaord } from "../views/dashboard_and_panel/dashboard";
// redux connectors
import { CourseConnector } from "./redux_connectors/CRUD_CourseConnector";
import { DefineCourseWrapper } from "./dashbaordToolWrappers/DefineCourseWrapper";

const ConnectedCourse = CourseConnector(Course);
const ConnectedCourseEditor = CourseConnector(EditCreateCourse);

export class DashboardWrapper
  extends React.Component<
    RouteComponentProps<RoutePropsType> &
      interfaces.MainNavbarWrapperTypes & { isAdmin: boolean }
  >
  implements interfaces.RouteComponents<RoutePropsType> {
  private handelCourseComponents = <
    T extends "edit" | "create" | "homework" | undefined
  >(
    courseMode: T,
    mode: T
  ) => {
    console.log(courseMode, mode);
    if (courseMode && courseMode === "homework") {
      if (mode) {
        if (this.props.isAdmin) {
          if (mode === "edit" || mode === "create") {
            return <ConnectedCourseEditor />;
          } else {
            return <ConnectedCourse />;
          }
        }
        return <div>403 unthorized</div>;
      }
    } else if (courseMode && courseMode === "create") {
      if (this.props.isAdmin) {
        return <DefineCourseWrapper />
      } else {
        return <Redirect to="/dashbaord" />;
      }
    }
    return <ConnectedCourse />;
  };

  private chooseComponentsUtil(
    RouteProps: RouteComponentProps<RoutePropsType>
  ) {
    const {
      match: {
        params: { section, mode, courseMode },
      },
    } = RouteProps;

    if (section) {
      switch (section) {
        case "course":
          return this.handelCourseComponents(courseMode, mode);
        case "profile":
          return <Profile />;
        case "admin":
          return <AdminPanel />;
        default:
          return <Redirect to="/dashboard" />;
      }
    }
    return <Dashbaord />;
  }

  chooseComponents = (RouteProps: RouteComponentProps<RoutePropsType>) => {
    return this.chooseComponentsUtil(RouteProps);
  };

  render() {
    const { routes } = this.props;
    return (
      <DashboardTemplate routes={routes}>
        {this.chooseComponents({ ...this.props })}
      </DashboardTemplate>
    );
  }
}
