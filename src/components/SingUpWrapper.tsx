import React from "react";
//views
import { Login } from "../views/Login";
// interfaces
import { interfaces } from "./interfaces";
//validator
import { loginValidator } from "./validators";

const defaultState: interfaces.LoginStateType = {
  data: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
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
  },
  errors: {} as interfaces.IErrors,
};

export class SignUpWrapper
  extends React.Component<{}, interfaces.LoginStateType>
  implements interfaces.LoginRegisterComponent {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = defaultState as interfaces.LoginStateType;
  }

  onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    ev.persist();
    this.setState((state: interfaces.LoginStateType) => {
      state.data[ev.target.name && ev.target.name] = ev.target.value;
      state.rules[ev.target.name && ev.target.name].isDirty = true;
      return {
        ...state,
      };
    });
  };

  onSubmit = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
    ev.preventDefault();
  };

  static getDerivedStateFromProps(
    _: any,
    state: interfaces.LoginStateType
  ): interfaces.LoginStateType {
    const errors: interfaces.IErrors = loginValidator(state);
    return {
      ...state,
      errors,
    };
  }

  render() {
    const dirty = {} as { [key: string]: boolean | undefined };

    Object.keys(this.state.rules).forEach((key: string) => {
      dirty[key] = this.state.rules[key].isDirty;
    });

    return (
      <Login
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
