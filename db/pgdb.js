require("dotenv").config()
const {DB_PORT, DB_NAME, DB_HOST, DB_USER, DB_PASS} = process.env


const {Pool, CLient} = require('pg')

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password:DB_PASS,
  port:DB_PORT
})


module.exports.get = (page =1, count = 5) =>{
  let offset = (page * count - count)
  let limit = count
  let query = {
    text:'SELECT * from products order by id limit $1 offset $2;',
    values: [limit, offset]
  }
  return pool.query(query)
}
module.exports.getOne = (id) => {
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
    text: `SELECT
    styles.id as "style_id",
styles.name,
styles.original_price,
styles.sale_price::json,
styles.default_style as "default?",
(
SELECT json_agg(photos) as "photos"
FROM (
SELECT
 photos.thumbnail_url,
 photos.photo_url as "url"
FROM photos
WHERE photos.style_id = styles.id
) AS "photos"
),
(
SELECT json_agg(skus) as "skusarr"
FROM (
SELECT
 skus.id,
 skus.size,
 skus.quantity
FROM skus
WHERE skus.style_id = styles.id
) AS "skus"
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


module.exports.test = () => {
  let query = {
    text: `SELECT
    styles.id as "style_id",
styles.name,
styles.original_price,
styles.sale_price,
styles.default_style as "default?",
(
SELECT json_agg(photos) as "photos"
FROM (
SELECT
 photos.thumbnail_url,
 photos.photo_url as "url"
FROM photos
WHERE photos.style_id = styles.id
) AS "photos"
),
(
SELECT json_agg(skus) as "skus"
FROM (
SELECT
 skus.id,
 skus.size,
 skus.quantity
FROM skus
WHERE skus.style_id = styles.id
) AS "skus"
)

 FROM styles
 WHERE styles.product_id = 1`
  }

  return pool.query(query)

}