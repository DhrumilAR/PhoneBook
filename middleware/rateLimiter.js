const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // can't login for 15 minutes if pass wrong for 3 times
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many login attempts, please try again in an hour.",
});

module.exports = limiter;
