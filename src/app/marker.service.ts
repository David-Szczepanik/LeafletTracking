import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as L from 'leaflet';
import { PopupService} from "./popup.service";

import RowData from "./IRowData";
import TowerData from "./ITowerData";

import {Observable} from "rxjs";
import * as Papa from 'papaparse';


//ICON
const towerIcon = L.icon({
  iconUrl: 'assets/signal-tower-icon.svg',
  iconSize: [20, 35], // size of the icon
  iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});



@Injectable({
  providedIn: 'root'
})


export class MarkerService {
  // points: string = '/assets/data/usa-capitals.geojson';
  points: string = '/assets/data/11.csv';

  constructor(
    private http: HttpClient,
    private popupService: PopupService
  ) { }


  private towerMarkers: L.Marker[] = [];
  private polyline: L.Polyline | undefined;

  // static scaledRadius(val: number, maxVal: number): number {
  //   return 20 * (val / maxVal);
  // }

 loadTower(mnc: string, mcc: string, lac: string, lcid: string): Observable<any> {
  const url = `https://opencellid.org/cell/get?key=pk.1ee53d550a26632dcc05d960e5b5b07d&mcc=${mcc}&mnc=${mnc}&lac=${lac}&cellid=${lcid}&format=json`;
   console.log(url);
  return this.http.get(url);
}

  //call this method from MapComponent
  makePointsMarkers(map: L.Map): void {
    this.http.get(this.points, {responseType: 'text'}).subscribe((csvData: string) => {
      const parsedData = Papa.parse(csvData, {header: true, dynamicTyping: true}).data;

      for (const row of parsedData as RowData[]) {
        const mLat = row.lat;
        const mLong = row.long;
        const marker = L.marker([mLat, mLong]);

        marker.bindPopup(this.popupService.makePointPopup(row));

        const mnc = row.mnc;
        const mcc = row.mcc;
        const lac = row.lac_tac_sid;
        const lcid = row.long_cid;


        marker.on('click', (e) => {
          console.log(e.latlng);

         const pointCoords: L.LatLngExpression = [mLat, mLong];

          //Remove towers after clicking another point
          this.towerMarkers.forEach(marker => {
            map.removeLayer(marker);
          });


          this.loadTower(mnc, mcc, lac, lcid).subscribe((APIdata: TowerData ) => {
            const towerMarker = L.marker([APIdata.lat, APIdata.lon], {
              icon: towerIcon
            });
            towerMarker.addTo(map);
            // towerMarker.bindPopup(this.popupService.makeTowerPopup(data));

            towerMarker.bindPopup(this.popupService.makeTowerPopup(APIdata));

            //Remove towers after clicking map
            this.towerMarkers.push(towerMarker);

            if (this.polyline) {
              map.removeLayer(this.polyline);
            }

            const lineCoords: L.LatLngExpression[] = [pointCoords, [APIdata.lat, APIdata.lon]];
            this.polyline = L.polyline(lineCoords, {color: 'black'}).addTo(map);
          });
        });


        //Remove towers after clicking map
        map.on('click', () => {
          this.towerMarkers.forEach(marker => {
            map.removeLayer(marker);
          });
          this.towerMarkers = [];

          if (this.polyline) {
            map.removeLayer(this.polyline);
            this.polyline = undefined
          }
        });

        marker.addTo(map);
      }
    });
  }

  //call this method from MapComponent
  makeLineMarkers(map: L.Map): void {
    this.http.get(this.points, {responseType: 'text'}).subscribe((csvData: string) => {
      const parsedData = Papa.parse(csvData, {header: true, dynamicTyping: true}).data;


      const latLongs = [];
      for (const row of parsedData as RowData[]) {
        const mLat = row.lat;
        const mLong = row.long;
        latLongs.push(L.latLng(mLat, mLong));
        // const marker = L.marker([mLat, mLong]);

        // marker.addTo(map);

        const polyline = L.polyline(latLongs, {color: 'red'}).addTo(map);
        map.fitBounds(polyline.getBounds());
      }
    });
  }

  // makeCapitalCircleMarkers(map: L.Map): void {
  //   this.http.get(this.capitals).subscribe((res: any) => {
  //
  //     const maxPop = Math.max(...res.features.map((x: any) => x.properties.population), 0);
  //
  //     for (const c of res.features) {
  //       const lon = c.geometry.coordinates[0];
  //       const lat = c.geometry.coordinates[1];
  //       const circle = L.circleMarker([lat, lon], {
  //         radius: MarkerService.scaledRadius(c.properties.population, maxPop)});
  //
  //       circle.bindPopup(this.popupService.makeCapitalPopup(c.properties));
  //
  //       circle.addTo(map);
  //     }
  //   });
  // }




}
