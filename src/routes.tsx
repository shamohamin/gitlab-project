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
import { Spinner } from "./views/spinner";
// lazy components
const DashboardLazy = React.lazy(() =>
  import("./components/DashboardWrapper").then(({ DashboardWrapper }) => ({
    default: DashboardWrapper,
  }))
);

const CourseLazy = React.lazy(() =>
  import("./components/CourseWrapper").then(({ CourseWrapper }) => ({
    default: CourseWrapper,
  }))
);
// routes array
export const routes = [
  { name: "Home", to: "name" },
  { name: "Login", to: "login" },
  { name: "sign_up", to: "sign_up" },
  { name: "Dashboard", to: "dashboard" },
  { name: "logout", to: "logout" },
];
export const dashboardroutes = [
  {
    name: "profile",
    to: "dashboard/profile",
  },
  {
    name: "admin",
    to: "dashboard/admin",
  },
  { name: "joining course", to: "course/add" },
];
export const courseRoutes = [
  { name: "homeworks", to: "course/homeworks" },
  { name: "active homeworks", to: "course/active_homeworks" },
];

// route props routes
export interface DashboardRouteProps {
  mode: "create" | "edit" | undefined;
  section: string;
}

export interface CourseRouteStudentProps {
  courseIdOrMode: string | "create" | "add" | undefined;
  problemMode: "problem" | undefined;
  problemId: string | undefined;
}

export interface CourseRouteProps {
  mode: "edit" | "create" | undefined;
  courseId: string;
  courseMode: "edit" | "create" | "homework" | undefined;
}

export type RoutePropsType = CourseRouteProps &
  DashboardRouteProps &
  CourseRouteStudentProps;

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
    <React.Fragment>
      <Router>
        <Authenticator>
          <React.Suspense fallback={<Spinner />}>
            <Switch>
              <Route
                path="/login"
                component={() =>
                  !isAuth ? Wrapper(LoginWrapper) : <Redirect to="/" />
                }
              />
              <Route
                path="/home"
                component={() => (
                  <Template>
                    {" "}
                    <div>home</div>{" "}
                  </Template>
                )}
              />
              <Route
                path="/sign_up"
                component={() =>
                  !isAuth ? Wrapper(SignUpWrapper) : <Redirect to="/" />
                }
              />
              <Route
                path="/dashboard/:section?"
                render={(
                  routeProps: RouteComponentProps<DashboardRouteProps>
                ) =>
                  isAuth ? (
                    Wrapper(DashboardLazy, {
                      ...routeProps,
                      routes: dashboardroutes,
                      isAdmin: true,
                    })
                  ) : (
                    <Spinner />
                  )
                }
              />
              <Route
                path="/course/:courseIdOrMode?/:problemMode?/:problemId?"
                render={(
                  routeProps: RouteComponentProps<CourseRouteStudentProps>
                ) =>
                  isAuth ? (
                    Wrapper(CourseLazy, {
                      ...routeProps,
                      routes: courseRoutes,
                      isAdmin: true,
                    })
                  ) : (
                    <Spinner />
                  )
                }
              />
              <Route
                path="/logout"
                render={(_: RouteComponentProps) => {
                  return isAuth ? (
                    <Logout logout={logout} />
                  ) : (
                    <Redirect to="/" />
                  );
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
    </React.Fragment>
  );
};
