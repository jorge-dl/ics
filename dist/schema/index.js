"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateEvent;

var _joiBrowser = _interopRequireDefault(require("joi-browser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dateTimeSchema = _joiBrowser["default"].array().min(3).max(7).ordered(_joiBrowser["default"].number().integer(), _joiBrowser["default"].number().integer().min(1).max(12), _joiBrowser["default"].number().integer().min(1).max(31), _joiBrowser["default"].number().integer().min(0).max(23), _joiBrowser["default"].number().integer().min(0).max(60), _joiBrowser["default"].number().integer().min(0).max(60));

var durationSchema = _joiBrowser["default"].object().keys({
  before: _joiBrowser["default"]["boolean"](),
  //option to set before alaram
  weeks: _joiBrowser["default"].number(),
  days: _joiBrowser["default"].number(),
  hours: _joiBrowser["default"].number(),
  minutes: _joiBrowser["default"].number(),
  seconds: _joiBrowser["default"].number()
});

var contactSchema = _joiBrowser["default"].object().keys({
  name: _joiBrowser["default"].string(),
  email: _joiBrowser["default"].string().email(),
  rsvp: _joiBrowser["default"]["boolean"](),
  dir: _joiBrowser["default"].string().uri(),
  partstat: _joiBrowser["default"].string(),
  role: _joiBrowser["default"].string()
});

var organizerSchema = _joiBrowser["default"].object().keys({
  name: _joiBrowser["default"].string(),
  email: _joiBrowser["default"].string().email()
});

var alarmSchema = _joiBrowser["default"].object().keys({
  action: _joiBrowser["default"].string().regex(/audio|display|email/).required(),
  trigger: _joiBrowser["default"].any().required(),
  description: _joiBrowser["default"].string(),
  duration: durationSchema,
  repeat: _joiBrowser["default"].number(),
  attach: _joiBrowser["default"].string(),
  attachType: _joiBrowser["default"].string(),
  summary: _joiBrowser["default"].string(),
  attendee: contactSchema,
  'x-prop': _joiBrowser["default"].any(),
  'iana-prop': _joiBrowser["default"].any()
});

var schema = _joiBrowser["default"].object().keys({
  summary: _joiBrowser["default"].string(),
  timestamp: _joiBrowser["default"].any(),
  title: _joiBrowser["default"].string(),
  productId: _joiBrowser["default"].string(),
  method: _joiBrowser["default"].string(),
  uid: _joiBrowser["default"].string().required(),
  sequence: _joiBrowser["default"].number(),
  start: dateTimeSchema.required(),
  duration: durationSchema,
  startType: _joiBrowser["default"].string().regex(/utc|local/),
  startInputType: _joiBrowser["default"].string().regex(/utc|local/),
  startOutputType: _joiBrowser["default"].string().regex(/utc|local/),
  end: dateTimeSchema,
  endInputType: _joiBrowser["default"].string().regex(/utc|local/),
  endOutputType: _joiBrowser["default"].string().regex(/utc|local/),
  description: _joiBrowser["default"].string(),
  url: _joiBrowser["default"].string().uri(),
  geo: _joiBrowser["default"].object().keys({
    lat: _joiBrowser["default"].number(),
    lon: _joiBrowser["default"].number()
  }),
  location: _joiBrowser["default"].string(),
  status: _joiBrowser["default"].string().regex(/TENTATIVE|CANCELLED|CONFIRMED/),
  categories: _joiBrowser["default"].array().items(_joiBrowser["default"].string()),
  organizer: organizerSchema,
  attendees: _joiBrowser["default"].array().items(contactSchema),
  alarms: _joiBrowser["default"].array().items(alarmSchema),
  recurrenceRule: _joiBrowser["default"].string(),
  busyStatus: _joiBrowser["default"].string().regex(/TENTATIVE|FREE|BUSY|OOF/)
}).xor('end', 'duration');

function validateEvent(candidate) {
  var _Joi$validate = _joiBrowser["default"].validate(candidate, schema),
      error = _Joi$validate.error,
      value = _Joi$validate.value;

  return {
    error: error,
    value: value
  };
}