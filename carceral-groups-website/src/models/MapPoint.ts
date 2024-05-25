import {generateUUID} from "../utils/stringUtils";

class MapPoint {
  readonly id: string;
  readonly latlng: number[];
  readonly uniqueGroupPoint: string;

  constructor(
    readonly parentGroup: string,
    readonly group: string,
    readonly documentDisplayTitle: string,
    readonly fileTitle: string,
    readonly documentType: string,
    readonly latlngStr: string,
  ) {
    this.id = generateUUID();
    this.latlng = this.latlngStr.split(',').map((coord) => parseFloat(coord)).reverse();
    this.uniqueGroupPoint = this.group + this.latlngStr;
  }
}

export default MapPoint