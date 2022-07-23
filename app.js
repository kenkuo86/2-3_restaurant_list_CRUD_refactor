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

app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`)
})