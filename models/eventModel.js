const mongoose = require("mongoose");
const Joi = require("joi");

let eventSchema = new mongoose.Schema({
    teacher_id:String,
    student_id:String,
    title: String,
    start: Date,
    end: Date
});
exports.EventModel = mongoose.model("events", eventSchema);

exports.eventValid = (_reqBody) => {
    let joiSchema = Joi.object({
        teacher_id: Joi.string().min(2).max(999).required(),
        student_id: Joi.string().min(2).max(999).required(),
        title: Joi.string().min(2).max(300).required(),
        start: Joi.date().required(),
        end: Joi.date().required()
    });

    return joiSchema.validate(_reqBody);
}