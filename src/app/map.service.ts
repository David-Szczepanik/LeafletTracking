import {Injectable} from '@angular/core';
import * as L from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() {
  }


  public map!: L.Map;

  public initMap(): void {
    this.map = L.map('map', {
      center: [49.8282, 18.2695],
      zoom: 7,
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 7,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }


}
