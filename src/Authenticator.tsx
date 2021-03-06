import React from "react";
// redux
import { connect } from "react-redux";
import { AppState } from "./lib";
import { AppActions } from "./lib/actions/ActionTypes";
import { ThunkDispatch } from "redux-thunk";
import { retriveUser } from "./lib/actions/userAction";
// routes
import { RouteComponentProps, withRouter } from "react-router-dom";
import { URLS } from "./lib/RESTDATA/URLS";

class Authnticator extends React.Component<
  {
    isAuhtenticated: boolean;
    retriveUser: (token: string, url: string) => Promise<void>;
  } & RouteComponentProps,
  {}
> {
  async componentDidMount() {
    if (localStorage.getItem("token")) {
      try {
        await this.props.retriveUser(
          localStorage.getItem("token")! as string,
          URLS.RETRIVEUSER
        );
      } catch (ex) {}
    }
    this.routeChecker();
  }

  componentDidUpdate() {
    this.routeChecker();
  }

  private routeChecker() {
    let isProtectedRoute = this.props.location.pathname.split("/")[1];
    isProtectedRoute = isProtectedRoute.toLowerCase();
    if (isProtectedRoute === "dashboard" || isProtectedRoute === "course") {
      if (!this.props.isAuhtenticated) {
        this.props.history.push({
          pathname: "/login",
          state: {
            from: this.props.location.pathname,
          },
        });
      }
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(
  connect(
    (state: AppState) => ({
      isAuhtenticated: state.userModel.isAuthenticated,
    }),
    (dispatch: ThunkDispatch<any, any, AppActions>) => ({
      retriveUser: (token: string, url: string): Promise<void> =>
        dispatch(retriveUser(token, url)),
    })
  )(Authnticator)
);
