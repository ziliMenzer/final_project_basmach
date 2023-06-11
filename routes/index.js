const express= require("express");
const router = express.Router();
router.get("/" , async(req,res)=> {
  res.json({msg:"api work"})
});
module.exports = router;