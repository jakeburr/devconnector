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
    errors.name = "A name is required to sign up";
  }
  if (Validator.isEmpty(data.email)) {
    // Can only take in a string.
    errors.email = "A email is required to sign up";
  }
  if (!Validator.isEmail(data.email)) {
    // Can only take in a string.
    errors.email = "You've entered an invalid email";
  }
  if (Validator.isEmpty(data.password)) {
    // Can only take in a string.
    errors.password = "A password is required to sign up";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "A password can be 6 to 30 characters long";
  }
  if (Validator.isEmpty(data.password2)) {
    // Can only take in a string.
    errors.password2 = "Please confirm your password";
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
