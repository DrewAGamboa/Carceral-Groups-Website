
type Feature = {
    type: string;
    geometry: {
        type: string;
        coordinates: number[];
    };
    properties: any;
};

export const convertRowsToGeoJSON = (rows: any[]) =>
{
    let geoJSON: {type: string, features: Feature[]} = {
        type: 'FeatureCollection',
        features: [],
    };
    
    rows.forEach((row) => {
        geoJSON.features.push(convertRowTogeoJSON(row));
    });
    
    return geoJSON;
}

export const convertRowTogeoJSON = (obj: any) => 
{
    let geoJSON: Feature = {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [0, 0],
        },
        properties: {},
    };
    
    if (obj['Geographic location (coordinates)']) {
        const { latitude, longitude } = convertCoordsStrToCoords(obj['Geographic location (coordinates)']);
        geoJSON.geometry.coordinates = [latitude, longitude];
    }
    
    geoJSON.properties = obj;
    
    return geoJSON;
}

export const convertCoordsStrToCoords = (geoLocation: string) => 
{
    let coords = {
        latitude: 0,
        longitude: 0,
    };
    
    if (geoLocation) {
        const [latitude, longitude] = geoLocation.split(',');
        coords = {longitude: parseFloat(longitude), latitude: parseFloat(latitude)};
    }
    
    return coords;
}