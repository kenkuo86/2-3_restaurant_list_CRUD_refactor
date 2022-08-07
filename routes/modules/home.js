const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch('error', error => console.log(error))
})

// 搜尋功能
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const noResultMessage = '查無資料，請更換關鍵字或回到首頁'

  Restaurant.find()
    .lean()
    .then(restaurants => {
      const searchedRestaurants = restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })

      // 根據搜尋結果渲染頁面
      searchedRestaurants.length ? res.render('index', { restaurants: searchedRestaurants, keyword: keyword }) : res.render('index', { noResultMessage: noResultMessage, keyword: keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router