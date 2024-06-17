CREATE DATABASE leaflet;

\l


CREATE SCHEMA leaflet;

SET search_path TO leaflet;


\c postgis_db;
\c leaflet;

SELECT * FROM information_schema.tables WHERE table_name = 'geojson_data';

CREATE EXTENSION postgis;

create table geojson_data
(
  id          serial primary key,
  fileid      varchar(255) not null,
  data        geometry not null,
  sys_time    varchar(255) not null,
  mcc         varchar(255),
  mnc         varchar(255),
  lac_tac_sid varchar(255),
  long_cid    varchar(255)
);

DROP TABLE geojson_data;

ALTER TABLE geojson_data
ALTER COLUMN sys_time SET NOT NULL;

--

ALTER TABLE geojson_data
ADD COLUMN fileId VARCHAR(255);


INSERT INTO geojson_data (fileId, data, sys_time, mcc, mnc, lac_tac_sid, long_cid)
VALUES (
  'sample_file_id',
  ST_GeomFromGeoJSON('{"type":"Point","coordinates":[125.6,10.1]}'),
  '2022-01-01 00:00:00',
  'sample_mcc',
  'sample_mnc',
  'sample_lac_tac_sid',
  'sample_long_cid'
);
