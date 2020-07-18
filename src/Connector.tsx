import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import LoginWrapper from "./componnets/LoginWrapper";

type RouteSection = {
  section: string;
};

class Connector extends React.Component<{}, {}> {
  private chooseComponent(routeProps: RouteComponentProps<RouteSection>) {
    if (routeProps.match.params.section) {
      switch (routeProps.match.params.section) {
        case "login":
          return <LoginWrapper />;
        default:
          return <Redirect to="/login" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  }

  render() {
    return (
      <Router hashType="slash">
        <Switch>
          {}
          <Route
            path="/:section?"
            render={(routeProps) => this.chooseComponent(routeProps)}
          />
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default Connector;
