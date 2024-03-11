CREATE DATABASE postgis_db;

CREATE SCHEMA postgis_schema;

SET search_path TO postgis_schema;


\c postgis_db;

CREATE EXTENSION postgis;

CREATE TABLE geojson_data
(
  id          SERIAL PRIMARY KEY,
  fileId      VARCHAR(255) NOT NULL,
  data        GEOMETRY NOT NULL,
  sys_time    VARCHAR(255) NOT NULL,
  mcc         VARCHAR(255),
  mnc         VARCHAR(255),
  lac_tac_sid VARCHAR(255),
  long_cid    VARCHAR(255)
);

DROP TABLE geojson_data;

ALTER TABLE geojson_data
ALTER COLUMN sys_time SET NOT NULL;

--

ALTER TABLE geojson_data
ADD COLUMN fileId VARCHAR(255);
