import validator from "validator";
import { interfaces } from "./interfaces";

export function loginValidator(
  dataValues: interfaces.LoginStateType
): interfaces.IErrors {
  const data = dataValues.data;
  const rules = dataValues.rules;
  let fieldError: interfaces.IErrors = {} as interfaces.IErrors;

  Object.keys(data).forEach((key: string) => {
    fieldError[key] = [];
    if (key in rules) {
      if (!validator.isEmpty(data[key])) {
        if (rules[key].required && validator.isEmpty(data[key])) {
          fieldError[key].push("value is required");
        }
        if (
          typeof rules[key].minLen === "number" &&
          data[key].length < (rules[key].minLen || 3)
        ) {
          fieldError[key].push(
            `${key} at least must have ${rules[key].minLen} length.`
          );
        }
        if (rules[key].isEmail && !validator.isEmail(data[key])) {
          fieldError[key].push("input valid email address");
        }
        if (rules[key].pattern && !rules[key].pattern?.test(data[key])) {
          fieldError[key].push("input valid studnet id");
        }
      } else {
        fieldError[key].push("value is required!");
      }
    } else {
      throw new Error("Key not Found");
    }
  });
  return fieldError;
}
