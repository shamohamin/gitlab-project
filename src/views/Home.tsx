import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../lib";
import "../style/home.css";

export const Home: React.FC<{}> = () => {
  const history = useHistory();
  const state = useSelector((state: AppState) => ({
    isAuth: state.userModel.isAuthenticated,
  }));

  return (
    <div className="contrainer">
      <div className="backimage"></div>
      <div className="home">
        <div>
          <h1>
            {" "}
            Managing Courses Using <div className="logo">Gitlab</div>{" "}
          </h1>
        </div>{" "}
        <div className="btn-wrapper">
          {state.isAuth ? (
            <div
              onClick={() => history.push("/dashboard")}
              className="redirect-btn"
            >
              dashboard
            </div>
          ) : (
            <>
              <div
                onClick={() => history.push("/login")}
                className="redirect-btn"
              >
                Login
              </div>{" "}
              or{" "}
              <div
                onClick={() => history.push("sign_up")}
                className="redirect-btn"
              >
                Sign up
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
