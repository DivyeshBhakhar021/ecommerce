const express = require("express");
const {usersdata} = require("../../../modal/index")

const router = express.Router();

router.post(
    "/useradd",
    usersdata.userpost

)

module.exports = router