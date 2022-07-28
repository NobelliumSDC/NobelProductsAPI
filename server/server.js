const express = require('express')
const controllers = require('../controllers/controllers.js')
const app = express()
require("dotenv").config();
const port = process.env.PORT

const {Pool, CLient} = require('pg')
const pool = new Pool({
  user: 'manuelrosadilla',
  host: 'localhost',
  database: 'nobelsdc',
  password:'',
  port: 5432
})


app.get('/products', (req, res) => {
  const {page, count} = req.query
  console.log(req.query)
  controllers.getProducts(page, count).then(x => res.send(x.rows))
})
app.get('products/:product_id')
app.get('products/:product_id/styles')
app.get('products/:product_id/related')


app.listen(port, () => {
  console.log(` listening on port ${port}`)
})