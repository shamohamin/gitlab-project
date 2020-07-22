import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// components
import { Template } from "./components/Template";
import LoginWrapper from "./components/LoginWrapper";
import { SignUpWrapper } from "./components/SingUpWrapper";
// routes array
export const routes = ["Home", "Login", "sign_up", "Dashboard"];

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
