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
    console.log("start signup in user");
    console.log(valdiateBody);
    if (valdiateBody.error) {
        console.log("valdiateBody error");
        return res.status(400).json(valdiateBody.error.details)
    }
    try {
        console.log("start log");
        let user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10)
        await user.save();
        res.status(201).json(user)
        console.log("stop log");
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
        return res.status(400).json(validBody.error.details, "here!");
    }
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ msg: "Password or email is worng ,code:1" })
        }
        let authPassword = bcrypt.compare(req.body.password, user.password);
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
            data = await UserModel.deleteOne({ _id: delId, _id: req.tokenData._id }, req.body);
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
    // const {
    //     first_name,
    //     last_name,
    //     email,
    //     phone,
    //     password,
    //     address,        
    //     profile_image,
    //     role
    //   } = req.body;
    console.log(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let editId = req.params.idEdit;
        // let data;
        // if (req.body.password) {
        //     req.body.password = await bcrypt.hash(req.body.password, 10);
        // }
        if (req.tokenData.role == "admin") {
            data = await UserModel.updateOne({ _id: editId }, req.body);

        }
        else {
            data = await UserModel.updateOne({ _id: editId, _id: req.tokenData._id }, req.body);
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err })
    }
});
router.get("/checkRole:user_id", async (req, res) => {
    let user_id = req.params.user_id;
    try {
        let role = await UserModel.findOne({ _id: user_id }, req.body);
        res.json({ role });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err });
    }
});
router.patch("/changeRole/:userID",authAdmin, async(req,res) => {
    if(!req.body.role){
      return res.status(400).json({msg:"Need to send role in body"});
    }
    
    try{
      let userID = req.params.userID
      // לא מאפשר ליוזר אדמין להפוך למשהו אחר/ כי הוא הסופר אדמין
    //   if(userID == "649d5b98304a954a62f28132"){
    //     return res.status(401).json({msg:"You cant change superadmin to user"});
    
    //   }
      let data = await UserModel.updateOne({_id:userID},{role:req.body.role})
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }
  })
  
  // מאפשר לגרום למשתמש לא יכולת להוסיף מוצרים חדשים/ סוג של באן שלא מוחק את המשתמש
  router.patch("/changeActive/:userID",authAdmin, async(req,res) => {
    if(!req.body.active && req.body.active != false){
      return res.status(400).json({msg:"Need to send active in body"});
    }
    
    try{
      let userID = req.params.userID
      // לא מאפשר ליוזר אדמין להפוך למשהו אחר/ כי הוא הסופר אדמין
    //   if(userID == "649d5b98304a954a62f28132"){
    //     return res.status(401).json({msg:"You cant change superadmin to user"});
    
    //   }
      let data = await UserModel.updateOne({_id:userID},{active:req.body.active})
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }
  })
module.exports = router;
