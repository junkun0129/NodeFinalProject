const router = require("express").Router();
const contrller = require("../controller/auth.controller")

router.post("/signup", contrller.signInController);
// router.get("/jikken", (req, res, next)=>{
//     res.send("jikken")
// })
module.exports = router;