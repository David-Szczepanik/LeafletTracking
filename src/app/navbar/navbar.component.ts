import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import { MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButton,
    MatButtonModule,
    MatToolbar,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
