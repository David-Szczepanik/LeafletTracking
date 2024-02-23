import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapComponent} from "./map/map.component";
import {HttpClientModule} from "@angular/common/http";
import {AppInfoComponent} from "./app-info/app-info.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, HttpClientModule, AppInfoComponent,FileUploadComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LeafletTracking';
}
