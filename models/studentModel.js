const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

let studentSchema = new mongoose.Schema({
  user_id: String,
  status: {type: String, default: "no_active"},
  subjects_array: {
    traffic_signs: {type: Number, default: 0},
    turns: {type: Number, default: 0},
    speed: {type: Number, default: 0},
    vehicle_operation: {type: Number, default: 0},
    internal_way: {type: Number, default: 0},
    rights: {type: Number, default: 0}
  },
  teacher_id: {type: String, default: null},
  number_of_lessons:  {type: Number, default: 0},
  debt: {type: Number, default: 0}
});
exports.StudentModel = mongoose.model("students", studentSchema);
exports.createToken = (user_id, user_role) => {
  let token = jwt.sign({ _id: user_id, role: user_role }, config.tokenSecret, { expiresIn: "60mins" });
  return token;
}

exports.studentValid = (_reqBody) => {
  let joiSchema = Joi.object({
    user_id: Joi.string().min(2).max(50).required(),
    status: Joi.string().min(2).max(15),
    subjects_array: Joi.object({
      traffic_signs: Joi.number().min(0).max(100),
      turns: Joi.number().min(0).max(100),
      speed: Joi.number().min(0).max(100),
      vehicle_operation: Joi.number().min(0).max(100),
      internal_way: Joi.number().min(0).max(100),
      rights: Joi.number().min(0).max(100)
    }),
    teacher_id: Joi.string().min(2).max(99),
    number_of_lessons: Joi.number().min(0).max(250).allow(null, ""),
    debt: Joi.number().min(0).max(250).allow(null, ""),
  });

  return joiSchema.validate(_reqBody);
}

// exports.loginValid = (_reqBody) => {
//   let joiSchema = Joi.object({
//     mail: Joi.string().min(2).max(99).email().required(),
//     password: Joi.string()
//     .regex(RegExp(pattern))
//     .required()
//     .min(8)
//     .max(20)
//   });
//   return joiSchema.validate(_reqBody);
// }