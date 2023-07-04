const express = require("express");
const { StudentModel, studentValid } = require("../models/studentModel");
const { auth, authAdmin } = require("../middlewares/auth");
const { error } = require("console");
const { UserModel } = require("../models/userModel");
const router = express.Router();

// get all students of teacher
router.get("/", auth, async (req, res) => {
    let perPage = req.query.perPage || 15;
    let page = req.query.page || 1;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;
    try {
        let data = await StudentModel.find({ teacher_id: req.tokenData._id })
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ [sort]: reverse })
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
});
//get all of student info
router.get("/studentInfo", auth, async (req, res) => {
    try {
        let userData = await UserModel.findOne({ _id: req.tokenData._id });
        let studentData = await StudentModel.findOne({ user_id: req.tokenData._id });
        const fullStudent = { ...userData.toObject(), ...studentData.toObject() };
        res.json(fullStudent);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error", err });
    }
});
// register student
router.post("/", async (req, res) => {
    let valdiateBody = studentValid(req.body);
    if (valdiateBody.error) {
        return res.status(400).json(valdiateBody.error.details)
    }
    try {
        let student = new StudentModel(req.body);
        await student.save();
        res.status(201).json(student)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
})


//get student info by admin
router.get("/myInfo/:id", auth, async (req, res) => {
    let studentId = req.params.id;
    try {
        let userData = await UserModel.findOne({ _id: studentId });
        let studentData = await StudentModel.findOne({ user_id: studentId });
        const fullStudent = { ...userData.toObject(), ...studentData.toObject() };
        res.json(fullStudent);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error", err });
    }
});

// Display student of teacher
router.get("/myStudents", auth, async (req, res) => {
    try {
        let data = await StudentModel.find({ teacherId: req.tokenData._id }, req.body).limit(20);
        res.json({ data });
    }
    catch (err) {
        // Handle the error
        console.log(err);
        res.status(500).json({ msg: 'Internal server error', err });
    }
});
//get more details such as debt etc..
router.get("/moreDetails/:studentId", auth, async (req, res) => {
    try {
        let studentId = req.params.studentId;
        let data;
        if (req.tokenData.role == "admin") {
            data = await StudentModel.findOne({ _id: studentId });
        }
        else {
            data = await StudentModel.findOne({ _id: studentId, userId: req.tokenData._id }, req.body);
        }
        res.json({
            subjects_array: data.subjects_array,
            number_of_lessons: data.number_of_lessons,
            debt: data.debt
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err })
    }
});

//edit student progress
router.put("/:idEdit", auth, async (req, res) => {
    let validBody = studentValid(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let editId = req.params.idEdit;
        let data;
        if (req.tokenData.role == "admin"||req.tokenData.role == "teacher") {
            data = await StudentModel.updateOne({ user_id: editId }, req.body);
        }
        else {
            data = await StudentModel.updateOne({ user_id: editId ,user_id:req.tokenData._id}, req.body);
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err })
    }
});
//student leaves teacher
router.put("/leaveTeacher/:id", auth, async (req, res) => {
    let validBody = studentValid(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let editId = req.params.id;
        let data;
        if (req.tokenData.role == "admin") {
            data = await StudentModel.updateOne({ _id: editId });
            data.status = req.body.status;
        }
        else {
            data = await StudentModel.updateOne({ _id: editId, teacher_id: req.tokenData._id });
            data.status = req.body.status;

        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err })
    }
})
// delete student
router.delete("/:idDel", auth, async (req, res) => {
    try {
        let delId = req.params.idDel;
        let data;
        if (req.tokenData.role == "admin") {
            data = await StudentModel.deleteOne({ _id: delId }, req.body);
        }
        else {
            data = await StudentModel.deleteOne({ _id: delId, user_id: req.tokenData._id }, req.body);
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there is an error, try again later", err })
    }
});



module.exports = router;