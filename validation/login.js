// Validation for Login.

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Sets the data to a string if it is not already to avoid validator error, then will set to empty string to fire the same validator error.
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    // Can only take in a string.
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    // Can only take in a string.
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(data.password)) {
    // Can only take in a string.
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
