export default interface TowerData {
  lat: number;
  lon: number;
  mcc: number;
  mnc: number;
  lac: number;
  net_type: string;
  cellid: number;
  averageSignalStrength: number;
  range: number;
  samples: number;
  changeable: number;
  radio: string;
  rnc: number;
  cid: number;
  tac: number;
  sid: number;
  nid: number;
  bid: number;
  message: string;
}
