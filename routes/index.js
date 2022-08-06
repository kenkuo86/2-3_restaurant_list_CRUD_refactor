const express = require('express')
const router = express.Router()

// 引入首頁
const home = require('./modules/home')
router.use('/', home)

// 引入 restaurants 相關路由
const restaurants = require('./modules/restaurants')
router.use('/restaurants', restaurants)

module.exports = router