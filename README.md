# Leaflet Tracking

## Technologies
- Angular
- Leaflet
- OpenStreetMap
- MongoDB `PostGIS`
---
## Install
`npm install`

## Start
`npm start` `=>` http://localhost:4200 <br>
-- -

## TODO
- [x] Take fileId from db -> count how many and based on that generate lines in tab DATABASE
- [x] Quickly rotate between tabs - uploadTab/databaseTab
- [x] Lines are slowing app => render lines after loop is done
- [ ] Render points after loop
- [x] Function to send mnc, mmc, lac and cid through API to get location of tower
- [x] Make a black polyline between point and tower
- [x] Tower ICON
- [x] Popup for tower
- [x] Upload files => DB => toggle between them

Can I get approximate location of a phone using only the cell tower information?

---

## Apps

| App         | Format         |
|-------------|:---------------| 
| Net Monitor | csv, json, kml |
| Cell Signal | csv            |  


1. Upload file -> Parse -> Map / DB
2. DB -> Parse -> Map


