import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
// components
import { Template } from "./components/Template";
import LoginWrapper from "./components/LoginWrapper";
import { SignUpWrapper } from "./components/SingUpWrapper";
import { NotFound } from "./views/404";
import { DashboardWrapper } from "./components/DashboardWrapper";
// routes array
export const routes = ["Home", "Login", "sign_up", "Dashboard"];
export const dashboardroutes = [
  "profile",
  "homeworks",
  "active homeworks",
  "admin",
];

export interface RoutePropsType {
  section: string;
  mode: "edit" | "create" | undefined;
  courseId: string;
}

export const Routes: React.FC = () => {
  const Wrapper = (Content: any, props?: any) => (
    <Template>
      <Content {...props} />
    </Template>
  );
  return (
    <Router>
      <Switch>
        <Route path="/login" component={() => Wrapper(LoginWrapper)} />
        <Route
          path="/home"
          component={() => (
            <Template>
              {" "}
              <div>home</div>{" "}
            </Template>
          )}
        />
        <Route path="/sign_up" component={() => Wrapper(SignUpWrapper)} />
        <Route
          path="/dashboard/:section?/:courseId?/:mode?"
          render={(routeProps: RouteComponentProps<RoutePropsType>) =>
            Wrapper(DashboardWrapper, {
              ...routeProps,
              routes: dashboardroutes,
              isAdmin: true, 
            })
          }
        />
        <Route
          render={(routeProps: RouteComponentProps) => {
            if (routeProps.location.pathname === "/") {
              return <Redirect from="/" to="/home" />;
            }
            return Wrapper(NotFound);
          }}
        />
      </Switch>
    </Router>
  );
};
