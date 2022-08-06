// import express
const express = require('express')
const app = express()
const port = 3000

// 資料庫連線
require('./config/mongoose')

// 引入 method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const Restaurant = require('./models/restaurant')

// import express-handlebars
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs( {defaultLayout: 'main'} ))
app.set('view engine', 'handlebars')

// 設定 body-parser
app.use(express.urlencoded({ extended: true }))

app.use( express.static('public') )

// 查看「新增餐廳」頁面 - fail
app.get('/restaurants/add', (req, res) => {
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

// 引入 Router
const routes = require('./routes')
app.use(routes)

app.get('/restaurants/add', (req, res) => {
  res.render('create')
})

// 監聽
app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`)
})