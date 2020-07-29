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
import { EditCreateCourse } from "../views/dashboard_and_panel/course/EditCreateCourse";

export class DashboardWrapper
  extends React.Component<
    RouteComponentProps<RoutePropsType> &
      interfaces.MainNavbarWrapperTypes & { isAdmin: boolean }
  >
  implements interfaces.RouteComponents<RoutePropsType> {
  private handelCourseComponents = (mode: "edit" | "create" | undefined) => {
    if (mode) {
      if (this.props.isAdmin) {
        if (mode === "edit") {
          return <EditCreateCourse />;
        } else if (mode === "create") {
          return <EditCreateCourse />;
        } else {
          return <div>course</div>;
        }
      }
      return <div>403 unthorized</div>;
    }
    return <div>course</div>;
  };

  private chooseComponentsUtil(
    RouteProps: RouteComponentProps<RoutePropsType>
  ) {
    const {
      match: {
        params: { section, mode },
      },
    } = RouteProps;

    if (section) {
      switch (section) {
        case "course":
          return this.handelCourseComponents(mode);
        case "profile":
          return <Profile />;
        case "admin":
          return <AdminPanel />;
        default:
          return <Redirect to="/dashboard" />;
      }
    }
    return <Redirect to="/dashboard" />;
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
