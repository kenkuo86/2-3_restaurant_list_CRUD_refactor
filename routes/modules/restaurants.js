const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 查看「新增餐廳」頁面
router.get('/add', (req, res) => {
  res.render('create')
})

// // 新增餐廳
router.post('/', (req,res) => {
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
router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => { res.render('edit', { restaurant }) })
    .catch(error => console.log(error))
})

// 編輯餐廳資訊
router.put('/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .then(restaurant => {
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
    .then(() => { res.redirect(`/restaurants/${id}`) })
    .catch(error => console.log(error))
})

// 刪除餐廳
router.delete('/:id', (req,res) => {
  const id = req.params.id

  return Restaurant.findById(id)
          .then( restaurant => restaurant.remove() )
          .then( () => res.redirect('/') )
          .catch( error => console.log(error) )
})

// 查看單一餐廳頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => { res.render('show', { restaurant }) })
    .catch(error => console.log(error))
})

module.exports = router