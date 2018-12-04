// Validation for Post.

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // Sets the data to a string if it is not already to avoid validator error, then will set to empty string to fire the same validator error.
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }
  if (Validator.isEmpty(data.text)) {
    // Can only take in a string.
    errors.text = "Text field is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
