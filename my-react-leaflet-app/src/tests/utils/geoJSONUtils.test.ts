import { convertCoordsStrToCoords, convertRowTogeoJSON } from '../../utils/geoJSONUtils';

// const EXAMPLE = [{
//   'Filter name 1': 'State',
//   'Filter name 2': 'Asian Pacific Islander Cultural Awareness Group (APICAG)',
//   'Document title': '2024.02.19_Ralph Dunuan 1',
//   'Document type': 'mp3',
//   'Geographic location (coordinates)': '47.299723843258185, -123.17403244585927'
// }]

describe('convertRowTogeoJSON', () => {
  test('should convert row to geoJSON correctly', () => {
    const row = {
      'Filter name 1': 'State',
      'Filter name 2': 'Asian Pacific Islander Cultural Awareness Group (APICAG)',
      'Document title': '2024.02.19_Ralph Dunuan 1',
      'Document type': 'mp3',
      'Geographic location (coordinates)': '47.299723843258185, -123.17403244585927'
    };

    const expectedGeoJSON = {
      type: 'Feature',
      properties: {
        'Filter name 1': 'State',
        'Filter name 2': 'Asian Pacific Islander Cultural Awareness Group (APICAG)',
        'Document title': '2024.02.19_Ralph Dunuan 1',
        'Document type': 'mp3',
        'Geographic location (coordinates)': '47.299723843258185, -123.17403244585927',
      },
      geometry: {
        type: 'Point',
        coordinates: [47.299723843258185, -123.17403244585927]
      }
    };

    const result = convertRowTogeoJSON(row);

    expect(result).toEqual(expectedGeoJSON);
  });


});

describe('convertCoordsStrToCoords', () => {
  test('should return default coordinates when geoLocation is empty', () => {
    const geoLocation = '';
    const expectedCoords = {
      latitude: 0,
      longitude: 0,
    };

    const result = convertCoordsStrToCoords(geoLocation);

    expect(result).toEqual(expectedCoords);
  });

  test('should return correct coordinates when geoLocation is provided', () => {
    const geoLocation = '40.7128, -74.0060';
    const expectedCoords = {
      latitude: 40.7128,
      longitude: -74.0060,
    };

    const result = convertCoordsStrToCoords(geoLocation);

    expect(result).toEqual(expectedCoords);
  });
});