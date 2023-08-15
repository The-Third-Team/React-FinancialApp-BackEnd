const Router = require("express").Router();
const AuthRouter = require("./AuthRouter");
Router.use("/", AuthRouter);
module.exports = Router;
