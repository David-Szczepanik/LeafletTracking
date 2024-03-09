import {Component} from '@angular/core';
import * as Papa from 'papaparse';
import {HttpClient} from '@angular/common/http';
import RowData from "../IRowData";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ChangeTabsService} from "../change-tabs.service";

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

  selectedDate: string | undefined;


  file: File | null = null;
  parsedData: any[] = [];

  constructor(private http: HttpClient, protected changeTabsService: ChangeTabsService) {
  }

  onFilechange(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    if (this.file) {    //check if file is selected
      this.parseFile(this.file);
    } else {
      alert("Please select a file first");
    }
  }


  parseFile(file: File) {
    Papa.parse(file, {
      complete: (results) => {
        this.parsedData = results.data;
        // console.log('File Parsed:', this.parsedData)
        this.sendData(this.parsedData);
      },
      header: true
    });
  }


  sendData(data: any) {
    const geoJSONData = this.createGeoJSON(data);
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
        sys_time: row.sys_time,
        mcc: row.mcc,
        mnc: row.mnc,
        lac_tac_sid: row.lac_tac_sid,
        long_cid: row.long_cid
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
