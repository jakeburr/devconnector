// Validation for Registration.

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : ""; // Sets the data to a string if it is not already to avoid validator error, then will set to empty string to fire the same validator error.
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    // Can only take in a string.
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.email)) {
    // Can only take in a string.
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    // Can only take in a string.
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    // Can only take in a string.
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    // Can only take in a string.
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    // Compares both passwords to be sure they are the same.
    // Can only take in a string.
    errors.password2 = "Be sure both passwords match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
