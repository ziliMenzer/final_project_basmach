const express = require("express");
const bcrypt = require("bcrypt");
const { auth } = require("../middlewares/auth");
const { eventModel } = require("../models/eventModel");
const router = express.Router();


router.get("/", auth, async (req, res) => {
    try {
        let data;
        if (req.tokenData.role == "admin") {
            data = await eventModel.find({}, req.body);
        }
        else {
            try {
                if (req.tokenData.role == "teacher") {
                    data = await eventModel.findOne({ id_teacher: req.tokenData._id }, req.body);
                }
                else {
                    data = await eventModel.findOne({ id_student: req.tokenData._id }, req.body);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
});

router.get("/eventInfo/:id", auth, async (req, res) => {
    try {
        let data;
        if (req.tokenData.role == "admin") {
            data = await eventModel.findOne({_id:id}, req.body);
        }
        else {
            try {
                if (req.tokenData.role == "teacher") {
                    data = await eventModel.findOne({ id_teacher: req.tokenData._id, _id: id }, req.body);
                }
                else {
                    data = await eventModel.findOne({ id_student: req.tokenData._id, _id: id }, req.body);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
});

router.post("/addEvent", async (req, res) => {
    let validateBody = eventValid(req.body);
    if (validateBody.error) {
        return res.status(400).json(validateBody.error.details)
    }
    try {
        let user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10)
        await user.save();
        user.password = "******";
        res.status(201).json(user)
    }
    catch (err) {
        // בודק אם השגיאה זה אימייל שקיים כבר במערכת
        // דורש בקומפס להוסיף אינדקס יוניקי
        if (err.code == 11000) {
          return res.status(400).json({ msg: "Email already in system try login", code: 11000 })
        }
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
});

module.exports = router;