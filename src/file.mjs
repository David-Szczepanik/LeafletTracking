// const fs = require('fs');
// const xml2js = require('xml-js');
// const togeojson = require('@mapbox/togeojson');
// const DOMParser = require('xmldom').DOMParser;
//
// // Read the GPX file
// const gpxData = fs.readFileSync('assets/data/gps-logger/13.gpx', 'utf8');
//
// // Convert the GPX XML data to a DOM
// const parser = new DOMParser();
// const gpxDOM = parser.parseFromString(gpxData, 'text/xml');
//
// // Convert the DOM to GeoJSON
// const geojson = togeojson.gpx(gpxDOM);
//
// // Write the GeoJSON data to a file
// fs.writeFileSync('output.geojson', JSON.stringify(geojson));
