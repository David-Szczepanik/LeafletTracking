import {Component} from '@angular/core';
import * as Papa from 'papaparse';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ChangeTabsService} from "../change-tabs.service";
import {MarkerService} from "../marker.service";
import {MapService} from "../map.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatIcon,
    MatToolbar,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatButton,
    MatIconButton
  ],
  styleUrls: ['./file-upload.component.css']
})


export class FileUploadComponent {

  get isFileSelected(): boolean {
    return this.file !== null;
  }

  file: File | null = null;
  parsedData: any[] = [];

  constructor(private http: HttpClient, protected changeTabsService: ChangeTabsService, private markerService: MarkerService, private mapService: MapService) {
  }

  onFilechange(event: any) {
    this.file = event.target.files[0];
  }

  async upload() {
    if (this.file) {    //check if file is selected
      await this.parseFile(this.file as File);
      console.log('File Parsed:', this.parsedData)

      this.markerService.makePointsMarkers(this.mapService.map, this.parsedData);
      this.markerService.makeLineMarkers(this.mapService.map, this.parsedData);
    } else {
      alert("Please select a file first");
    }
  }


  parseFile(file: File): Promise<void> {
    return new Promise((resolve) => {
      Papa.parse(file, {
        complete: (results) => {
          this.parsedData = results.data;
          resolve();
        },
        header: true
      });
    })
  }


  async sendData() {
    await this.parseFile(this.file as File);
    const geoJSONData = this.createGeoJSON(this.parsedData);
    console.log('GeoJSON:', geoJSONData)
    this.http.post('http://localhost:3000/data', geoJSONData)
      .subscribe({
        next: (response: any) => {
          console.log('Response from server:', response.message);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }


  createGeoJSON(parsedData: any[]): any {
    const features = parsedData.map((row: any) => ({
      type: "Feature",
      properties: {
        fileid: row.fileid,
        sys_time: row.sys_time,
        mcc: row.mcc,
        mnc: row.mnc,
        lac_tac_sid: row.lac_tac_sid,
        long_cid: row.long_cid,
      },
      geometry: {
        type: "Point",
        coordinates: [row.long, row.lat]
      }
    }));

    return {
      type: "FeatureCollection",
      features: features
    };
  }


  onSubmit() {
    const date = (document.getElementById('date') as HTMLInputElement).value;
    fetch(`http://localhost:3000/data?date=${date}`)
      .then(response => response.json())
      .then(data => {
        // Display the data in your HTML
        // This will depend on how you want to display the data
      });
  }


  protected readonly ChangeTabsService = ChangeTabsService;
}
