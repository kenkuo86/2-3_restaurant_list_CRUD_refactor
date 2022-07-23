const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

const restaurantsInfos = require('./restaurant.json')

app.engine('handlebars', exphbs( {defaultLayout: 'main'} ))
app.set('view engine', 'handlebars')

app.use( express.static('public') )

app.get('/', (req,res) => {
  res.render('index', { restaurant: restaurantsInfos.results } )
})

app.get('/restaurants/:id', (req, res) => {
  const restaurantInfo = restaurantsInfos.results.find((restaurant) => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurantInfo })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const noResultMessage = '查無資料，請更換關鍵字或回到首頁'

  const searchedRestaurants = restaurantsInfos.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })

  // 根據搜尋結果調整頁面資訊
  searchedRestaurants.length ? res.render('index', { restaurant: searchedRestaurants, keyword: keyword }) : res.render('index', { noResultMessage: noResultMessage, keyword: keyword })
})

app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`)
})