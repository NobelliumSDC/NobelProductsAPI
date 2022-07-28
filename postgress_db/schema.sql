CREATE TABLE "styles"(
    "id" INTEGER NULL,
    "product_id" INTEGER NULL,
    "name" VARCHAR(255) NULL,
    "sale_price" VARCHAR(255) NULL,
    "original_price" INTEGER NULL,
    "default_style" BOOLEAN NULL
);
ALTER TABLE
    "styles" ADD PRIMARY KEY("id");
CREATE TABLE "products"(
    "id" INTEGER NULL,
    "name" VARCHAR(255) NULL,
    "slogan" VARCHAR(255) NULL,
    "description" Text NULL,
    "category" VARCHAR(255) NULL,
    "default_price" INTEGER NULL
);
ALTER TABLE
    "products" ADD PRIMARY KEY("id");
CREATE TABLE "features"(
    "id" INTEGER NULL,
    "product_id" INTEGER NULL,
    "feature" VARCHAR(255) NULL,
    "value" VARCHAR(255) NULL
);
ALTER TABLE
    "features" ADD PRIMARY KEY("id");
CREATE TABLE "photos"(
    "id" INTEGER NULL,
    "style_id" INTEGER NULL,
    "photo_url" VARCHAR(255) NULL,
    "thumbnail_url" VARCHAR(255) NULL

);
ALTER TABLE
    "photos" ADD PRIMARY KEY("id");
CREATE TABLE "skus"(
    "id" INTEGER NULL,
  "style_id" INTEGER NULL,
  "size" VARCHAR(255) NULL,
    "quantity" INTEGER NULL
);
ALTER TABLE
    "skus" ADD PRIMARY KEY("id");
CREATE TABLE "related/products"(
    "id" INTEGER NULL,
    "product_id" INTEGER NULL,
    "related_id" INTEGER NULL
);
ALTER TABLE
    "related/products" ADD PRIMARY KEY("id");
CREATE TABLE "products/features"(
    "id" INTEGER NULL,
    "feature_id" INTEGER NULL,
    "product_id" INTEGER NULL
);
ALTER TABLE
    "products/features" ADD PRIMARY KEY("id");
ALTER TABLE
    "styles" ADD CONSTRAINT "styles_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "products"("id");
ALTER TABLE
    "photos" ADD CONSTRAINT "photos_style_id_foreign" FOREIGN KEY("style_id") REFERENCES "styles"("id");
ALTER TABLE
    "skus" ADD CONSTRAINT "skus_style_id_foreign" FOREIGN KEY("style_id") REFERENCES "styles"("id");
ALTER TABLE
    "related/products" ADD CONSTRAINT "related/products_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "products"("id");
ALTER TABLE
    "products/features" ADD CONSTRAINT "products/features_feature_id_foreign" FOREIGN KEY("feature_id") REFERENCES "features"("id");
ALTER TABLE
    "products/features" ADD CONSTRAINT "products/features_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "products"("id");