export namespace intercafes {
  export type LoginStateType = {
    data: {
      [key: string]: string;
    };
    rules: {
      [key: string]: {
        required: boolean;
        minLen: number;
      };
    };
    errors: IErrors;
  };

  export type IErrors = {
    [key: string]: string[];
  };
}
