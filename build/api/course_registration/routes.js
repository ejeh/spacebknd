"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var course = _interopRequireWildcard(require("./controller"));

var _controller2 = require("../auth/controller");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router();
/**
 * @api {post} /course create course
 * @apiName CreateCourse
 * @apiGroup course
 * @apiParam {String} courseName course courseName
 * @apiParam {String} date course date
 * @apiParam {String} status course status
 * @apiSuccess {Object} agent agent's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 agent not found.
 */


router.post("/course", _controller2.isValidUser, course.create);
/**
 * @api {get} /user Retrieve courses
 * @apiName Retrievecourses
 * @apiGroup courses
 * @apiSuccess {Object[]} rows List of courses
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */

router.get("/courses/admin", _controller2.isValidAdmin, course.findAll);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=routes.js.map