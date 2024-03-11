# Leaflet Tracking

## Technologies

- Angular
- Leaflet
- OpenStreetMap
- MongoDB `plugin`

---

## Install

`npm install` <br>

## Start

`npm start` `=>` http://localhost:4200 <br>
-- -

## TODO
- [x] Lines are slowing app => render lines after loop is done
- [ ] Render points after loop
- [ ] Take fileId from db -> count how many and based on that generate lines in tab DATABASE
-  [ ] Quickly rotate between tabs - uploadTab/databaseTab

- [ ] [Stepper](https://material.angular.io/components/stepper/overview#stepper-vertical) upload file -> 

- [x] Function to send mnc, mmc, lac and cid through API to get location of tower
- [x] Make a polyline between point and tower
- [x] Tower ICON
- [ ] Popup for tower
- [ ] Range between point and tower
- [ ] Parse files
- [ ] Database

- [ ] Upload files, toggle between them

Can I get approximate location of a phone using only the cell tower information?

---

```angular2html
npx @angular/cli generate service marker --skip-tests
```

STANDALONE vs MODULE
NgModule-based bootstrap
Injectable

fetch is more modern API than XMLHttpRequest
fetch is not producing upload progress events

How to preload data in a resolver

## Apps

| App         | Format         |
|-------------|:---------------| 
| Net Monitor | csv, json, kml |
| Cell Signal | csv            |  

Tower Info

1. Upload file -> DB -> Parse -> Map
2. Parse -> Map -> DB


