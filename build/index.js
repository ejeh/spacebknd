"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("./app"));

var PORT = process.env.BACKEND_PORT;
var port = process.env.PORT || PORT; // listen for requests

var server = _app["default"].listen(port, function () {
  console.log("Server is listening on port ".concat(port));
});

var _default = _app["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map