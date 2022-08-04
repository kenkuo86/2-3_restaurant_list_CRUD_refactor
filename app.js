// import express
const express = require('express')
const app = express()
const port = 3000

// import mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// connect to database
const db = mongoose.connection

db.on('error', () => {
  console.log('DB connection failed')
})

db.once('open', () => {
  console.log('DB connected !')
})

const Restaurant = require('./models/restaurant')

// import express-handlebars
const exphbs = require('express-handlebars')
const restaurant = require('./models/restaurant')

app.engine('handlebars', exphbs( {defaultLayout: 'main'} ))
app.set('view engine', 'handlebars')

// 設定 body-parser
app.use(express.urlencoded({ extended: true }))

app.use( express.static('public') )

// 查看首頁
app.get('/', (req,res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch('error', error => console.log(error))
})

// 查看單一餐廳頁面
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then( restaurant => { res.render( 'show', {restaurant} )} )
    .catch( error => console.log(error))  
})

// 搜尋餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const noResultMessage = '查無資料，請更換關鍵字或回到首頁'

  Restaurant.find()
    .lean()
    .then( restaurants => {
      const searchedRestaurants = restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
      
      // 根據搜尋結果渲染頁面
      searchedRestaurants.length ? res.render('index', { restaurants: searchedRestaurants, keyword: keyword }) : res.render('index', { noResultMessage: noResultMessage, keyword: keyword })
    })
    .catch( error => console.log( error ) )
})

// 查看「新增餐廳」頁面
app.get('/restaurant/add', (req,res) => {
  res.render('create')
})

// 新增餐廳
app.post('/restaurants', (req,res) => {
  return Restaurant.create({
              name: req.body.name,
              name_en: req.body.name_en,
              category: req.body.category,
              image: req.body.image,
              location: req.body.location,
              phone: req.body.phone,
              google_map: req.body.google_map,
              rating: req.body.rating,
              description: req.body.description
            })
          .then( () => res.redirect('/'))
          .catch( error => console.log(error) )
})

// 取得編輯餐廳頁面
app.get('/restaurants/edit/:id', (req,res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then( restaurant => {res.render('edit', {restaurant})})
    .catch( error => console.log(error))
})

// 編輯餐廳資訊
app.post('/restaurant/edit/:id', (req,res) => {
  const id = req.params.id

  return Restaurant.findById(id)
          .then( restaurant => {
            restaurant.name = req.body.name
            restaurant.name_en = req.body.name_en
            restaurant.category = req.body.category
            restaurant.image = req.body.image
            restaurant.location = req.body.location
            restaurant.phone = req.body.phone
            restaurant.google_map = req.body.google_map
            restaurant.rating = req.body.rating
            restaurant.description = req.body.description

            return restaurant.save()
          })
          .then( () => { res.redirect(`/restaurants/${id}`)} )
          .catch( error => console.log(error) )
})

// 刪除餐廳
app.post('/restaurant/delete/:id', (req,res) => {
  const id = req.params.id

  return Restaurant.findById(id)
          .then( restaurant => restaurant.remove() )
          .then( () => res.redirect('/') )
          .catch( error => console.log(error) )
})

// 監聽
app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`)
})