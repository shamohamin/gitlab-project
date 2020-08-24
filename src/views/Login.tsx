import React from "react";
import "../style/login.css";
import GoogleLogin from "react-google-login";
//interfaces
import { interfaces } from "./interfaces";
import { useHistory } from "react-router-dom";
import { ROLES } from "../components/SingUpWrapper";

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

export enum Shapes {
  email = "fa fa-envelope fa-lg",
  first_name = "fa fa-user fa-lg",
  last_name = "fa fa-file-alt fa-lg",
  password = "fa fa-key fa-lg",
  student_id = "fa fa-id-card fa-lg",
  role = "fas fa-user-tag",
}

export const Login: React.FunctionComponent<interfaces.LoginPropsType> = ({
  onChangeSelect,
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
      if (key !== "role") {
        return {
          name: key,
          value: values[key],
          onChange: onChange,
          autoFocus: key === "first_name" || key === "user_name" ? true : false,
          type: key === "password" ? "password" : "text",
          shapeClassname:
            Shapes[(key as unknown) as keyof typeof Shapes] || Shapes.email,
        };
      } else {
        return {
          type: "select",
          value: values[key],
          onChange: onChange,
        };
      }
    }
  );

  const inputGenerator = (inputs: interfaces.InputProps[]): JSX.Element[] =>
    inputs.map(
      ({
        value,
        name,
        onChange,
        type,
        shapeClassname,
        autoFocus,
      }: interfaces.InputProps) =>
        type !== "select" ? (
          <div key={shapeClassname} className="input-wrap">
            <input
              name={name}
              value={value as string}
              onChange={onChange}
              type={type}
              autoComplete="off"
              autoFocus={autoFocus}
              placeholder={name?.split("_").join(" ")}
              disabled={values["role"] === ROLES["admin"]}
            />
            {isDirty !== undefined
              ? isDirty[name || ""] === true
                ? errors[name || ""].map((err: string) => (
                    <div style={divStyle} key={err}>
                      <span style={spanStyle}>{err}</span>
                    </div>
                  ))
                : null
              : null}
            <span className={shapeClassname}></span>
          </div>
        ) : (
          <div className="role" key={"aa"}>
            <span className={Shapes["role"]}></span>
            <select
              value={value as string}
              onChange={onChangeSelect}
              name={name}
            >
              {Object.keys(ROLES).map((key: string) => (
                <option key={ROLES[key]} value={ROLES[key]}>
                  {ROLES[key]}
                </option>
              ))}
            </select>
          </div>
        )
    );
    console.log(errors)
  return (
    <div className="login-component">
      <div className="login-container p-r-50 p-l-50 p-t-77 p-b-30">
        <form className="login-form" method="post" onSubmit={onSubmit}>
          <h1>{name}</h1>
          {errors[name.toLowerCase()]
            ? errors[name.toLowerCase()].map((item) => (
                <span style={spanStyle}>{item}</span>
              ))
            : null}
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
