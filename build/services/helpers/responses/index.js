"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFound = exports.fail = exports.success = void 0;

var success = function success(res, status, entity, msg) {
  return res.status(status || 200).json({
    success: true,
    data: entity || [],
    message: msg || "Record(s)"
  });
};

exports.success = success;

var fail = function fail(res, status, msg) {
  return res.status(status || 500).json({
    success: false,
    data: [],
    message: msg || "Operation failed!"
  });
};

exports.fail = fail;

var notFound = function notFound(res, msg) {
  return res.status(404).json({
    success: false,
    data: [],
    message: msg || "Record not found!"
  });
};

exports.notFound = notFound;
//# sourceMappingURL=index.js.map