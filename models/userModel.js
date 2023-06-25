const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")
// const pattern = "/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/";
let userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  address: String,
  password: String,
  profile_image: String,
  date_created: {
    type: Date, default: Date.now()
  },
  role: {
    type: String, default: "user"
  },
});
exports.UserModel = mongoose.model("users", userSchema);
exports.createToken = (user_id, user_role) => {
  let token = jwt.sign({ _id: user_id, role: user_role }, config.tokenSecret, { expiresIn: "60mins" });
  return token;
}

exports.userValid = (_reqBody) => {
  let joiSchema = Joi.object({
    first_name: Joi.string().min(2).max(99).required(),
    last_name: Joi.string().min(2).max(99).required(),
    email: Joi.string().min(2).max(99).email().required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    address: Joi.string().min(5).max(100).required(),
    password: Joi.string()
      .required()
      .min(8)
      .max(20),
    profile_image: Joi.string().allow(null, ""),
    role: Joi.string().allow("user")
  })

  return joiSchema.validate(_reqBody);
}

exports.loginValid = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string()
    .required()
    .min(8)
    .max(20)
  });
  return joiSchema.validate(_reqBody);
}