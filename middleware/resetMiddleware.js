const asyncHandler = require("express-async-handler");
const AppError = require("./appError");

const resetAuth = asyncHandler(async (req, res, next) => {
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  if (!password || !passwordConfirm) {
    return next(
      new AppError(
        "Password and Password Confirm, Both fields are neccessary",
        400
      )
    );
  }

  if (
    !password.match(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  ) {
    return next(new AppError("Password is too weak", 400));
  }

  if (password !== passwordConfirm) {
    return next(
      new AppError("Password and Password Confirm does not match", 400)
    );
  }
  next();
});

module.exports = resetAuth;
