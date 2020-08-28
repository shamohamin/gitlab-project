import React from "react";
import { interfaces } from "../../interfaces";
// styles
import { spanStyle, divStyle } from "../../Login";
import "../../../style/dashboard-forms.css";

export const DashbaordForms: React.FC<interfaces.LoginPropsType> = ({
  values,
  onChange,
  onSubmit,
  errors,
  isDirty,
}) => {
  const inputs: interfaces.InputProps[] = Object.keys(values).map(
    (key: string) => ({
      name: key,
      value: values[key],
      onChange: onChange,
      type: key === "password" ? "password" : "text",
      autoFocus: values[key] === "name" ? true : false,
    })
  );

  const inputGenerator = (inputs: interfaces.InputProps[]): JSX.Element[] =>
    inputs.map(({ name, value, onChange, type, autoFocus }) => {
      return (
        <div key={name}>
          <div>
            <label>{name}</label>
          </div>
          <input
            autoFocus={autoFocus}
            value={value as string}
            type={type}
            name={name}
            onChange={onChange}
            placeholder={name}
            autoComplete="off"
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
        </div>
      );
    });
  return (
    <div className="dashboard-forms">
      <div className="title">
        <h2>
          Create Class(Course) <span className="fa fa-plus"></span>{" "}
        </h2>
        <hr />
      </div>
      <div className="content">
        <div>
          <form className="form" method="POST" onSubmit={onSubmit}>
            <div>
              {" "}
              <h3 className="form-title"> Class Information </h3>
            </div>
            {inputGenerator(inputs)}
            <div className="btn-submit-group">
              <button className="submit-btn" type="submit">
                Create class
              </button>
            </div>
          </form>
        </div>
        <div className="help">
          <h2>Rules</h2>
          <ul>
            <li>
              <h4>Name</h4>
              <div>
                <p>Every class must have name for class.</p>
              </div>
            </li>
            <li>
              <h4>Password</h4>
              <div>
                <p>Every class must have password for student to attend to.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
