export declare namespace interfaces {
  export type LoginPropsType = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    values: {
      [key: string]: string;
    };
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    errors: IErrors;
  };

  export type MainNavbarTypes = {
    routes: string[];
  };

  export type IErrors = {
    [key: string]: string[];
  };
}
