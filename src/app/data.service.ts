import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  // GET SAVED FILES FROM DB and RENDER in HTML
  getDate(): Observable<any> {
    return this.http.get('https://szczepanik.cz:3000/date');
  }

  // /getDataForFile/42e25e6e-82e3-40e3-956d-8b6ed8c477f7
  getDataForFile(fileId: string): Observable<any> {
    return this.http.get('https://szczepanik.cz:3000/getDataForFile/' + fileId);
  }

  openSnackBar(value: string, action: string) {
    this.snackBar.open(value, action, {
      duration: 2000,
    });
  }

}
