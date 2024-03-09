import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {ChangeTabsService} from "../change-tabs.service";

@Component({
  selector: 'app-database',
  standalone: true,
  imports: [
    MatToolbar,
    MatButtonToggle,
    MatIcon,
    MatButtonToggleGroup,
    MatButton,
  ],
  templateUrl: './database.component.html',
  styleUrl: './database.component.css'
})
export class DatabaseComponent {

  constructor(protected changeTabsService: ChangeTabsService) {
  }

  private isDatabaseTabActive: boolean = false;





  onFilechange($event: Event) {

  }

  upload() {

  }
}
