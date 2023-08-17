const { User } = require("../models");
const middleware = require("../middleware");

const Login = async (req, res) => {
  try {
    const users = await User.findOne({
      where: { email: req.body.email },
      raw: true
    });
    if (
      users &&
      (await middleware.comparePassword(
        users.passwordDigest,
        req.body.password
      ))
    ) {
      let payload = {
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName
      };
      let token = middleware.createToken(payload);
      return res.send({ user: payload, token });
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" });
  } catch (error) {
    throw error;
  }
};

const Register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;
    let passwordDigest = await middleware.hashPassword(password);
    const userFound = await User.findOne({ where: { email } });
    if (userFound) {
      return res.status(400).json({
        status: "error",
        message: "Email is already registered."
      });
    }
    const user = await User.create({
      email,
      passwordDigest,
      firstName,
      lastName,
      username
    });
    // added, copied from Login
    let userData = user.dataValues;
    let payload = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email
    };
    let token = middleware.createToken(payload);
    return res.send({ user: payload, token });

    // res.send(user)
  } catch (error) {
    throw error;
  }
};

const CheckSession = async (req, res) => {
  const { payload } = res.locals;
  res.send(payload);
};

module.exports = {
  Login,
  Register,
  CheckSession
};
