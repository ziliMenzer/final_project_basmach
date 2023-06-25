const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

let eventSchema = new mongoose.Schema({

    id_student: Number,
    id_teacher: String,
    type_of_event: String,
    length_event: Number,
    date: Date,
    subject: String
});
exports.eventModel = mongoose.model("events", eventSchema);
// exports.createToken = (user_id, user_role) => {
//     let token = jwt.sign({ _id: user_id, role: user_role }, config.tokenSecret, { expiresIn: "60mins" });
//     return token;
// }

exports.eventValid = (_reqBody) => {
    let joiSchema = Joi.object({
        id_student: Joi.string().min(2).max(15).required(),
        id_teacher: Joi.string().min(2).max(15).required(),
        type_of_event: Joi.string().min(2).max(99).required(),
        length_event:Joi.number().min(0).max(2000).allow(null,""),
        date: Joi.date().required(),
        subject: Joi.number().min(0).max(250).allow(null, ""),
    });

    return joiSchema.validate(_reqBody);
}