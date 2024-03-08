import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapComponent} from "./map/map.component";
import {HttpClientModule} from "@angular/common/http";
import {InfoComponent} from "./info/info.component";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MatSlideToggleModule} from '@angular/material/slide-toggle';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, HttpClientModule, InfoComponent, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LeafletTracking';
}
