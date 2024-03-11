import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeTabsService {
  public isDatabaseTabActive: boolean = false;

  constructor(private http: HttpClient) { }

  // CHANGE TABS
  databaseTab() {
    this.isDatabaseTabActive = true;
    console.log('Database tab active')
  }

  uploadTab() {
    this.isDatabaseTabActive = false;
    console.log('Upload tab active')
  }



}
