
const cors = require('cors')
const express = require('express')
const controllers = require('../controllers/controllers.js')
const app = express()
require("dotenv").config();
const port = process.env.PORT
app.use(cors({origin:'*'}))


app.get('/products', (req, res) => {
  const {page, count} = req.query
  controllers.getProducts(page, count).then(x => res.send(x.rows)).catch(err => res.send('500 internal'))
})

app.get('/products/:product_id', (req, res) => {
  controllers.getOne(req.params.product_id)
  .then(x =>res.send(x.rows[0].json_build_object))
  .catch(err => res.send('500 internal'))
})

app.get('/products/:product_id/styles', (req, res) => {
  controllers.styles(req.params.product_id).then(x => {
    res.send(x)
  }).catch(err => res.send('500 internal'))
})
app.get('/products/:product_id/related', (req, res) => {
  controllers.related(req.params.product_id).then(x => res.send(x.rows.map(res => res["related_id"]))).catch(err => res.send('500 internal'))
})

app.get('/test', (req, res) => {
  controllers.test().then( x => {
    res.send(x.rows)}).catch(err => res.send('500 internal'))
})

app.get('/loaderio-82bb8c1db756e9cbad5bbff5899ca91d', (req, res) => { res.sendFile(__dirname + '/loaderio.txt')})

app.listen(port, () => {
  console.log(` listening on port ${port}`)
})