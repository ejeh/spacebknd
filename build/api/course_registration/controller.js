"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = findAll;
exports.create = exports.findcourseByUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("./model"));

var _responses = require("../../services/helpers/responses");

var _contoller = require("../user/contoller");

var findcourseByUser = function findcourseByUser(userId) {
  return _model["default"].findOne({
    user: userId
  }).then(function (result) {
    return result;
  });
}; // Course registration


exports.findcourseByUser = findcourseByUser;

var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, _res$locals, userId, userType, user, newObject, course;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = req.body || {};
            _res$locals = res.locals, userId = _res$locals.userId, userType = _res$locals.userType;

            if (!(userType !== "user")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Only Users are allowed to create a course not ".concat(userType)));

          case 4:
            if (data.courseName) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Course name can not be empty and must be alphanumeric."));

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return (0, _contoller.findUserById)(userId);

          case 9:
            user = _context.sent;
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](6);
            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Unable to find User Information"));

          case 15:
            if (user) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Unable to find User information"));

          case 17:
            newObject = {};
            newObject.user = userId;
            newObject.date = Date.now();
            if (data.courseName) newObject.courseName = data.courseName; // create a course

            course = new _model["default"](newObject); // Save course to database

            return _context.abrupt("return", course.save().then(function (result) {
              if (!result) {
                return (0, _responses.notFound)(res, 404, "Error not found newly added course");
              }

              return (0, _responses.success)(res, 200, result, "New course record has been created successfully");
            })["catch"](function (err) {
              (0, _responses.fail)(res, 500, "Error occured while creating the course. ".concat(err.message));
            }));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 12]]);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // / Retrieve and return all records from the database.


exports.create = create;

function findAll(req, res) {
  return _model["default"].find().limit(500).sort({
    createdAt: -1
  }).populate({
    path: "user",
    select: "id fullname phone address email completeProfile"
  }).select({
    // eslint-disable-next-line object-property-newline
    courseName: true,
    status: true,
    date: true
  }).then(function (result) {
    return (0, _responses.success)(res, 200, result, "retrieving record(s) was successfully!");
  })["catch"](function (err) {
    return (0, _responses.fail)(res, 500, "Error retrieving record(s).\r\n".concat(err.message));
  });
}
//# sourceMappingURL=controller.js.map