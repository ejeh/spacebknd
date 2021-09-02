"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.getToken = exports.jwtSecret = void 0;

var _simpleEncryptor = _interopRequireDefault(require("simple-encryptor"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var encryptor = (0, _simpleEncryptor["default"])(process.env.JWT_ENCRYPTION_KEY);
var jwtSecret = process.env.JWT_SECRET || "SOME hidden key";
/**
 * @param {String} key the encryption key
 * @param {Object} obj the object or string to encrypt
 */

exports.jwtSecret = jwtSecret;

function encrypt(obj) {
  return encryptor.encrypt(obj);
}
/**
 * @param {String} key the encryption key
 * @param {String} encrypted the encrypted to be decrypted
 */


function decrypt(encrypted) {
  return encryptor.decrypt(encrypted);
} // Retrieve token from request header


var getToken = function getToken(req) {
  var token;

  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    // eslint-disable-next-line prefer-destructuring
    token = req.query.token;
  }

  if (!token) return null;

  try {
    var decrypted = decrypt(token);
    return decrypted;
  } catch (err) {
    return null;
  }
};

exports.getToken = getToken;
//# sourceMappingURL=index.js.map