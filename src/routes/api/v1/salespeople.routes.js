const express = require("express");
const { salespeoplectontroller } = require("../../../controller");

const router = express.Router();

router.get(
    "/list-salespeople",
    salespeoplectontroller.listsalespeople
)


module.exports = router