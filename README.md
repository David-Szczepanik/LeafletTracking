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
`npm start`   `=>` `http://localhost:4200` <br>
-- -

## TODO
- [x] Function to send mnc, mmc, lac and cid through API to get location of tower
- [x] Make a polyline between point and tower
- [x] Tower ICON
- [ ] Popup for tower
- [ ] Range between point and tower
- [ ] Upload files
- [ ] Database

---
Upload file and select type csv or json
Then it will show the first line and you select lat and long
csv json 
kml gpx

seperate function that takes lon and lat and returns a point
So I can use one function for gpx or csv

Can I get approximate location of a phone using only the cell tower information?

---

```angular2html
npx @angular/cli generate service marker --skip-tests
ng generate c file-upload
```

STANDALONE vs MODULE 
NgModule-based bootstrap
Injectable

fetch is more modern API than XMLHttpRequest
fetch is not producing upload progress events


How to preload data in a resolver
