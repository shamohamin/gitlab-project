import React from "react";
import "../style/login.css";
import GoogleLogin from "react-google-login";
//interfaces
import { interfaces } from "./interfaces";
import { useHistory } from "react-router-dom";

export const spanStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#ff0000",
  display: "inlineBlock",
  width: "80%",
  paddingLeft: "10px",
};

const divStyle: React.CSSProperties = {
  width: "100%",
  display: "block",
  marginTop: "5px",
  paddingBottom: "0px",
  marginBottom: "0px",
};

export const errorSpanStyle: React.CSSProperties = {
  backgroundColor: "red",
  fontSize: "12px",
  fontWeight: "bold",
  borderRadius: "7px",
  color: "white",
  width: "20%",
  padding: "2px",
  textAlign: "center",
};

export enum Shapes {
  email = "fa fa-envelope fa-lg",
  first_name = "fa fa-user fa-lg",
  last_name = "fa fa-id-card fa-lg",
  password = "fa fa-key fa-lg",
}

export const Login: React.FunctionComponent<interfaces.LoginPropsType> = ({
  onChange,
  values,
  onSubmit,
  errors,
  isDirty,
  name,
}) => {
  const history = useHistory();

  const inputs: interfaces.InputProps[] = Object.keys(values).map(
    (key: string) => {
      return {
        name: key,
        value: values[key],
        onChange: onChange,
        autoFocus: key === "first_name" || key === "user_name" ? true : false,
        type: key === "password" ? "password" : "text",
        shapeClassname:
          Shapes[(key as unknown) as keyof typeof Shapes] || Shapes.email,
      };
    }
  );

  const inputGenerator = (inputs: interfaces.InputProps[]): JSX.Element[] =>
    inputs.map(
      ({
        value = "",
        name,
        onChange,
        type,
        shapeClassname,
        autoFocus,
      }: interfaces.InputProps) => (
        <div key={name} className="input-wrap">
          <input
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            autoComplete="off"
            autoFocus={autoFocus}
            placeholder={name?.split("_").join(" ")}
          />
          {isDirty !== undefined
            ? isDirty[name || ""] === true
              ? errors[name || ""].map((err: string) => (
                  <div style={divStyle} key={err}>
                    <span style={errorSpanStyle}>Error</span>
                    <span style={spanStyle}>{err}</span>
                  </div>
                ))
              : null
            : null}
          <span className={shapeClassname}></span>
        </div>
      )
    );
  return (
    <div className="login-component">
      <div className="login-container p-r-50 p-l-50 p-t-77 p-b-30">
        <form className="login-form" method="post" onSubmit={onSubmit}>
          <h1>{name}</h1>
          {inputGenerator(inputs)}
          <div className="form-btn">
            {" "}
            <button type="submit"> {name.toUpperCase()} </button>{" "}
          </div>

          <div className="text-center">
            <span> Or login with </span>
          </div>
          <div className="google">
            <GoogleLogin clientId="" buttonText="Google" />
          </div>
          <div className="text-center">
            {name.toLowerCase() === "login" ? (
              <span>Not a member?</span>
            ) : (
              <span> member? </span>
            )}
            <span
              id="link"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                fontSize: "18px",
                lineHeight: "1.4",
                color: "#999999",
              }}
              onClick={() =>
                history.push(
                  name.toLowerCase() === "login" ? "/sign_up" : "/login"
                )
              }
            >
              {" "}
              {name.toLowerCase() === "login" ? "sign up now" : "sign in now"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
