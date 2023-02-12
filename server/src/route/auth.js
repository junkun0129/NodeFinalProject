const router = require("express").Router();
const contrller = require("../controller/auth.controller")

router.post("/signup", contrller.signInController);

module.exports = router;