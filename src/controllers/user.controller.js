const User = require("../../models/User");
const logger = require("../utils/logger");
const { hashPassword } = require("../utils/auth");

const responseApi = (res, status, data, message) => {
  return res.status(status).send({ data, message });
};

async function createUser(req, res) {
  try {
    let userFound = await getUser({ username: req.body.username });
    if (userFound) {
      return responseApi(res, 400, null, "username already exist");
    }
    let password = hashPassword(req.body.password);
    let user = await User.create({ ...req.body, password });
    logger.info(`user created: ${user.username}`);
    return responseApi(res, 200, user, "user created successfully");
  } catch (error) {
    console.log(error);
    logger.error(error.message);
    return responseApi(res, 500, null, error.message);
  }
}

async function updateUser(req, res) {
  try {
    let params = req.body;
    let userFound = await getUser({ id: params.id });
    if (!userFound) {
      return responseApi(res, 400, null, "user doesnt exist");
    }
    await User.update({ ...params }, { plain: true, where: { id: params.id } });
    let updatedUser = await User.findOne({ where: { id: params.id } });
    return responseApi(res, 200, updatedUser, "user updated successfully");
  } catch (error) {
    return responseApi(res, 500, null, error.message);
  }
}

async function findUser(req, res) {
  try {
    let id = req.params.id;
    let userFound = await getUser({ id });
    if (!userFound) {
      return responseApi(res, 400, null, "user doesnt exist");
    } else {
      return responseApi(res, 200, userFound, "user found");
    }
  } catch (error) {
    console.log(error.message);
    return responseApi(res, 500, null, error.message);
  }
}

async function findAllUsers(req, res) {
  try {
    let users = await User.findAll();
    if (users.length < 1) {
      return responseApi(res, 204, null, "no users available");
    } else {
      return responseApi(res, 200, users, "users found");
    }
  } catch (error) {
    console.error(error.message);
    return responseApi(res, 500, null, error.message);
  }
}

async function getUser(query) {
  let userFound = await User.findOne({ where: { ...query } });
  return userFound;
}

module.exports = {
  createUser,
  updateUser,
  findUser,
  findAllUsers,
};
