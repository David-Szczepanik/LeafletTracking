import {Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatButton} from "@angular/material/button";
import {MapService} from "../map.service";

const iconUrl = 'assets/marker-icon.png';
const iconDefault = L.icon({
  iconUrl,
  iconSize: [20, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    MatSlideToggle,
    MatButton
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {


  constructor(
    private mapService: MapService
  ) {
  }

  ngAfterViewInit(): void {
    this.mapService.initMap();
  }
}
