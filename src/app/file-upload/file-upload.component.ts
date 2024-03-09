import { Component } from '@angular/core';
import { MarkerService } from "../marker.service";
import * as Papa from 'papaparse';
import RowData from "../IRowData";

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent {
  constructor(private markerService: MarkerService) { }

  file: File | null = null;
  points: any [] = [];

  onFileSelect(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = (element.files as FileList)[0];
    this.markerService.setFile(this.file);
  }

// setFile(file: File) {
//   Papa.parse(file, {
//     complete: (results) => {
//       this.points = results.data;
//       this.markerService.setPoints(this.points);
//     }
//   });
// }

  // onSubmit() {
  //   if (!this.file) {
  //     return;
  //   }
  //
  //   this.setFile(this.file);
  // }


  setFile(file: File) {
    Papa.parse(file, {
      complete: (results) => {
        this.points = results.data;
        this.points.forEach((row: RowData) => {
          const mLat = row.lat;
          const mLong = row.long;
          const pointCoords: [number, number] = [mLat, mLong];
          this.markerService.makePointsMarkers(pointCoords);
        });
      }
    });
  }


}
