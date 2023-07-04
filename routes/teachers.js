const express = require("express");
const { auth, authAdmin } = require("../middlewares/auth");
const { TeacherModel, teacherValid } = require("../models/teacherModel");
const { UserModel } = require("../models/userModel");
const router = express.Router();

// Display all teachers
router.get("/", async (req, res) => {
  try {
    let data = await TeacherModel
      .find({});
      // data.map(async item=>{
      //   userData =await UserModel.findOne({ _id: item.user_id })
      //   fullTeacher.push({...userData.toObject(), ...item.toObject()});
      // })
      res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

//get all of teacher info
router.get("/myInfo",auth, async (req, res) => {
  try {
    let userData = await UserModel.findOne({ _id: req.tokenData._id });
    let teacherData = await TeacherModel.findOne({ user_id: req.tokenData._id });
    const fullTeacher = {...userData.toObject(),...teacherData.toObject()};
    res.json(fullTeacher);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error", err });
  }
});
router.get("/teacherInfo/:id", async (req, res) => {
  let id= req.params.id;
  try {
    let userData = await UserModel.findOne({ _id: id });
    let teacherData = await TeacherModel.findOne({ user_id: id });
    const fullTeacher = {...userData.toObject(),...teacherData.toObject()};
    res.json(fullTeacher);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error", err });
  }
});
// Display teacher Inforamation from the student
// router.get("/teacherInfo/:teacherId", async (req, res) => {
//   let teacherId = req.params.id;

//   try {
//     const teacher = await TeacherModel.findOne({ _id: teacherId })
//       // .select('name subject') // Specify the allowed fields

//     if (!teacher) {
//       // Teacher not found
//       res.status(404).json({ error: 'Teacher not found' });
//     }

//     // Return the allowed fields
//     res.json(teacher);
//   }
//   catch (err) {
//     // Handle the error
//     console.log(err);
//     res.status(500).json({ msg: 'Internal server error', err });
//   }
// });

// Display teacher Inforamation from the teacher
router.get("/myInfo/:teacherId", auth, async (req, res) => {
  let teacherId = req.params.teacherId;
  try {
    let teacher = null;
    if (req.tokenData.role == "admin") {
      teacher = await TeacherModel.findOne({ _id: teacherId }, req.body);
    }
    else {
      teacher = await TeacherModel.findOne({ _id: teacherId, userId: req.tokenData._id }, req.body);
    }
    res.json({ teacher });
  }
  catch (err) {
    // Handle the error
    console.log(err);
    res.status(500).json({ msg: 'Internal server error', err });
  }
});

// // Display student of teacher
// router.get("/myStudents",auth, async (req, res) => {
//     try {
//         let data = await StudentModel.find({ teacherId:  req.tokenData._id}, req.body);
//         res.json({data});
//     }
//     catch (err) {
//         // Handle the error
//         console.log(err);
//         res.status(500).json({ msg: 'Internal server error', err });
//     }
// });

// post teacher
router.post("/", authAdmin, async (req, res) => {
  let valdiateBody = teacherValid(req.body);
  if (valdiateBody.error) {
    return res.status(400).json(valdiateBody.error.details)
  }
  try {
    let teacher = new TeacherModel(req.body);
    // teacher.user_id = req.tokenData._id;
    await teacher.save();
    res.status(201).json(teacher)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

// put rating 
router.put("/:idEdit", auth, async (req, res) => {
  let valdiateBody = teacherValid(req.body);
  if (valdiateBody.error) {
    return res.status(400).json(valdiateBody.error.details)
  }
  try {
    let idEdit = req.params.idEdit;
    let data;
    if (req.tokenData.role == "admin") {
      data = await TeacherModel.updateOne({ _id: idEdit }, req.body)
    } else {
      data = await TeacherModel.updateOne({ _id: idEdit, userId: req.tokenData._id }, req.body)
    }
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

module.exports = router;