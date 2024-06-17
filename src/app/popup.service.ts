import {Injectable} from '@angular/core';
import {parse, format} from 'date-fns';

/**
 * @description Creates popup content for points and towers.
 */
@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() {
  }

  /**
   * @method makePointPopup
   * @description HTML content for a point popup.
   * @param {any} data - The data object containing the point's information.
   * @returns {string} - The HTML content for the point popup.
   */
  public makePointPopup(data: any): string {
    let parsedTime = parse(data.sys_time.toString(), "yyyyMMddHHmmss", new Date());
    let formattedTime = format(parsedTime, 'dd.MM.yyyy HH:mm:ss');
    return `` +
      `<div>Time: ${formattedTime}</div>` +
      `<div>Latitude: ${data.lat}</div>` +
      `<div>Longitude: ${data.long}</div>`
  }

  /**
   * @method makeTowerPopup
   * @description HTML content for a tower popup.
   * @param {any} APIdata - The data object containing the tower's information.
   * @returns {string} - The HTML content for the tower popup.
   */
  makeTowerPopup(APIdata: any): string {
    return `` +
      `<div>Latitude: ${APIdata.lat}</div>` +
      `<div>Longitude: ${APIdata.lon}</div>` +
      `<br>` +
      `<div>MCC: ${APIdata.mcc}</div>` +
      `<div>MNC: ${APIdata.mnc}</div>` +
      `<div>LAC: ${APIdata.lac}</div>` +
      `<div>CID: ${APIdata.cellid} </div>`
  }
}
