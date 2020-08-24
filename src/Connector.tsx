import React from "react";
import { Routes } from "./routes";
// redux
import { connect } from "react-redux";
import { AppState } from "./lib";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "./lib/actions/ActionTypes";
import { logout } from "./lib/actions/userAction";

class Connector extends React.Component<
  {
    isAuthenticated: boolean;
    logout: () => void;
  },
  {}
> {
  render() {
    return (
      <Routes logout={this.props.logout} isAuth={this.props.isAuthenticated} />
    );
  }
}

export default connect(
  (state: AppState) => ({
    isAuthenticated: state.userModel.isAuthenticated,
  }),
  (dispatch: ThunkDispatch<any, any, AppActions>) => ({
    logout: () => dispatch(logout()),
  })
)(Connector);
