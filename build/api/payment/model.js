"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ObjectId = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @author Godfrey Ejeh
 * @description Creating the user payment account
 * @property {String} email user's email account
 * @property {String} full_name user's fullname
 * @property {String} amount user's amount
 * @property {String} reference user's reference
 *
 *  */
var userPaymentSchema = new _mongoose.Schema({
  full_name: {
    type: String,
    "default": ""
  },
  email: {
    type: String,
    lowercase: true,
    max: 100,
    trim: true,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  dateOfPayment: {
    type: Date,
    "default": Date.now
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Why no user"]
  },
  course: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Why no course"]
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function transform(obj, ret) {
      delete ret._id;
    }
  }
});
userPaymentSchema.index({
  createdAt: 1
});

var UserPayment = _mongoose["default"].model("UserPayment", userPaymentSchema);

var ObjectId = _mongoose["default"].Types.ObjectId;
exports.ObjectId = ObjectId;
var _default = UserPayment;
exports["default"] = _default;
//# sourceMappingURL=model.js.map