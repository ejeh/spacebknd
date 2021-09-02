"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyPayment = exports.initializePayment = void 0;

var _request = _interopRequireDefault(require("request"));

// sk_test_xxxx - Your secret key
var MySecretKey = process.env.PAYSTACK_SECRET_KEY;

var initializePayment = function initializePayment(form, mycallback) {
  console.log(form);
  var options = {
    url: "https://api.paystack.co/transaction/initialize",
    headers: {
      authorization: MySecretKey,
      "content-type": "application/json",
      "cache-control": "no-cache"
    },
    form: form
  };

  var callback = function callback(error, response, body) {
    return mycallback(error, body);
  };

  _request["default"].post(options, callback);

  return initializePayment;
};

exports.initializePayment = initializePayment;

var verifyPayment = function verifyPayment(ref, mycallback) {
  var option = {
    url: "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
    headers: {
      authorization: MySecretKey,
      "content-type": "application/json",
      "cache-control": "no-cache"
    }
  };

  var callback = function callback(error, response, body) {
    return mycallback(error, body);
  };

  (0, _request["default"])(option, callback);
  return verifyPayment;
};

exports.verifyPayment = verifyPayment;
//# sourceMappingURL=paystack.js.map