const express = require("express");
const {usersdata} = require("../../../modal/index")

const router = express.Router();

router.post(
    "/useradd",
    usersdata.userpost

)

router.post(
    "/login",
    usersdata.login

)

router.post(
    "/get-newtoken",
    usersdata.getnewtoken

)


module.exports = router