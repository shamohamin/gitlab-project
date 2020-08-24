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
import SignUpWrapper from "./components/SingUpWrapper";
import { NotFound } from "./views/404";
import Authenticator from "./Authenticator";
import { Logout } from "./components/Logout";
// lazy components
const DashboardLazy = React.lazy(() =>
  import("./components/DashboardWrapper").then(({ DashboardWrapper }) => ({
    default: DashboardWrapper,
  }))
);
// routes array
export const routes = ["Home", "Login", "sign_up", "Dashboard", "logout"];
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

export const Routes: React.FC<{ isAuth: boolean; logout: () => void }> = ({
  isAuth,
  logout,
}) => {
  const Wrapper = (Content: any, props?: any) => (
    <Template>
      <Content {...props} />
    </Template>
  );
  console.log(isAuth);
  return (
    <Router>
      <Authenticator>
        <React.Suspense fallback={<div>.....</div>}>
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
            {
              <Route
                path="/dashboard/:section?/:courseId?/:mode?"
                render={(routeProps: RouteComponentProps<RoutePropsType>) =>
                  Wrapper(DashboardLazy, {
                    ...routeProps,
                    routes: dashboardroutes,
                    isAdmin: true,
                  })
                }
              />
            }
            <Route
              path="/logout"
              render={(_: RouteComponentProps) => {
                return <Logout logout={logout} />;
              }}
            />
            <Route
              render={(routeProps: RouteComponentProps) => {
                console.log(routeProps.location.pathname);
                if (routeProps.location.pathname === "/") {
                  return <Redirect from="/" to="/home" />;
                }
                return Wrapper(NotFound);
              }}
            />
          </Switch>
        </React.Suspense>
      </Authenticator>
    </Router>
  );
};
