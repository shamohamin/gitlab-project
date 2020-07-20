import React from "react";
import "../style/login.css";
import GoogleLogin from "react-google-login";
//interfaces
import { interfaces } from "./interfaces";

const spanStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#ff0000",
  display: "inlineBlock",
  width: "80%",
  padding: "3px",
  paddingLeft: "10px",
};

const divStyle: React.CSSProperties = {
  width: "100%",
  display: "block",
  paddingBottom: "10px",
  marginBottom: "10px",
};

const errorSpanStyle: React.CSSProperties = {
  backgroundColor: "red",
  fontSize: "12px",
  fontWeight: "bold",
  borderRadius: "7px",
  color: "white",
  width: "20%",
  padding: "2px",
  textAlign: "center",
};

export const Login: React.FunctionComponent<interfaces.LoginPropsType> = ({
  onChange,
  values,
  onSubmit,
  errors,
}) => {
  const _errorsRender = (errs: interfaces.IErrors): boolean => {
    let valid: boolean = true;
    Object.keys(errs).forEach((key) => {
      if (errors[key].length > 0) {
        valid = false;
      }
    });
    return valid;
  };

  return (
    <div className="login-component">
      <div className="login-container p-r-50 p-l-50 p-t-77 p-b-30">
        <form className="login-form" method="post" onSubmit={onSubmit}>
          <h1>LOGIN</h1>
          {!_errorsRender(errors) ? (
            <div style={divStyle}>
              {Object.keys(errors).map((key: string) =>
                errors[key].map((item) => (
                  <div key={key} style={{ margin: "5px" }}>
                    <span style={errorSpanStyle}>Error</span>
                    <span style={spanStyle}>{item}</span>
                  </div>
                ))
              )}
            </div>
          ) : null}
          <div className="input-wrap">
            {" "}
            <input
              type="text"
              placeholder="username"
              name="username"
              value={values.username}
              onChange={onChange}
              autoComplete="off"
              autoFocus={true}
            />
            <span className="fa fa-envelope fa-lg"></span>
          </div>
          <div className="input-wrap">
            {" "}
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={onChange}
              value={values.password}
              autoComplete="on"
            />{" "}
            <span className="fa fa-key"></span>
          </div>
          <div className="form-btn">
            {" "}
            <button type="submit"> LOGIN </button>{" "}
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
