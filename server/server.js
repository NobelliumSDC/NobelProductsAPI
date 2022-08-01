

const express = require('express')
const controllers = require('../controllers/controllers.js')
const app = express()
require("dotenv").config();
const port = process.env.PORT



app.get('/products', (req, res) => {
  const {page, count} = req.query
  controllers.getProducts(page, count).then(x => res.send(x.rows))
})

app.get('/products/:product_id', (req, res) => {
  controllers.getOne(req.params.product_id)
  .then(x =>res.send(x.rows[0].json_build_object))
  .catch(err => res.send('404'))
})

app.get('/products/:product_id/styles', (req, res) => {
  controllers.styles(req.params.product_id).then(x => {
    res.send(x)
  })
})
app.get('/products/:product_id/related', (req, res) => {
  controllers.related(req.params.product_id).then(x => res.send(x.rows.map(res => res["related_id"])))
})

app.get('/test', (req, res) => {
  controllers.test().then( x => {
    res.send(x.rows)})
})
app.listen(port, () => {
  console.log(` listening on port ${port}`)
})