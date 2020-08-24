import React from "react";
//views
import { Login } from "../views/Login";
// interfaces
import { interfaces } from "./interfaces";
//validator
import { loginValidator } from "./validators";
// redux
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../lib/actions/ActionTypes";
import { singUser } from "../lib/actions/userAction";
import { connect } from "react-redux";
import { URLS } from "../lib/RESTDATA/URLS";
import { AppState } from "../lib";
// router
import { withRouter, RouteComponentProps } from "react-router-dom";
import { RoutePropsType } from "../routes";

export const ROLES: {
  [key: string]: string;
} = {
  role: "choose role: ",
  ta: "Teacher Assistant",
  student: "student",
  admin: "Admin",
};

const defaultState: interfaces.LoginStateType = {
  data: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    student_id: "",
    role: ROLES["role"],
  },
  rules: {
    first_name: {
      minLen: 3,
      required: true,
      isDirty: false,
    },
    last_name: {
      minLen: 3,
      required: true,
      isDirty: false,
    },
    password: {
      minLen: 5,
      required: true,
      isDirty: false,
    },
    email: {
      required: true,
      isEmail: true,
      isDirty: false,
    },
    role: {
      required: true,
      isDirty: false,
    },
    student_id: {
      required: true,
      pattern: /^9\d{6}/,
    },
  },
  errors: {} as interfaces.IErrors,
};

class SignUpWrapper
  extends React.Component<
    interfaces.linkDispatchPropsLogin & RouteComponentProps<RoutePropsType>,
    interfaces.LoginStateType
  >
  implements interfaces.LoginRegisterComponent {
  constructor(
    props: interfaces.linkDispatchPropsLogin &
      RouteComponentProps<RoutePropsType>
  ) {
    super(props);
    this.state = defaultState as interfaces.LoginStateType;
  }

  changeUtil = (name: string, value: string) => {
    this.setState((state: interfaces.LoginStateType) => {
      state.data[name && name] = value;
      state.rules[name && name].isDirty = true;
      return {
        ...state,
      };
    });
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    ev.persist();
    this.changeUtil(ev.target.name, ev.target.value as string);
  };

  onChangeSelect = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.persist();
    console.log(ev.target.value);
    this.changeUtil("role", ev.target.value);
  };

  onSubmit = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
    ev.preventDefault();
    const postData = {
      ...this.state.data,
      role: {
        id: 0,
        name: this.state.data["role"],
      },
    };
    console.log(postData);
    try {
      await this.props.fetchUser(postData, URLS.POSTUSER);
      this.props.history.push("/login");
    } catch (ex) {
      this.setState((state: interfaces.LoginStateType) => {
        state.errors["signup"] = [this.props.error!, ex];
        return {
          ...state,
        };
      });
    }
  };

  static getDerivedStateFromProps(
    _: any,
    state: interfaces.LoginStateType
  ): interfaces.LoginStateType {
    if (state.data["role"] === ROLES["admin"]) {
      state.data["student_id"] = "0";
    }
    const errors: interfaces.IErrors = loginValidator(state);
    return {
      ...state,
      errors,
    };
  }

  render() {
    console.log(this.props);
    const dirty = {} as { [key: string]: boolean | undefined };

    Object.keys(this.state.rules).forEach((key: string) => {
      dirty[key] = this.state.rules[key].isDirty;
    });

    return (
      <Login
        onChangeSelect={this.onChangeSelect}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        values={this.state.data}
        errors={this.state.errors}
        isDirty={dirty}
        name={"SingUp"}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  fetchUser: (data: { [key: string]: any }, url: string) =>
    dispatch(singUser(data, url)),
});

export default withRouter(
  connect(
    (state: AppState) => ({
      error: state.userModel.authenticationErr,
    }),
    mapDispatchToProps
  )(SignUpWrapper)
);
