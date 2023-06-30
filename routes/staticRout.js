const express = require('express')
const router = express.Router();
const {homePage} = require('../controller/index')

router.get('/' , homePage);

module.exports = router