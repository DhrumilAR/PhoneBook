const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const AppError = require("./appError");

const auth = asyncHandler(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;
  const missingValue = [];
  if (!username) missingValue.push(" Username");
  if (!email) missingValue.push(" Email");
  if (!password) missingValue.push(" Password");
  if (!passwordConfirm) missingValue.push(" Password Confirm");

  if (missingValue.length !== 0)
    return next(
      new AppError(
        `required missing values :${missingValue} is neccessary to be filled`,
        400
      )
    );

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    return next(new AppError("User Already registered", 400));
  }

  if (
    password.match(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  ) {
    if (password !== passwordConfirm) {
      return next(
        new AppError("Password and Password Confirm does not match", 400)
      );
    }
  } else {
    return next(new AppError("Password is too weak", 400));
  }

  const emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError("Enter valid Email Address", 400));
  }

  next();
});

module.exports = auth;
