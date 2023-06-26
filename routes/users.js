const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel, userValid, loginValid, createToken } = require("../models/userModel");
const { auth, authAdmin } = require("../middlewares/auth")
const router = express.Router();

router.get("/getAllUsers", authAdmin, async (req, res) => {
    try {
        let data = await UserModel.find({}, { password: 0 });
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
});

router.post("/signup", async (req, res) => {
    let valdiateBody = userValid(req.body);
    if (valdiateBody.error) {
        return res.status(400).json(valdiateBody.error.details)
    }
    try {
        let user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10)
        await user.save();
        res.status(201).json(user)
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ msg: "Email already in system try login", code: 11000 })
        }
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
});
router.post("/login", async (req, res) => {
    let validBody = loginValid(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details,"here!");
    }
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ msg: "Password or email is worng ,code:1" })
        }
        let authPassword = await bcrypt.compare(req.body.password, user.password);
        if (!authPassword) {
            return res.status(401).json({ msg: "Password or email is worng ,code:2" });
        }
        let token = createToken(user._id, user.role);
        res.json({ token });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
});

router.delete("/:idDel", auth, async (req, res) => {
    try {
        let delId = req.params.idDel;
        let data;
        if (req.tokenData.role == "admin") {
            data = await UserModel.deleteOne({ _id: delId }, req.body);
        }
        else {
            data = await UserModel.deleteOne({ _id: delId, userId: req.tokenData._id }, req.body);
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
});

router.put("/:idEdit", auth, async (req, res) => {
    let validBody = userValid(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let editId = req.params.idEdit;
        let data;
        if (req.tokenData.role == "admin") {
            data = await UserModel.updateOne({ _id: editId }, req.body);
        }
        else {
            data = await UserModel.updateOne({ _id: editId, userId: req.tokenData._id }, req.body);
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err })
    }
});

module.exports = router;
