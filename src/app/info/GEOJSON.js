import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  points: string = '/assets/data/11.csv';

  constructor(private http: HttpClient) { }

  sendGeoJSON(): Observable<any> {
    return new Observable(observer => {
      this.http.get(this.points, {responseType: 'text'}).subscribe((csvData: string) => {
        const parsedData = Papa.parse(csvData, {header: true, dynamicTyping: true}).data;

        const geoJSON = {
          type: "FeatureCollection",
          features: []
        };

        for (const row of parsedData) {
          const feature = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [row.long, row.lat]
            },
            properties: row
          };

          geoJSON.features.push(feature);
        }

        observer.next(geoJSON);
        observer.complete();
      });
    });
  }
}



makePointsMarkers(map: L.Map): void {
  this.sendGeoJSON().subscribe((geoJSON: any) => {
    for (const feature of geoJSON.features) {
      const [long, lat] = feature.geometry.coordinates;
      const marker = L.marker([lat, long]);

      marker.bindPopup(this.popupService.makePointPopup(feature.properties));

      marker.on('click', (e) => {
        console.log(e.latlng);

        const pointCoords: L.LatLngExpression = [lat, long];

        // Remove towers after clicking another point
        this.towerMarkers.forEach(marker => {
          map.removeLayer(marker);
        });

        this.loadTower(feature.properties.mnc, feature.properties.mcc, feature.properties.lac_tac_sid, feature.properties.long_cid).subscribe((APIdata: TowerData ) => {
          const towerMarker = L.marker([APIdata.lat, APIdata.lon], {
            icon: towerIcon
          });
          towerMarker.addTo(map);
          towerMarker.bindPopup(this.popupService.makeTowerPopup(APIdata));

          // Remove towers after clicking map
          this.towerMarkers.push(towerMarker);

          if (this.polyline) {
            map.removeLayer(this.polyline);
          }

          const lineCoords: L.LatLngExpression[] = [pointCoords, [APIdata.lat, APIdata.lon]];
          this.polyline = L.polyline(lineCoords, {color: 'black'}).addTo(map);
        });
      });

      // Remove towers after clicking map
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
