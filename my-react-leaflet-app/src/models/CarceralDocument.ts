import DataRow from "./DataRow";
import {generateUUID} from "../utils/stringUtils";
import { GetLocationLabel } from "./Location";

export default class CarceralDocument {
    // Properties
    private id: string;
    private title: string;
    private docType: string;
    private createdAt: Date;
    private group: string;
    private parentGroup: string;
    private latlngStr: string;
    private latlng: number[];

    // Constructor
    constructor(id: string, title: string, docType: string, group: string, parentGroup: string, latlngStr: string, latlng: number[], createdAt: Date = new Date()) {
        this.id = id;
        this.title = title;
        this.docType = docType;
        this.group = group;
        this.parentGroup = parentGroup;
        this.latlngStr = latlngStr;
        this.latlng = latlng;
        this.createdAt = createdAt;
    }

    static fromDataRow(dataRow: DataRow) {
        return new CarceralDocument(
            generateUUID(),
            dataRow['Document title'],
            dataRow['Document type'],
            dataRow['Filter name 2'],
            dataRow['Filter name 1'],
            dataRow['Geographic location (coordinates)'],
            dataRow['Geographic location (coordinates)'].split(',').map((coord) => parseFloat(coord)).reverse(),
            new Date(dataRow['createdAt'])
        );
    }

    static uniquePoints(docs: CarceralDocument[])
    {
        const uniqueObjects = docs.reduce((uniqueArr: CarceralDocument[], currentObj: CarceralDocument) => {
            const isDuplicate = uniqueArr.some((obj) => obj.getUniqueGroupPoint() === currentObj.getUniqueGroupPoint());
            if (!isDuplicate) {
                uniqueArr.push(currentObj);
            }
            return uniqueArr;
        }, []);
        return uniqueObjects;
    }

    static uniqueGroups(docs: CarceralDocument[])
    {
        const uniqueObjects = docs.reduce((uniqueArr: CarceralDocument[], currentObj: CarceralDocument) => {
            const isDuplicate = uniqueArr.some((obj) => obj.group === currentObj.group && obj.parentGroup === currentObj.parentGroup);
            if (!isDuplicate) {
                uniqueArr.push(currentObj);
            }
            return uniqueArr;
        }, []);
        return uniqueObjects;
    }

    static uniqueGeoJsonPreppedPoints(docs: CarceralDocument[])
    {
        const uniquePoints = CarceralDocument.uniquePoints(docs);
        return uniquePoints.map((doc) => doc.toGeoJson());
    }

    static uniqueDocumentTypes(docs: CarceralDocument[])
    {
        const uniqueObjects = docs.reduce((uniqueArr: CarceralDocument[], currentObj: CarceralDocument) => {
            const isDuplicate = uniqueArr.some((obj) => obj.docType === currentObj.docType);
            if (!isDuplicate) {
                uniqueArr.push(currentObj);
            }
            return uniqueArr;
        }, []);
        return uniqueObjects;
    }

    static getCarceralDocumentsByType(docs: CarceralDocument[])
    {
        const uniqueTypes = CarceralDocument.uniqueDocumentTypes(docs);
        const docsByType = uniqueTypes.map((type) => {
            return {
                type: type.docType,
                docs: docs.filter((doc) => doc.docType === type.docType)
            }
        });
        return docsByType;
    }

    static filterOptions(docs: CarceralDocument[])
    {
        let filter: {label: string, checked: boolean, children: any[]} = {
            label: 'All',
            checked: true,
            children: []
        }
        const uniqueGroups = CarceralDocument.uniqueGroups(docs);
        uniqueGroups.forEach(cur => {
            const parentGroup = cur.parentGroup;
            const subGroup = cur.group;
            const foundParentGroup = filter.children.find((group) => group.label === parentGroup);
            if (foundParentGroup) {
                foundParentGroup.children.push({
                    label: subGroup,
                    checked: true,
                    children: []
                });
            }
            else{
                const parentFilter =  {
                    label: parentGroup,
                    checked: true,
                    children: [
                        {
                            label: subGroup,
                            checked: true,
                            children: []
                        }
                    ]
                }
                filter.children.push(parentFilter);
            }
        });
        return filter;
    }

    // Methods
    public getUniqueGroupPoint(): string {
        return this.group + this.latlngStr;
    }

    public getId(): string {
        return this.id;
    }


    public getTitle(): string {
        return this.title;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getLatLngStr(): string {
        return this.latlngStr;
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