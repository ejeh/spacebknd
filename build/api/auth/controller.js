"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidAdmin = isValidAdmin;
exports.isValidUser = isValidUser;
exports.emailLogin = emailLogin;
exports.emailSignup = exports.getUserModel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("../admin/model"));

var _model2 = _interopRequireDefault(require("../../api/user/model"));

var _responses = require("../../services/helpers/responses");

var _helpers = require("../../services/helpers");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _jwt = require("../../services/helpers/jwt");

var getUserModel = function getUserModel(userType) {
  var user = null;

  switch (userType) {
    case "admin":
      user = _model["default"];
      break;

    case "user":
      user = _model2["default"];
      break;

    default:
      user = null;
  }

  return user;
}; // Authorize to access admin protected route


exports.getUserModel = getUserModel;

function isValidAdmin(req, res, next) {
  var accessToken = (0, _jwt.getToken)(req);
  var filter;

  if (!req.params) {
    return (0, _responses.fail)(res, 403, "Authentication failed: Invalid request parameters.");
  }

  if (!accessToken) {
    return (0, _responses.fail)(res, 403, "Authencation faied: Undefined token.");
  }

  try {
    var _jwt$verify = _jsonwebtoken["default"].verify(accessToken, _jwt.jwtSecret),
        _jwt$verify$payload = _jwt$verify.payload,
        id = _jwt$verify$payload.id,
        email = _jwt$verify$payload.email;

    if (email) {
      filter = {
        email: email
      };
    }

    return _model["default"].findOne(filter).select({
      email: true
    }).exec().then(function (admin) {
      if (!admin) {
        return (0, _responses.notFound)(res, "Admin with email ".concat(email, " not found in database"));
      }

      res.locals.userId = id;
      res.locals.userType = "admin";
      res.locals.userEmail = email;
      res.locals.userRole = admin.role;
      return next();
    });
  } catch (error) {
    return (0, _responses.fail)(res, 401, "User verification failed");
  }
} // / Authorize to access user protected route


function isValidUser(req, res, next) {
  var accessToken = (0, _jwt.getToken)(req);
  var filter;

  if (!req.params) {
    return (0, _responses.fail)(res, 403, "Authentication failed: Invalid request parameters.");
  }

  if (!accessToken) {
    return (0, _responses.fail)(res, 403, "Authencation faied: Undefined token.");
  }

  try {
    var _jwt$verify2 = _jsonwebtoken["default"].verify(accessToken, _jwt.jwtSecret),
        _jwt$verify2$payload = _jwt$verify2.payload,
        id = _jwt$verify2$payload.id,
        email = _jwt$verify2$payload.email,
        device = _jwt$verify2$payload.device;

    if (email) {
      filter = {
        email: email
      };
    }

    return _model2["default"].findOne(filter).select({
      email: true,
      fullname: true
    }).exec().then(function (user) {
      if (!user) {
        return (0, _responses.notFound)(res, "User with email ".concat(email, " not found in database"));
      }

      res.locals.userId = id;
      res.locals.userType = "user";
      res.locals.userEmail = email;
      res.locals.userRole = "user";
      return next();
    });
  } catch (error) {
    return (0, _responses.fail)(res, 401, "User verification failed");
  }
} // Sigup route


var emailSignup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, email, password, fullname, phone, address, userType, User, user, completeProfile;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password, fullname = _req$body.fullname, phone = _req$body.phone, address = _req$body.address;
            userType = req.params.userType;

            if (!(!email || !password)) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", (0, _responses.fail)(res, 401, "Request should have an Email and Password"));

          case 4:
            if (fullname) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", (0, _responses.fail)(res, 422, "fullname cannot be empty and must be alphanumeric"));

          case 6:
            if (phone) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", (0, _responses.fail)(res, 422, "Phone number cannot be empty and must be alphanumeric"));

          case 8:
            if (address) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", (0, _responses.fail)(res, 422, "Address cannot be empty and must be alphanumeric"));

          case 10:
            if (req.params) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", (0, _responses.fail)(res, 403, "Authentication Failed: invalid request parameters."));

          case 12:
            User = getUserModel(userType);

            if (User) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return", (0, _responses.fail)(res, 401, "Unknown user type!"));

          case 15:
            _context2.prev = 15;
            _context2.next = 18;
            return (0, _helpers.findEmail)(User, email);

          case 18:
            _context2.t0 = _context2.sent;

            if (_context2.t0) {
              _context2.next = 21;
              break;
            }

            _context2.t0 = {};

          case 21:
            user = _context2.t0;
            _context2.next = 27;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t1 = _context2["catch"](15);
            return _context2.abrupt("return", (0, _responses.fail)(res, 500, "Error finding user with email ".concat(email, ". ").concat(_context2.t1.message)));

          case 27:
            if (!(user && email === user.email)) {
              _context2.next = 29;
              break;
            }

            return _context2.abrupt("return", (0, _responses.fail)(res, 500, "User with email already exist. ".concat(email)));

          case 29:
            return _context2.abrupt("return", (0, _helpers.hashPassword)(password).then( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(hash) {
                var newUser;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        newUser = new User({
                          email: email,
                          password: hash,
                          completeProfile: completeProfile,
                          phone: phone,
                          fullname: fullname,
                          address: address
                        });
                        _context.next = 3;
                        return User.create(newUser).then(function (result) {
                          if (!result) {
                            return (0, _responses.fail)(res, 404, "Error not found newly added user");
                          }

                          return (0, _responses.success)(res, 200, result, "New user record has been created successfully");
                        });

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"](function (err) {
              return (0, _responses.fail)(res, 500, "Error encrypting user password. ".concat(err.message));
            }));

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[15, 24]]);
  }));

  return function emailSignup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Login route


exports.emailSignup = emailSignup;

function emailLogin(_x4, _x5) {
  return _emailLogin.apply(this, arguments);
}

function _emailLogin() {
  _emailLogin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body2, email, password, userType, User, currentUser, user, match;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            userType = req.params.userType;

            if (userType) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", (0, _responses.fail)(res, 403, "Authentication Failed: invalid request parameters."));

          case 4:
            if (!(!email || !password)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", (0, _responses.fail)(res, 401, "Request should have an Email and Password"));

          case 6:
            User = getUserModel(userType);

            if (User) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", (0, _responses.fail)(res, 401, "Unknown user type!"));

          case 9:
            _context3.prev = 9;
            _context3.next = 12;
            return (0, _helpers.findEmail)(User, email);

          case 12:
            _context3.t0 = _context3.sent;

            if (_context3.t0) {
              _context3.next = 15;
              break;
            }

            _context3.t0 = {};

          case 15:
            user = _context3.t0;
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t1 = _context3["catch"](9);
            return _context3.abrupt("return", (0, _responses.fail)(res, 500, "Error finding user with email ".concat(email, ". ").concat(_context3.t1.message)));

          case 21:
            if (user.email) {
              _context3.next = 23;
              break;
            }

            return _context3.abrupt("return", (0, _responses.fail)(res, 500, "Could not find user with email ".concat(email)));

          case 23:
            _context3.next = 25;
            return (0, _helpers.comparePasswords)(password, user.password);

          case 25:
            match = _context3.sent;

            if (!match) {
              _context3.next = 28;
              break;
            }

            return _context3.abrupt("return", user.save().then(function (result) {
              currentUser = result;
              return new Promise(function (resolve, reject) {
                _jsonwebtoken["default"].sign({
                  payload: {
                    id: result.id,
                    email: email
                  }
                }, _jwt.jwtSecret, function (err, token) {
                  if (err) reject(err);
                  resolve(token);
                });
              });
            }).then(function (accessToken) {
              try {
                var encrypted = (0, _jwt.encrypt)(accessToken);
                return (0, _responses.success)(res, 200, {
                  accessToken: encrypted,
                  id: currentUser.id
                }, "Authentication successful!");
              } catch (err) {
                console.log(err);
                return (0, _responses.fail)(res, 401, "Unable to generate an access token");
              }
            })["catch"](function (err) {
              return (0, _responses.fail)(res, 500, "Unable to authenticate user", err);
            }));

          case 28:
            return _context3.abrupt("return", (0, _responses.fail)(res, 403, "Authentication Failed: invalid credentials. Email or password is not correct"));

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[9, 18]]);
  }));
  return _emailLogin.apply(this, arguments);
}
//# sourceMappingURL=controller.js.map