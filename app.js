// import 套件
const express = require('express')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

// 資料庫連線
require('./config/mongoose')

// 引入 method-override
app.use(methodOverride('_method'))

// 設定模板引擎
app.engine('handlebars', exphbs( {defaultLayout: 'main'} ))
app.set('view engine', 'handlebars')

// 設定 body-parser
app.use(express.urlencoded({ extended: true }))

// 設定 bootstrap 樣式
app.use(express.static('public'))

// 引入 Router
const routes = require('./routes')
app.use(routes)

// 監聽
app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`)
})