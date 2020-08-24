import React from "react";
//views
import { Login } from "../views/Login";
// interfaces
import { interfaces } from "./interfaces";
//validator
import { loginValidator } from "./validators";
// redux
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../lib/actions/ActionTypes";
import { signIn } from "../lib/actions/userAction";
import { URLS } from "../lib/RESTDATA/URLS";
import { AppState } from "../lib";
// router-dom
import { withRouter, RouteComponentProps } from "react-router-dom";
import { RoutePropsType } from "../routes";

class LoginWrapper
  extends React.Component<
    interfaces.linkDispatchPropsLogin & RouteComponentProps<RoutePropsType>,
    interfaces.LoginStateType
  >
  implements interfaces.LoginRegisterComponent {
  constructor(
    props: Readonly<interfaces.linkDispatchPropsLogin> &
      RouteComponentProps<RoutePropsType>
  ) {
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
          isDirty: false,
        },
        password: {
          required: true,
          minLen: 3,
          isDirty: false,
        },
      },
      errors: {} as interfaces.IErrors,
    };
  }

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.persist();
    this.setState((state) => {
      state.data[event.target.name && event.target.name] = event.target.value;
      state.rules[event.target.name && event.target.name].isDirty = true;
      return {
        ...state,
      };
    });
  };

  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => Promise<void> = async (
    ev: React.FormEvent<HTMLFormElement>
  ) => {
    ev.preventDefault();
    try {
      if (this.validate()) {
        await this.props.fetchUser({ ...this.state.data }, URLS.LOGINUSER);
        console.log("submited");
        this.setState((state: interfaces.LoginStateType) => {
          state.errors["login"] = ["evrything was ok!"];
          return {
            ...state,
          };
        });
        this.props.history.push("/dashboard");
      }
    } catch (ex) {
      console.log(ex);
      this.setState((state: interfaces.LoginStateType) => {
        console.log(this.props.error);
        state.errors["login"] = [this.props.error!];
        console.log(state);
        return {
          ...state,
          errors: state.errors,
        };
      });
    }
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
    const dirty = {} as { [key: string]: boolean | undefined };

    Object.keys(this.state.rules).forEach((key: string) => {
      dirty[key] = this.state.rules[key].isDirty;
    });
    console.log(this.state.errors);
    return (
      <Login
        onChange={this.onChange}
        values={this.state.data}
        onSubmit={this.onSubmit}
        errors={this.state.errors}
        isDirty={dirty}
        name={"Login"}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  fetchUser: (data: { [key: string]: string }, url: string) =>
    dispatch(signIn(data, url)),
});

export default withRouter(
  connect(
    (state: AppState) => ({
      error: state.userModel.authenticationErr,
    }),
    mapDispatchToProps
  )(LoginWrapper)
);
