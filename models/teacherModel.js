const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")
let teacherSchema = new mongoose.Schema({
    user_id: String,
    license_type: String,
    rating: Number,
    payment_per_lesson: Number,
    sex: String,
    numberOfRaters: {
        type: Number, default:0
      }
    // bank_acoount_number: Number
});
exports.TeacherModel = mongoose.model("teachers", teacherSchema);
exports.createToken = (user_id, user_role) => {
    let token = jwt.sign({ _id: user_id, role: user_role }, config.tokenSecret, { expiresIn: "60mins" });
    return token;
}

exports.teacherValid = (_reqBody) => {
    let joiSchema = Joi.object({
        user_id: Joi.string().min(2).max(99).required(),
        license_type: Joi.string().min(2).max(99).email().required(),
        rating: Joi.string().min(2).max(99).allow(null,""),
        payment_per_lesson: Joi.number().min(100).max(300).required(),
        sex: Joi.string().min(3).max(10).allow(null,"")
    });
    return joiSchema.validate(_reqBody);
}

// exports.loginValid = (_reqBody) => {
//     let joiSchema = Joi.object({
//         mail: Joi.string().min(2).max(99).email().required(),
//         password: Joi.string()
//             .regex(RegExp(pattern))
//             .required()
//             .min(8)
//             .max(20)
//     });
//     return joiSchema.validate(_reqBody);
// }