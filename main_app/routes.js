const express = require('express')
const router = express.Router()
const views = require('./views')

router.get("/", views.home_page)
router.get("/filter", views.filter)
router.get("/brands", views.brands)


module.exports = router