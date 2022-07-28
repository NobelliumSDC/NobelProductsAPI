const express = require('express')
const controllers = require('../controllers/controllers.js')
const app = express()
require("dotenv").config();
const port = process.env.PORT



app.get('/products', (req, res) => {
  const {page, count} = req.query
  console.log(req.query)
  controllers.getProducts(page, count).then(x => res.send(x.rows))
})

app.get('/products/:product_id', (req, res) => {

  controllers.getOne(req.params.product_id).then(x => {
    res.send(x)
  })
})

app.get('/products/:product_id/styles', (req, res) => {
  controllers.getSyles(req.params.product_id)
  res.send('ok')
})
app.get('/products/:product_id/related')


app.listen(port, () => {
  console.log(` listening on port ${port}`)
})