import React from "react";
//views
import { Login } from "../views/Login";
// interfaces
import { intercafes } from "./interfaces";
//validator
import { loginValidator } from "./validators";
// redux
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../lib/actions/ActionTypes";
import { fetchUser } from "../lib/actions/userAction";

class LoginWrapper extends React.Component<
  intercafes.linkDispatchPropsLogin,
  intercafes.LoginStateType
> {
  constructor(props: Readonly<intercafes.linkDispatchPropsLogin>) {
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
      await this.props.fetchUser({ ...this.state.data }, "ss");
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

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  fetchUser: (data: { [key: string]: string }, url: string) =>
    dispatch(fetchUser(data, url)),
});

export default connect(() => ({}), mapDispatchToProps)(LoginWrapper);
