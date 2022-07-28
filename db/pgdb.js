const {Pool, CLient} = require('pg')
const pool = new Pool({
  user: 'manuelrosadilla',
  host: 'localhost',
  database: 'nobelsdc',
  password:'',
  port: 5432
})
// `Select feature, value  from products join features on products.id = features.product_id where products.id = 1;`

module.exports.get = (page =1, number = 5) =>{
  let offset = ((page - 1) * number)
  let limit = number
  let query = {
    text:'SELECT * from products limit $1 offset $2;',
    values: [limit, offset]
  }
  return pool.query(query)
}