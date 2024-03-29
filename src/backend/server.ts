import express, {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';

const pgp = require('pg-promise')();
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

//  LOCALHOST
// const db = pgp({
//   host: 'localhost',
//   port: 5432,
//   database: 'postgres',
//   user: 'postgres',
//   password: 'admin'
// });

//  HEROKU
const db = pgp({
  host: 'c6b7lkfdshud3i.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com',
  port: 5432,
  database: 'd9ukt3bmed0i2r',
  user: 'u111fn3mis9oe5',
  password: 'pee1f82b2e643b654fe59d4db0a2891d52334f5c1dc053b3af22726a626077ee2',
  ssl: {
    rejectUnauthorized: false
  }
});

// parsed file => DB
app.post('/data', async (req: Request, res: Response) => {
  const geojsonData = req.body;
  const fileId = uuidv4();  // Must be here, so it doesn't change with each row.

  try {
    for (const {geometry, properties} of geojsonData.features) {
      const {sys_time, mcc, mnc, lac_tac_sid, long_cid} = properties;
      const data = JSON.stringify(geometry);

      await db.none('INSERT INTO geojson_data (fileId, data, sys_time, mcc, mnc, lac_tac_sid, long_cid) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [fileId, data, sys_time, mcc, mnc, lac_tac_sid, long_cid]);
    }
    res.status(200).json({message: 'GeoJSON data inserted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'An error occurred while inserting the GeoJSON data'});
  }
});


// data based on fileID => /date
app.get('/date', async (req, res) => {
  const date = req.query.date;
  // const data = await db.any('SELECT DISTINCT fileId, sys_time FROM geojson_data');
  const data = await db.any('SELECT fileId, MIN(sys_time), MAX(sys_time) FROM geojson_data GROUP BY fileId');
  res.json(data);
});


app.get('/getDataForFile/:fileId', async (req: Request, res: Response) => {
  try {
    const fileId = req.params.fileId;
    const data = await db.any('SELECT fileId, id, sys_time, mcc, mnc, lac_tac_sid, long_cid, ST_AsGeoJSON(data) as geojson FROM geojson_data WHERE fileId = $1', [fileId]);

    const geojson = {
      type: 'FeatureCollection',
      features: data.map((row: any) => ({
        type: 'Feature',
        properties: {
          fileId: row.fileId,
          id: row.id,
          sys_time: row.sys_time,
          mcc: row.mcc,
          mnc: row.mnc,
          lac_tac_sid: row.lac_tac_sid,
          long_cid: row.long_cid,

        },
        geometry: JSON.parse(row.geojson)
      }))
    };


    const latLongData = convertGeoJSONToLatLong(geojson);


    res.status(200).json(latLongData);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'An error occurred while retrieving the GeoJSON data'});
  }
});

function convertGeoJSONToLatLong(geoJSON: any): any[] {
  return geoJSON.features.map((feature: any) => {
    return {
      sys_time: feature.properties.sys_time,
      lat: feature.geometry.coordinates[1].toString(),
      long: feature.geometry.coordinates[0].toString(),
      mcc: feature.properties.mcc,
      mnc: feature.properties.mnc,
      lac_tac_sid: feature.properties.lac_tac_sid,
      long_cid: feature.properties.long_cid,
    };
  });
}


app.get('/dataBackend', async (req: Request, res: Response) => {
  try {
    const data = await db.any('SELECT fileId, id, sys_time, mcc, mnc, lac_tac_sid, long_cid, ST_AsGeoJSON(data) as geojson FROM geojson_data');
    const geojson = {
      type: 'FeatureCollection',
      features: data.map((row: any) => ({
        type: 'Feature',
        properties: {
          fileId: row.fileid,
          id: row.id,
          sys_time: row.sys_time,
          mcc: row.mcc,
          mnc: row.mnc,
          lac_tac_sid: row.lac_tac_sid,
          long_cid: row.long_cid
        },
        geometry: JSON.parse(row.geojson)
      }))
    };
    res.status(200).json(geojson);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'An error occurred while retrieving the GeoJSON data'});
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});





