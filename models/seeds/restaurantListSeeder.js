// 將種子資料打入資料庫
const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantInfos = require('../../restaurant.json')
const restaurantList = restaurantInfos.results
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('DB connected !')

  // 創建資料並傳入 DB
  restaurantList.forEach( restaurant => {
    Restaurant.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
  
  console.log('done')
})