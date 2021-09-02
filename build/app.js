"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireWildcard(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _api = _interopRequireDefault(require("./api"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import dependencies
_dotenv["default"].config();

var app = (0, _express["default"])();
var FRONTEND_APP_URL = process.env.NODE_ENV === "production" ? process.env.FRONTEND_APP_URL : "http://localhost:3000";
var corsOptions = {
  origin: FRONTEND_APP_URL,
  credentials: true
};
app.use((0, _cors["default"])(corsOptions));
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true,
  limit: "10mb"
}));
app.use(_bodyParser["default"].json({
  limit: "10mb"
}));
app.use((0, _morgan["default"])("dev"));
var database = process.env.NODE_ENV === "production" ? process.env.DB_HOS : process.env.DB_HOST; // Configuring the database

_mongoose["default"].Promise = global.Promise;

_mongoose["default"].connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Successfully connected to the database!");
})["catch"](function (err) {
  console.log(err, "Could not connect to the database. Exiting now...");
  process.exit();
});

_mongoose["default"].set("useFindAndModify", false);

_mongoose["default"].set("useCreateIndex", true); // define a simple route


app.get("/", function (req, res) {
  res.json({
    message: "Welcome to  Spaceinnovationhub API."
  });
}); // modify request object

app.use(function (req, res, next) {
  res.locals.userId = 0.0;
  res.locals.userType = "anonymous";
  res.locals.role = "";
  next();
}); // Use Routes

app.use("/api/v1", _api["default"]);
app.use(function (req, res, next) {
  var error = new Error("Not found!");
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: "Spaceinnovationhub API says ".concat(error.message)
    }
  });
  next();
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map