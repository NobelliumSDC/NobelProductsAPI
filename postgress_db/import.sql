COPY products(id, name, slogan, description, category, default_price)
FROM '/Users/manuelrosadilla/Desktop/SDC/sdcdata/product.csv'
DELIMITER ','
CSV HEADER;
COPY styles(id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/manuelrosadilla/Desktop/SDC/sdcdata/styles.csv'
DELIMITER ','
CSV HEADER;
COPY features(id, product_id, feature, value)
FROM '/Users/manuelrosadilla/Desktop/SDC/sdcdata/product.csv'
DELIMITER ','
CSV HEADER;
COPY photos(id, style_id, photo_url, thumbnail_url)
FROM '/Users/manuelrosadilla/Desktop/SDC/sdcdata/product.csv'
DELIMITER ','
CSV HEADER;
COPY related(id, current_product_id, related_product_id)
FROM '/Users/manuelrosadilla/Desktop/SDC/sdcdata/product.csv'
DELIMITER ','
CSV HEADER;
COPY skus(id, style_id, size, quantity)
FROM '/Users/manuelrosadilla/Desktop/SDC/sdcdata/product.csv'
DELIMITER ','
CSV HEADER;


