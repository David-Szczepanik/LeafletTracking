import {Component, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {ChangeTabsService} from "../change-tabs.service";
import {DataService} from "../data.service";
import {NgForOf} from "@angular/common";
import {MarkerService} from "../marker.service";
import {MapService} from "../map.service";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {format, parse} from "date-fns";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-database',
  standalone: true,
  imports: [
    MatToolbar,
    MatButtonToggle,
    MatIcon,
    MatButtonToggleGroup,
    MatButton,
    NgForOf,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatPaginator,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatRadioButton,
    MatRadioGroup,
    MatFormField,
    MatInput,
  ],
  templateUrl: './database.component.html',
  styleUrl: './database.component.css'
})


export class DatabaseComponent implements OnInit {

  parsedData: any[] = [];

  displayedColumns: string[] = ['select', 'dateFrom', 'dateTo'];

  constructor(protected changeTabsService: ChangeTabsService, private dataService: DataService, private markerService: MarkerService, private mapService: MapService) {
  }

//  PICKED FILE FROM HTML DATABASE
  selectRow(row: any) {
    console.log("Selected row:", row);
    // this.markerService.clearMarkers(this.mapService.map);


    this.dataService.getDataForFile(row.fileid).subscribe(response => {
      console.log("Response from server:", response);
      this.markerService.makePointsMarkers(this.mapService.map, response);
      this.markerService.makeLineMarkers(this.mapService.map, response);

      this.dataService.openSnackBar('ID: ' + row.fileid, 'Success');
      // this.markerService.setPoints(JSON.stringify(response));
      // console.log("POINTS:", this.markerService.points);
    });


  }
// convertGeoJSONToArray(geoJSON: any): any[] {
//   const array = geoJSON.features.map((feature: any) => {
//     return {
//       properties: feature.properties,
//       coordinates: feature.geometry.coordinates
//     };
//   });
//
//   return array;
// }



  data: any;
  ngOnInit(): void {
    this.dataService.getDate().subscribe(response => {
      this.data = response;


      // console.log every fileid
      // this.data.forEach((item: { fileid: any; }) => {
      //   console.log("fileId:", item.fileid);
      // })


    })
  }


  parseTime(time: string) {
    let parsedTime = parse(time, "yyyyMMddHHmmss", new Date());
    return format(parsedTime, 'dd.MM.yyyy HH:mm:ss');
  }

}
