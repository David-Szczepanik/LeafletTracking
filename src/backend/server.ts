import express, {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';

const pgp = require('pg-promise')();
// import cors from 'cors';
const cors = require('cors');

/**
 * @type {express.Application}
 */
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

//  Render
/** Tested */
const db = pgp({
  host: 'dpg-cpars8m3e1ms739uojkg-a.frankfurt-postgres.render.com',
  port: 5432,
  database: 'leaflet',
  user: 'leaflet_user',
  password: 'WzvPALzeUowaMa03aGHI6mDKzXmEP9Hb',
  ssl: {
    rejectUnauthorized: false
  }
});


// app.get('/testDB', async (req: Request, res: Response) => {
//   try {
//     await db.any('SELECT 1');
//     res.status(200).json({message: 'Successfully connected to the database'});
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({message: 'An error occurred while connecting to the database'});
//   }
// });


// parsed file => DB

/**
 * Endpoint to insert GeoJSON data into the database.
 */
export const postData = async (req: Request, res: Response) => {
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
};

app.post('/data', postData);

// data based on fileID => /date
/**
 * This is a comment!!!
 * # This is a comment!!!
 * ## This is a comment 2!!!
 * ## This is a comment 3!!!
 * @module LogoSafeComponent
 */
export const getDate = async (req: Request, res: Response) => {
  const date = req.query.date;
  // const data = await db.any('SELECT DISTINCT fileId, sys_time FROM geojson_data');
  const data = await db.any('SELECT fileId, MIN(sys_time), MAX(sys_time) FROM geojson_data GROUP BY fileId');
  res.json(data);
};

app.get('/date', getDate);


/**
 * Endpoint to retrieve GeoJSON data for a specific file ID.
 * @route GET /getDataForFile/:fileId
 * @group GeoJSON - Operations related to GeoJSON data
 * @param {string} fileId.path.required - The ID of the file
 * @returns {object} 200 - An array of GeoJSON data
 * @returns {Error}  500 - An error message if something goes wrong
 */

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

/**
 * Converts geoJSON into latitude and longitude coordinates
 * @remarks
 * testing remarks tag
 * @param geoJSON
 */
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

//----------------------------------------------------------------------------------------------------------------------


import sgMail from '@sendgrid/mail';

import {config} from "dotenv";

config({path: './src/backend/sendgrid.env'});

config();
sgMail.setApiKey('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');
// console.log("ENV", process.env.SENDGRID_API_KEY);


//
// const msg = {
//   to: 'davidszczepanik@mail.com',
//   from: 'davidszczepanik@mail.com', // Use the email address or domain you verified above
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// //ES6
// sgMail
//   .send(msg)
//   .then(() => {
//   }, error => {
//     console.error(error as any);
//
//     if (error.response) {
//       console.error((error as any).response.body)
//     }
//   });
// //ES8
// (async () => {
//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error(error as any);
//
//     if ((error as any).response) {
//       console.error((error as any).response.body)
//     }
//   }
// })();



app.post('/send-email', async (req, res) => {
  const { to, from, subject, text, html } = req.body;

  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    if ((error as any).response) {
      console.error((error as any).response.body);
    }
    res.status(500).send({ message: 'Failed to send email' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});




