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
  console.log(id)
  let query = {
    text: `select
          json_build_object(
           'id', products.id,
           'name', products.name,
           'slogan', products.slogan,
           'description',products.description,
           'category', products.category,
           'default_price', products.default_price,
           'features', (
            SELECT json_agg(features)
            FROM (
              SELECT
              features.feature,
              features.value
            FROM features
            WHERE features.product_id = $1
            ) AS features
           )
           )
           FROM products
           WHERE products.id = $1`,
      values: [id]
  }
  return pool.query(query)
}


module.exports.styles = (id) => {
  let query = {
    text: `SELECT json_build_object(
      'style_id', styles.id,
'name',styles.name,
'origina_price', styles.original_price,
'sale_price',styles.sale_price,
'default?', styles.default_style,
'photos', (
SELECT json_agg(photos)
  FROM (
  SELECT
    photos.thumbnail_url,
    photos.photo_url as "url"
  FROM photos
  WHERE photos.style_id = styles.id
  ) AS "photos"
),
  'skusarr', (
SELECT json_agg(skus)
  FROM (
  SELECT
    skus.id,
    skus.size,
    skus.quantity
  FROM skus
  WHERE skus.style_id = styles.id
  ) AS "skus"
)
      )
    FROM styles
    WHERE styles.product_id = $1`,
      values: [id]
  }
 return pool.query(query)
}

module.exports.related = (id) => {

  let query = {
    text: 'select related_id from "related/products" Join products on products.id = "related/products".product_id where products.id = $1',
    values: [id]
  }

  return pool.query(query)
}