
const Pgdb = require('../db/pgdb.js')

// route for getting n products or 5 default
module.exports.getProducts = (page, count) => {
  return Pgdb.get(page, count)
}
//route for getting single product
module.exports.getOne = (id) => {
  return Pgdb.getOne(id).then(responses => {
    let product = responses[1].rows[0]
    let features = responses[0].rows
    product.features = features
    return product
  })
}
//route for getting product styles
module.exports.getSyles = (id) => {
  return Pgdb.getStyles(id)
}

//route for getting related