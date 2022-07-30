
const Pgdb = require('../db/pgdb.js')

// route for getting n products or 5 default
module.exports.getProducts = (page, count) => {
  return Pgdb.get(page, count)
}
//route for getting single product
module.exports.getOne = (id) => {
  return Pgdb.getOne(id)
}
//route for getting product styles
module.exports.styles = (id) => {
  id = parseInt(id)
  return Pgdb.styles(id).then( x => {
    let stylesArray = x.rows.map(style => {
     style.skus = {}
     style?.skusarr?.forEach(element => {
      style.skus[element.id] = {
        size: element.size,
        quantity: element.quantity
      }
     });
     delete style.skusarr
     return style

    })
    const object = {
      product_id: id,
      results : stylesArray
    }
    return object

  })
}
//route for getting related

module.exports.related = (id) => {

  return Pgdb.related(id)
}


module.exports.test =() => {
  return Pgdb.test()
}