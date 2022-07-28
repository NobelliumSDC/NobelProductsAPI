const Product = require('../db/db.js')
const Pgdb = require('../db/pgdb.js')

// route for getting n products or 5 default
module.exports.getProducts = (page, count) => {
  return Pgdb.get(page, count)
}
//route for getting single product

//route for getting product styles

//route for getting related