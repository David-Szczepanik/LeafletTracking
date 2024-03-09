import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeTabsService {
  public isDatabaseTabActive: boolean = false;

  constructor() { }

  databaseTab() {
    this.isDatabaseTabActive = true;
    console.log('Database tab active')
  }

  uploadTab() {
    this.isDatabaseTabActive = false;
    console.log('Upload tab active')
  }
}
