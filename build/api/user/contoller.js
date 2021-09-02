"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUserById = findUserById;
exports.findOne = findOne;
exports.findAll = findAll;
exports.update = update;
exports.destroy = destroy;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireWildcard(require("./model"));

var _responses = require("../../services/helpers/responses");

var helper = _interopRequireWildcard(require("../../services/helpers"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @description findUserById find a particular user by id
 * @param {String} userId user id
 * @returns {Promise} user object promise
 */
function findUserById(userId) {
  return _model["default"].findById(userId).select({
    fullname: true,
    phone: true,
    address: true
  }).then(function (user) {
    if (!user) return {};
    return user;
  })["catch"](function (err) {
    throw err;
  });
} // Retrieve a single record with a given userId


function findOne(req, res) {
  var recordId = req.params.userId || "";
  var _res$locals = res.locals,
      userId = _res$locals.userId,
      userType = _res$locals.userType;
  if (!userId || !userType) return (0, _responses.fail)(res, 400, "Invalid authentication credentials");
  if (userType !== "user") return (0, _responses.fail)(res, 422, "Only Users are allowed to view this record not ".concat(userType));
  if (!recordId) recordId = userId;
  if (!_model.ObjectId.isValid(recordId)) return (0, _responses.fail)(res, 422, "Invalid record Id as request parameter");
  return _model["default"].findById(recordId).then(function (result) {
    if (!result) return (0, _responses.notFound)(res, "Error record not found.");
    return (0, _responses.success)(res, 200, result, "retrieving record was successfully!");
  })["catch"](function (err) {
    if (err.kind === "ObjectId") {
      (0, _responses.notFound)(res, "Error retrieving record.\r\n".concat(err.message));
    }

    return (0, _responses.fail)(res, 500, "Error retrieving record.\r\n".concat(err.message));
  });
} // / Retrieve and return all records from the database.


function findAll(req, res) {
  return _model["default"].find().limit(500).sort({
    createdAt: -1
  }).select({
    // eslint-disable-next-line object-property-newline
    email: true,
    fullname: true,
    phone: true,
    address: true,
    completeProfile: true
  }).then(function (result) {
    return (0, _responses.success)(res, 200, result, "retrieving record(s) was successfully!");
  })["catch"](function (err) {
    return (0, _responses.fail)(res, 500, "Error retrieving record(s).\r\n".concat(err.message));
  });
} // Update a user


function update(_x, _x2) {
  return _update.apply(this, arguments);
} // Delete an admin with the specified adminId in the request


function _update() {
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, _res$locals2, userId, userType, userEmail, record, isComplete, newObject;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = req.body || {};
            _res$locals2 = res.locals, userId = _res$locals2.userId, userType = _res$locals2.userType, userEmail = _res$locals2.userEmail;

            if (!(!userId || !userType)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 400, "Invalid authentication credentials"));

          case 4:
            if (!(userType !== "user")) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Only Users are allowed to update this record not ".concat(userType)));

          case 6:
            if (!(!userEmail && !data.email)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "You must provide an alphanumeric email address"));

          case 8:
            if (data.fullname) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "You must provide an alphanumeric full name"));

          case 10:
            if (data.phone) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "You must provide an alphanumeric phone number"));

          case 12:
            if (data.address) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "You must provide an alphanumeric address"));

          case 14:
            record = {};
            _context.prev = 15;
            _context.next = 18;
            return _model["default"].findById(userId);

          case 18:
            record = _context.sent;
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](15);
            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Error fetching User information"));

          case 24:
            if (record) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return", (0, _responses.notFound)(res, "User not found"));

          case 26:
            isComplete = record.completeProfile;
            newObject = {};
            newObject.updated = Date.now();
            if (data.fullname) newObject.fullname = data.fullname;
            if (data.phone) newObject.phone = data.phone;
            if (data.address) newObject.address = data.address;

            if (!isComplete && data.email !== "") {
              if (!userEmail) newObject.email = data.email.toLowerCase();
            }

            if (!data.password) {
              _context.next = 37;
              break;
            }

            _context.next = 36;
            return helper.hashPassword(data.password);

          case 36:
            newObject.password = _context.sent;

          case 37:
            newObject.completeProfile = true;
            return _context.abrupt("return", _model["default"].findByIdAndUpdate(userId, newObject, {
              "new": true
            }).then(function (result) {
              if (!result) return (0, _responses.notFound)(res, "Error: newly submitted record not found with id ".concat(userId));
              return (0, _responses.success)(res, 200, result, "Record has been created successfully!");
            })["catch"](function (err) {
              return (0, _responses.fail)(res, 500, "Error updating record with id ".concat(userId, ".\r\n").concat(err.message));
            }));

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[15, 21]]);
  }));
  return _update.apply(this, arguments);
}

function destroy(_x3, _x4) {
  return _destroy.apply(this, arguments);
}

function _destroy() {
  _destroy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var recordId, _res$locals3, userId, userType;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            recordId = req.params.userId || "";
            _res$locals3 = res.locals, userId = _res$locals3.userId, userType = _res$locals3.userType;

            if (recordId) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", (0, _responses.fail)(res, 400, "No record Id as request parameter"));

          case 4:
            if (_model.ObjectId.isValid(recordId)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", (0, _responses.fail)(res, 422, "Invalid record Id as request parameter"));

          case 6:
            if (!(!userId || !userType)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", (0, _responses.fail)(res, 400, "Invalid authentication credentials"));

          case 8:
            return _context2.abrupt("return", _model["default"].findByIdAndRemove(recordId).then(function (record) {
              if (!record) return (0, _responses.notFound)(res, "Record not found with id ".concat(recordId));
              return (0, _responses.success)(res, 200, [], "Record deleted successfully!");
            })["catch"](function (err) {
              if (err.kind === "ObjectId" || err.name === "NotFound") {
                return (0, _responses.notFound)(res, "Error: record not found with id ".concat(recordId, "\r\n").concat(err.message));
              }

              return (0, _responses.fail)(res, 500, "Error: could not delete record with id ".concat(recordId, "\r\n").concat(err.message));
            }));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _destroy.apply(this, arguments);
}
//# sourceMappingURL=contoller.js.map