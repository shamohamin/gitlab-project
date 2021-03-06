import React from "react";
import "../style/login.css";
// import GoogleLogin from "react-google-login";
//interfaces
import { interfaces } from "./interfaces";
import { useHistory } from "react-router-dom";
import { ROLES } from "../components/SingUpWrapper";

export const spanStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#ff0000",
  display: "inlineBlock",
  width: "100%",
  paddingBottom: "8wpx",
  marginBottom: "3px",
  textAlign: "center",
};

export const divStyle: React.CSSProperties = {
  width: "100%",
  display: "block",
  marginTop: "2px",
  paddingBottom: "3px",
  marginBottom: "4px",
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
  remeberMe,
}) => {
  const history = useHistory();
  // const [remeber, setRemeber] = useState<boolean>(false);
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
        value,
        name,
        onChange,
        type,
        autoFocus,
        shapeClassname,
      }: interfaces.InputProps) => (
        <div key={name + type} className="input-wrap">
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
      )
    );

  return (
    <div className="login-component">
      <div className="login-container p-r-50 p-l-50 p-t-77 p-b-30">
        <form className="login-form" method="post" onSubmit={onSubmit}>
          <h1>{name}</h1>
          {name
            ? errors[name!.toLowerCase()]
              ? errors[name!.toLowerCase()].map((item) => (
                  <span key={item} style={spanStyle}>
                    {item}
                  </span>
                ))
              : null
            : null}
          {inputGenerator(inputs)}
          {name!.toLowerCase() === "login" ? (
            <div className="remember-me">
              <input
                className="rem-input"
                type="checkbox"
                name="remeber-me"
                value={"remeber"}
                checked={remeberMe}
                onChange={onChangeSelect}
              />
              <label>Remeber Me</label>
            </div>
          ) : null}
          <div className="form-btn">
            {" "}
            <button type="submit"> {name!.toUpperCase()} </button>{" "}
          </div>
          <div className="text-center">
            {/* <span> Or login with </span> */}
          </div>
          {/* <div className="google">
            <GoogleLogin clientId="" buttonText="Google" />
          </div> */}
          <div className="text-center">
            {name!.toLowerCase() === "login" ? (
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
                  name!.toLowerCase() === "login" ? "/sign_up" : "/login"
                )
              }
            >
              {" "}
              {name!.toLowerCase() === "login" ? "sign up now" : "sign in now"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
