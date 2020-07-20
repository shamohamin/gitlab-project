import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Template } from "./componnets/Template";
import LoginWrapper from "./componnets/LoginWrapper";
// routes array
export const routes = ["Home", "Login", "Register", "Dashboard"];

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
        <Route
          path="/register"
          component={() => (
            <Template>
              {" "}
              <div>register</div>{" "}
            </Template>
          )}
        />
        <Route
          path="/dashboard"
          component={() => (
            <Template>
              {" "}
              <div>dashboard</div>{" "}
            </Template>
          )}
        />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};
