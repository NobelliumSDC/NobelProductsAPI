const {Pool, CLient} = require('pg')
const pool = new Pool({
  user: 'manuelrosadilla',
  host: 'localhost',
  database: 'nobelsdc',
  password:'',
  port: 5432
})
// `Select feature, value  from products join features on products.id = features.product_id where products.id = 1;`

module.exports.get = (page =1, count = 5) =>{
  //math is being weird fix later
  let offset = (page * count - count)
  let limit = count
  let query = {
    text:'SELECT * from products order by id limit $1 offset $2;',
    values: [limit, offset]
  }
  return pool.query(query)
}
module.exports.getOne = (id) => {
  const queryFeatures = {
    text: `Select feature, value  from products join features on products.id = features.product_id where products.id = $1`,
    values: [id]
  }
  const queryProduct = {
    text: `Select * from products where id = $1`,
    values: [id]
  }
  return Promise.all([pool.query(queryFeatures), pool.query(queryProduct)])
}

module.exports.getStyles = (id) => {

  const queryStyles = {
    text: 'select * from styles where product_id = $1',
    values: [id]

  }
  pool.query(queryStyles).then(x => console.log(x.rows))
}