import {generateUUID} from "../utils/stringUtils";

class MapPoint {
  private id: string;
  private latlng: number[];

  constructor(
    private filter1: string,
    private filter2: string,
    private documentDisplayTitle: string,
    private fileTitle: string,
    private documentType: string,
    private latlngStr: string,
  ) {
    this.id = generateUUID();
    this.latlng = this.latlngStr.split(',').map((coord) => parseFloat(coord)).reverse()
  }
}

export default MapPoint