const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

let studentSchema = new mongoose.Schema({
  status: String,
  subjects_array: {
    traffic_signs: Number,
    turns: Number,
    speed: Number,
    vehicle_operation: Number,
    internal_way: Number,
    rights: Number
  },
  teacher_id: String,
  number_of_lessons: Number,
  debt: Number
});
exports.StudentModel = mongoose.model("students", studentSchema);
exports.createToken = (user_id, user_role) => {
  let token = jwt.sign({ _id: user_id, role: user_role }, config.tokenSecret, { expiresIn: "60mins" });
  return token;
}

exports.studentValid = (_reqBody) => {
  let joiSchema = Joi.object({
    status: Joi.string().min(2).max(15).required(),
    subjects_array: Joi.object({
      traffic_signs: Joi.number().min(0).max(100),
      turns: Joi.number().min(0).max(100),
      speed: Joi.number().min(0).max(100),
      vehicle_operation: Joi.number().min(0).max(100),
      internal_way: Joi.number().min(0).max(100),
      rights: Joi.number().min(0).max(100)
    }).required(),
    teacher_id: Joi.string().min(2).max(99).required(),
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