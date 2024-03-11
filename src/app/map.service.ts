import { Injectable } from '@angular/core';
import * as L from "leaflet";
import {MarkerService} from "./marker.service";
import {ShapeService} from "./shape.service";
import {HttpClient} from "@angular/common/http";
import {LeafletMouseEvent} from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private markerService: MarkerService,
    private shapeService: ShapeService,
    private http: HttpClient,
  ) { }





  private highlightFeature(e: LeafletMouseEvent) {
    const layer = e.target;

    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042'
    });
  }

  private resetFeature(e: LeafletMouseEvent) {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B'
    });
  }





  public map!: L.Map; // | undefined;
  private states: any; // array or not

  public initMap(): void {
    this.map = L.map('map', {
      center: [ 49.8282, 18.2695 ],
      zoom: 7
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 7,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    // tiles.bringToBack();
  }


}
