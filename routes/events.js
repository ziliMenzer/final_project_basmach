const express = require("express");
const bcrypt = require("bcrypt");
const { auth } = require("../middlewares/auth");
const { EventModel, eventValid } = require("../models/eventModel");
const router = express.Router();

router.get("/:id", auth, async (req, res) => {
  let id = req.params.id;
  try {
    let data;
    if (req.tokenData.role == "student") {
      data = await EventModel.find({ student_id: id });
    } else if (req.tokenData.role == "teacher") {
      data = await EventModel.find({ teacher_id: id });
    } else {
      return res.status(401).json({ msg: "You need a valid token" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/eventInfo/:id", auth, async (req, res) => {
  try {
    let data;
    if (req.tokenData.role == "admin") {
      data = await EventModel.findOne({ _id: id }, req.body);
    }
    else {
      try {
        if (req.tokenData.role == "teacher") {
          data = await EventModel.findOne({ teacher_id: req.tokenData._id, _id: id }, req.body);
        }
        else {
          data = await EventModel.findOne({ student_id: req.tokenData._id, _id: id }, req.body);
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

router.post("/", auth, async (req, res) => {
  let validateBody = eventValid(req.body);
  if (validateBody.error) {
    return res.status(400).json(validateBody.error.details)
  }
  try {
    if (req.tokenData.role == "teacher" || req.tokenData.role == "admin") {
      let event = new EventModel(req.body);
      await event.save();
      res.status(201).json(event);
    }
    else {
     res.status(500).json({ msg: "you nead to be a teacher to access this endpoint" });
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
});
router.put("/:idEdit", async (req, res) => {
  let validBody = eventValid(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let editId = req.params.idEdit;
    let data;
    //if (req.tokenData.role == "admin" || req.tokenData.role == "teacher") {
      data = await EventModel.updateOne({ _id: editId }, req.body);
    //}
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err })
  }
});
router.delete("/:idDel",auth, async (req, res) => {
  try {
    let delId = req.params.idDel;
    if (req.tokenData.role == "admin" || req.tokenData.role == "teacher") {
      let data = await EventModel.deleteOne({ _id: delId });
      res.json(data);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "there is an error, try again later", err })
  }
});
module.exports = router;