import React from "react";
import "../style/login.css";
import GoogleLogin from "react-google-login";

export const Login: React.FunctionComponent = () => {
  return (
    <div className="login-component">
      <div className="login-container p-r-50 p-l-50 p-t-77 p-b-30">
        <form className="login-form">
          <h1>LOGIN</h1>
          <div className="input-wrap">
            {" "}
            <input type="text" placeholder="username" />
            <span className="fa fa-envelope fa-lg"></span>
          </div>
          <div className="input-wrap">
            {" "}
            <input type="password" placeholder="password" />{" "}
            <span  className="fa fa-key"></span>
          </div>
          <div className="form-btn">
            {" "}
            <button> LOGIN </button>{" "}
          </div>

          <div className="text-center">
            <span> Or login with </span>
          </div>
          <div className="google">
            <GoogleLogin clientId="" buttonText="Google" />
          </div>
          <div className="text-center">
            <span>Not a member?</span>
            <span
              id="link"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                fontSize: "18px",
                lineHeight: "1.4",
                color: "#999999",
              }}
            >
              {" "}
              sign up now
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
