"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = findAll;
exports.find = exports.create = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("./model"));

var _responses = require("../../services/helpers/responses");

var _contoller = require("../user/contoller");

var _controller = require("../course_registration/controller");

var _paystack = require("./paystack");

var _lodash = _interopRequireDefault(require("lodash"));

var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, _res$locals, userId, userType, user, course, newObject;

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

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Only Users are allowed to create payment not ".concat(userType)));

          case 4:
            if (data.full_name) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Full name can not be empty and must be alphanumeric."));

          case 6:
            if (data.email) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Email can not be empty and must be alphanumeric."));

          case 8:
            if (data.amount) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Course name can not be empty and must be alphanumeric."));

          case 10:
            _context.prev = 10;
            _context.next = 13;
            return (0, _contoller.findUserById)(userId);

          case 13:
            user = _context.sent;
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](10);
            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Unable to find User Information"));

          case 19:
            if (user) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Unable to find User information"));

          case 21:
            _context.prev = 21;
            _context.next = 24;
            return (0, _controller.findcourseByUser)(userId);

          case 24:
            course = _context.sent;

            if (course) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", (0, _responses.fail)(res, 422, "Unable to detect Finder course"));

          case 27:
            _context.next = 32;
            break;

          case 29:
            _context.prev = 29;
            _context.t1 = _context["catch"](21);
            return _context.abrupt("return", (0, _responses.fail)(res, 500, "Unable to  complete request"));

          case 32:
            newObject = {};
            newObject.metadata = {
              full_name: data.full_name,
              user: userId,
              dateOfPayment: Date.now(),
              course: course.id
            };
            if (data.amount) newObject.amount = data.amount *= 100;
            if (data.email) newObject.email = data.email;
            (0, _paystack.initializePayment)(newObject, function (error, body) {
              if (error) {
                if (error) {
                  return (0, _responses.fail)(res, 502, "network error! Please check your internet connection");
                }
              }

              var response = JSON.parse(body);
              console.log(response);
              res.redirect(response.data.authorization_url);
            });

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 16], [21, 29]]);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Retrive data from paystack  with a given reference and save in mongodb database


exports.create = create;

var find = function find(req, res) {
  var ref = req.query.reference;
  (0, _paystack.verifyPayment)(ref, function (error, body) {
    if (error) {
      return (0, _responses.fail)(res, 502, "network error! Please check your internet connection");
    }

    var response = JSON.parse(body);
    var _response$data = response.data,
        reference = _response$data.reference,
        amount = _response$data.amount;
    var _response$data$metada = response.data.metadata,
        full_name = _response$data$metada.full_name,
        user = _response$data$metada.user,
        date = _response$data$metada.date,
        course = _response$data$metada.course;
    var email = response.data.customer.email;
    var newPayment = {
      reference: reference,
      amount: amount,
      email: email,
      full_name: full_name,
      user: user,
      date: date,
      course: course
    };
    var payment = new _model["default"](newPayment);
    payment.save().then(function (payment) {
      console.log(payment);

      if (payment) {
        return (0, _responses.success)(res, 200, payment, "retrieving record(s) was successfully!");
      }
    })["catch"](function (err) {
      console.log(err.message);
    });
  });
}; // / Retrieve and return all records from the database.


exports.find = find;

function findAll(req, res) {
  return _model["default"].find().limit(500).sort({
    createdAt: -1
  }).populate({
    path: "user",
    select: "id fullname phone address email completeProfile"
  }).populate({
    path: "course",
    select: "id courseName"
  }).select({
    // eslint-disable-next-line object-property-newline
    email: true,
    full_name: true,
    date: true,
    amount: true,
    course: true,
    reference: true
  }).then(function (result) {
    return (0, _responses.success)(res, 200, result, "retrieving record(s) was successfully!");
  })["catch"](function (err) {
    return (0, _responses.fail)(res, 500, "Error retrieving record(s).\r\n".concat(err.message));
  });
}
//# sourceMappingURL=controller.js.map