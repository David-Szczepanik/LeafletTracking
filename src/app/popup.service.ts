import { Injectable } from '@angular/core';
import { parse, format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makePointPopup(data: any): string {
    let parsedTime = parse(data.sys_time.toString(), "yyyyMMddHHmmss", new Date());
    let formattedTime = format(parsedTime, 'dd.MM.yyyy HH:mm:ss');
    return `` +
      `<div>Time: ${ formattedTime }</div>` +
      `<div>Latitude: ${ data.lat }</div>` +
      `<div>Longitude: ${ data.long }</div>` +
      `<div>Radio Type: ${ data.net_type}</div>`
  }

  makeTowerPopup(APIdata: any): string {
    return `` +
      `<div>Latitude: ${ APIdata.lat}</div>` +
      `<div>Longitude: ${ APIdata.lon}</div>` +
      `<br>` +
      `<div>MCC: ${ APIdata.mcc }</div>` +
      `<div>MNC: ${ APIdata.mnc }</div>` +
      `<div>LAC: ${ APIdata.lac }</div>` +
      `<div>CID: ${ APIdata.cellid} </div>`
  }
}
