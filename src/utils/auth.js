//const expressJwt = require('express-jwt');
const _ = require("lodash");
const crypto = require("crypto");
const secret = "cmssecret";
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

const dayInSeconds = 60 * 24 * 60;

function isPasswordAllowed(password) {
  return (
    //password length
    password.length > 6 &&
    //nonalphanumeric
    /\W/.test(password) &&
    //digit
    /\d/.test(password) &&
    //Capital letter
    /[A-Z]/.test(password) &&
    //lower letter
    /[a-z]/.test(password)
  );
}

//const authMiddleware = expressJwt({secret:'secret', algorithms: ['RS256']})

function getSaltAndHash(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, 512, "sha512")
    .toString("hex");
  return { salt, hash };
}

function hashPassword(password) {
  console.log("password here", password);
  return bycrypt.hashSync(password, 8);
}

async function verifyPassword(attemptPass, pass) {
  return await bycrypt.compare(attemptPass, pass);
}

function isPasswordValid(password, { salt, hash }) {
  return (
    hash ===
    crypto.pbkdf2Sync(password, salt, iterations, 512, "sha512").toString("hex")
  );
}

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function userToJSON(user) {
  //delete user.password;
  return _.omit(user, ["password"]);
}

function getUserToken({ id, username }) {
  const issuedAt = Math.floor(Date.now() / 1000);
  return jwt.sign(
    {
      id,
      username,
      iat: issuedAt,
      exp: issuedAt + dayInSeconds,
    },
    secret
  );
}

module.exports = {
  isPasswordAllowed,
  //    authMiddleware,
  userToJSON,
  getUserToken,
  isPasswordValid,
  getSaltAndHash,
  hashPassword,
  validateEmail,
  verifyPassword,
};
