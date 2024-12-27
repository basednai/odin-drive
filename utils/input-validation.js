const { body } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emptyErr = "cannot be empty.";

exports.validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}`),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
];
