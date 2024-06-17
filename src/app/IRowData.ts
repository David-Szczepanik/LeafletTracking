/**
 * IRowData is an interface for Leaflet Trackingapp.
 * It defines the structure of the row data in the application.
 */
export default interface RowData {
  /**
   * The system time when the data was recorded.
   */
  sys_time: string;

  /**
   * The latitude of the location in the tracking app.
   */
  lat: number;

  /**
   * The longitude of the location in the tracking app.
   */
  long: number;

  /**
   * Mobile Country Code, unique identifier for the country of the mobile subscriber.
   */
  mcc: string;

  /**
   * Mobile Network Code, unique identifier for the home network of the mobile subscriber.
   */
  mnc: string;

  /**
   * Location Area Code or Tracking Area Code or System Identifier.
   */
  lac_tac_sid: string;

  /**
   * Long Cell Identifier.
   */
  long_cid: string;
}
