import React from "react";
// routes
import { RouteComponentProps, Redirect } from "react-router-dom";
// interfaces
import { RoutePropsType } from "../routes";
// views
import { Profile } from "../views/dashboard_and_panel/Profile";
import { DashboardTemplate } from "../views/dashboard_and_panel/DashboardTemplate";
import { interfaces } from "./interfaces";

export class DashboardWrapper extends React.Component<
  RouteComponentProps<RoutePropsType> & interfaces.MainNavbarWrapperTypes
> {
  private chooseComponets = () => {
    const {
      match: {
        params: { section },
      },
    } = this.props;

    if (section) {
      switch (section) {
        case "profile":
          return <Profile />;
        default:
          return <Redirect to="/dashboard" />;
      }
    }
  };

  render() {
    const { routes } = this.props;
    return (
      <DashboardTemplate routes={routes}>
        {this.chooseComponets()}
      </DashboardTemplate>
    );
  }
}
