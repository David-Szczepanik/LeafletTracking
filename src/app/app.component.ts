import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MapComponent} from "./map/map.component";
import { HttpClientModule} from "@angular/common/http";
import {InfoComponent} from "./info/info.component";
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NavbarComponent} from "./navbar/navbar.component";
import {MatStepperModule} from '@angular/material/stepper';
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {DatabaseComponent} from "./database/database.component";
import {NgIf} from "@angular/common";
import {ChangeTabsService} from "./change-tabs.service";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, MatSnackBarModule, MatFormFieldModule, HttpClientModule, InfoComponent, MatButtonModule, MatDatepickerModule, MatToolbarModule, NavbarComponent, MatStepperModule, FileUploadComponent, DatabaseComponent, NgIf, MatProgressSpinner],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LeafletTracking';

  constructor( protected changeTabsService: ChangeTabsService) {
  }




}

