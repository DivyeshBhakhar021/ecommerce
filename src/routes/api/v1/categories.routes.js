const express = require("express");
const { categoriesController } = require("../../../controller");
const { twilioSms } = require("../../../utilse/twilio");
const validate = require("../../../middleware/validate");
const { categotyValidtion } = require("../../../validation");

const router = express.Router();

router.get(
    "/list-categories",
    twilioSms,
    categoriesController.listCategories
)

router.post("/addcategories",
    validate(categotyValidtion.createcatrgory),
    categoriesController.addCategories
 )

router.put(
    "/updateCategories/:category_id",
    categoriesController.updateCategories
)

router.delete("/deleteCategories/:category_id", 
    categoriesController.deleteCategories
)

router.get("/count-subcategories", 
    categoriesController.countsubcategories
)

router.get("/countActiveCategories",
    categoriesController.countActiveCategories
)

router.get("/count-active", categoriesController.countActiveCategory);

router.get("/most-products", categoriesController.mostProductCat);

router.get("/average-products", categoriesController.totalProduct);

router.get("/count-subcategories", categoriesController.countSubcategory);

router.get("/inactive", categoriesController.inActiveCategory)



module.exports = router