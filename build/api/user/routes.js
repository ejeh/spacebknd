"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var user = _interopRequireWildcard(require("./contoller"));

var _controller = require("../auth/controller");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router();
/**
 * @api {put} /user Update user
 * @apiName Updateuser
 * @apiGroup user
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam {String} fullname user's fullname
 * @apiParam {String} email  user's email address
 * @apiSuccess {Object} user user's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 user not found.
 */


router.put("/user", _controller.isValidUser, user.update);
/**
 * @api {get} /user/:userId Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiSuccess {Object} user user's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 user not found.
 */

router.get("/user/:userId", _controller.isValidUser, user.findOne);
/**
 * @api {get} /user Retrieve user
 * @apiName Retrieveuser
 * @apiGroup user
 * @apiSuccess {Object[]} rows List of user
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */

router.get("/users/admin", _controller.isValidAdmin, user.findAll);
/**
 * @api {delete} /user/:userId Delete user
 * @apiName Deleteuser
 * @apiGroup user
 * @apiPermission master
 * @apiParam  access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 user not found.
 * @apiError 401 master access only.
 */

router["delete"]("/user/:userId", _controller.isValidAdmin, user.destroy);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=routes.js.map