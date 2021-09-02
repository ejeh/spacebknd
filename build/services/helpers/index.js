"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = hashPassword;
exports.comparePasswords = comparePasswords;
exports.findEmail = findEmail;
exports.saltRounds = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

// import crypto from "crypto";
var saltRounds = 10;
exports.saltRounds = saltRounds;

function hashPassword(_x) {
  return _hashPassword.apply(this, arguments);
}

function _hashPassword() {
  _hashPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(plaintextPassword) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _bcryptjs["default"].hash(plaintextPassword, saltRounds));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _hashPassword.apply(this, arguments);
}

function comparePasswords(_x2, _x3) {
  return _comparePasswords.apply(this, arguments);
}

function _comparePasswords() {
  _comparePasswords = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password, hash) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _bcryptjs["default"].compare(password, hash));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _comparePasswords.apply(this, arguments);
}

function findEmail(User, email) {
  return new Promise(function (resolve, reject) {
    User.findOne({
      email: email
    }).select({
      password: true,
      email: true
    }) // .select("+password")
    .exec(function (err, result) {
      if (err) reject(err);
      return resolve(result);
    });
  });
}
//# sourceMappingURL=index.js.map