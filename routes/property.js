const express = require("express")
const { addProperty, getAllProperties } = require("../controllers/property")
const router = express.Router()

router.route('/').post(addProperty).get(getAllProperties)

module.exports  = router
