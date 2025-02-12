const express = require("express")
const { addProperty, getAllProperties, getSingleProperty, searchSortProperties } = require("../controllers/property")
const router = express.Router()

router.route('/').post(addProperty).get(getAllProperties)
router.route("/search").get(searchSortProperties)
router.route("/:id").get(getSingleProperty)

module.exports = router
