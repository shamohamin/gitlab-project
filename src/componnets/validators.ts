import validator from "validator";
import { intercafes } from "./interfaces";

export function loginValidator(
  dataValues: intercafes.LoginStateType
): intercafes.IErrors {
  const data = dataValues.data;
  const rules = dataValues.rules;
  let fieldError: intercafes.IErrors = {} as intercafes.IErrors;
  Object.keys(data).forEach((key: string) => {
    fieldError[key] = [];
    if (key in rules) {
      console.log(fieldError[key]);
      if (rules[key].required && validator.isEmpty(data[key])) {
        fieldError[key].push(`${key} can't be empty.`);
      }
      if (rules[key].minLen && data[key].length < rules[key].minLen) {
        fieldError[key].push(
          `${key} at least must have ${rules[key].minLen} length.`
        );
      }
    } else {
      throw new Error("Key not Found");
    }
  });
  return fieldError;
}
