import React from "react";
//views
import { Login } from "../views/Login";
// interfaces
import { intercafes } from "./interfaces";
//validator
import { loginValidator } from "./validators";

export class LoginWrapper extends React.Component<
  {},
  intercafes.LoginStateType
> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: "",
      },
      rules: {
        username: {
          required: true,
          minLen: 3,
        },
        password: {
          required: true,
          minLen: 3,
        },
      },
      errors: {} as intercafes.IErrors,
    };
  }

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.persist();
    this.setState((state) => {
      state.data[event.target.name] = event.target.value;
      return {
        ...state,
      };
    });
  };

  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => Promise<void> = async (
    ev: React.FormEvent<HTMLFormElement>
  ) => {
    ev.preventDefault();
    if (this.validate()) {
      console.log("submited");
    }
  };

  private validate = (): boolean => {
    let valid = true;
    try {
      const errors = loginValidator(this.state);
      this.setState({ errors });
      Object.keys(errors).forEach((key: string) => {
        if (errors[key].length > 0) {
          valid = false;
        }
      });
    } catch (ex) {
      this.setState({
        errors: {
          ...this.state.errors,
          field_not_found: ["username and password field went wrong."],
        },
      });
      valid = false;
    } finally {
      return valid;
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        <Login
          onChange={this.onChange}
          values={this.state.data}
          onSubmit={this.onSubmit}
          errors={this.state.errors}
        />
      </>
    );
  }
}
