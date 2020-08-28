import React from "react";
import { interfaces } from "../interfaces";
import { DashbaordForms } from "../../views/dashboard_and_panel/course/DashboardForms";
import { loginValidator } from "../validators";

export class DefineCourseWrapper
  extends React.Component<{}, interfaces.LoginStateType>
  implements interfaces.LoginRegisterComponent {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      data: {
        name: "",
        password: "",
      },
      rules: {
        name: {
          isDirty: false,
          required: true,
        },
        password: {
          isDirty: false,
          required: true,
        },
      },
      errors: {},
    };
  }

  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void = (ev) => {
    ev.persist();
    this.setState((state: interfaces.LoginStateType) => {
      state.data[ev.target.name && ev.target.name] = ev.target.value;
      state.rules[ev.target.name && ev.target.name].isDirty = true;
      return {
        ...state,
      };
    });
  };

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> = async (
    ev
  ) => {
    ev.preventDefault();
    console.log("submited!!!!!!!!");
  };

  static getDerivedStateFromProps(
    _: any,
    state: interfaces.LoginStateType
  ): interfaces.LoginStateType {
    const errors: interfaces.IErrors = loginValidator(state);
    return {
      ...state,
      errors: {
        ...state.errors,
        ...errors,
      },
    };
  }

  render() {
    let isDirty = {} as { [key: string]: boolean | undefined };
    Object.keys(this.state.rules).forEach((key) => {
      isDirty[key] = this.state.rules[key].isDirty;
    });
    return (
      <DashbaordForms
        values={this.state.data}
        errors={this.state.errors}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        isDirty={isDirty}
      />
    );
  }
}
