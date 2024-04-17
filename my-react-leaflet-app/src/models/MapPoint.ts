import {generateUUID} from "../utils/stringUtils";
import { GetLocationLabel } from "./Location";

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

  public toGeoJson() {   
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: this.latlng,
        },
        properties: {
            group: this.group,
            parentGroup: this.parentGroup,
            popupContent: GetLocationLabel(this.latlngStr),
            show_on_map: true,
        },
    }
  }
}

export default MapPoint