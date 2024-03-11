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
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataService} from "../data.service";
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatIcon,
    MatFormFieldModule,
    MatToolbar,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatButton,
    MatIconButton,
    MatFormField,
    MatInput,
    MatProgressSpinner,
    NgIf
  ],
  styleUrls: ['./file-upload.component.css']
})


export class FileUploadComponent {
  fileName: string = "";

  isLoading = false;

  get isFileSelected(): boolean {
    return this.file !== null;
  }

  file: File | null = null;
  parsedData: any[] = [];

  constructor(private http: HttpClient,private snackBar: MatSnackBar, protected changeTabsService: ChangeTabsService, private markerService: MarkerService, private mapService: MapService, private dataService: DataService) {
  }

 onFilechange(event: any) {
  if (event.target.files && event.target.files.length) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
    }

}}

  async upload() {
    if (this.file) {    //check if file is selected
      this.isLoading = true;
      await this.parseFile(this.file as File);
      // console.log('File Parsed:', this.parsedData)

      this.markerService.makePointsMarkers(this.mapService.map, this.parsedData);
      this.markerService.makeLineMarkers(this.mapService.map, this.parsedData);

      this.isLoading = false;
      this.dataService.openSnackBar('File parsed', 'Success');
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
    this.isLoading = true;
    await this.parseFile(this.file as File);
    const geoJSONData = this.createGeoJSON(this.parsedData);
    console.log('GeoJSON:', geoJSONData)
    this.http.post('http://localhost:3000/data', geoJSONData)
      .subscribe({
        next: (response: any) => {
          console.log('Response from server:', response.message);
          this.isLoading = false;
          this.dataService.openSnackBar('Data sent to database', 'Success');
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

  protected readonly ChangeTabsService = ChangeTabsService;


}
