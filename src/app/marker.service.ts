import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as L from 'leaflet';
import {PopupService} from "./popup.service";
import RowData from "./IRowData";
import TowerData from "./ITowerData";
import {Observable} from "rxjs";


//ICON
const towerIcon = L.icon({
  iconUrl: 'assets/signal-tower-icon.svg',
  iconSize: [20, 35], // size of the icon
  iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

/**
 * The MarkerService class provides methods to manage markers and polylines on a Leaflet map.
 * It includes methods to clear markers and polylines, load tower data from an API, and create markers for points and lines.
 */
@Injectable({
  providedIn: 'root'
})


export class MarkerService {

  /**
   * Constructs a new instance of the MarkerService class.
   * @param http - The HttpClient used to make HTTP requests.
   * @param popupService - The PopupService used to create popups for markers.
   */
  constructor(
    private http: HttpClient,
    private popupService: PopupService
  ) {
  }

  private towerMarkers: L.Marker[] = [];
  private polyline: L.Polyline | undefined;


  // --- CLEAR MARKERS AND POLYLINES ---
  /**
   * Clears all polylines from the map.
   * @param map - Map to remove polylines from.
   */
  clearPolylines(map: L.Map): void {
    map.eachLayer((layer) => {
      if (layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });
  }

  /**
   * Clears all markers from the map.
   * @param map - Map to remove polylines from.
   */
  clearMarkers(map: L.Map): void {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  }


  /**
   * Fetches tower data from the [OpenCellID API](https://wiki.opencellid.org/wiki/API).
   * @param mnc - The mobile network code.
   * @param mcc - The mobile country code.
   * @param lac - The location area code.
   * @param lcid - The local cell ID.
   *
   * @returns An Observable that will emit the API response.
   */
  loadTower(mnc: string, mcc: string, lac: string, lcid: string): Observable<any> {
    const url = `https://opencellid.org/cell/get?key=pk.1ee53d550a26632dcc05d960e5b5b07d&mcc=${mcc}&mnc=${mnc}&lac=${lac}&cellid=${lcid}&format=json`;
    console.log(url);
    return this.http.get(url);
  }

  // setPoints(data: string) {
  //   this.points = data;
  //   // console.log(this.points)
  // }

  //call this method from MapComponent
  makePointsMarkers(map: L.Map, geoJSON: any): void {
    this.clearMarkers(map);

    // const parsedData = JSON.parse(this.points);
    // console.log("parsed", parsedData);
    // console.log("row of parsedData", parsedData[0])

    try {
      for (const row of geoJSON as RowData[]) {
        const mLat = row.lat;
        const mLong = row.long;
        const marker = L.marker([mLat, mLong]);


        marker.bindPopup(this.popupService.makePointPopup(row));

        const mnc = row.mnc;
        const mcc = row.mcc;
        const lac = row.lac_tac_sid;
        const lcid = row.long_cid;

        /**
         * Event listener for marker click.
         * Calls loadTower method to fetch data from the [OpenCellID API](https://wiki.opencellid.org/wiki/API).
         * Creates new marker on the map at the location specified by the API data.
         * The new marker is added to the map with a popup containing the API data.
         */
        marker.on('click', () => {

          const pointCoords: L.LatLngExpression = [mLat, mLong];

          //Remove towers after clicking another point
          this.towerMarkers.forEach(marker => {
            map.removeLayer(marker);
          });


          this.loadTower(mnc, mcc, lac, lcid).subscribe((APIdata: TowerData) => {
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
        // CLICK ON MARKER <--
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
    } catch (error) {
      console.error("Error in makePointsMarkers", error);
    }
  }


//call this method from MapComponent
  makeLineMarkers(map: L.Map, geoJSON: any): void {

    this.clearPolylines(map);

    const latLongs = [];
    for (const row of geoJSON as RowData[]) {
      const mLat = row.lat;
      const mLong = row.long;
      latLongs.push(L.latLng(mLat, mLong));
    }

    const polyline = L.polyline(latLongs, {color: 'red'});
    polyline.addTo(map);
    map.fitBounds(polyline.getBounds());
  }
}


