const express = require("express");
require("dotenv").config();
// required files import
const connectDb = require("./config/dbConnection");
const AppError = require("./middleware/appError");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const routerContact = require("./routes/contactRoutes");
const routerUsers = require("./routes/userRoutes");
const PORT = process.env.PORT;

const app = express();

// all global middlewares used here
app.use(express.json());
connectDb();

app.use("/api/users", routerUsers);
app.use("/api/contacts", routerContact);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`We are live on port: ${PORT}`);
});
