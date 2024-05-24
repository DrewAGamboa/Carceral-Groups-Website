/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import MapPoint from "../models/MapPoint";
import { getAllMapPoints, getFilterOptions, getGeographicLocations } from "../api/services/MapPointsService";
import Filter from "../models/Filter";
import GeographicLocationFilter from "../models/GeographicLocationFilter";
import GeographicLocation from "../models/GeographicLocation";
// import GeographicLocation from "../models/GeographicLocation";

const useLeafletMap = () => {
  const [selectedMarker, setSelectedMarker] = useState<MapPoint[]>()
  // const [selectedGeographicLocation, setSelectedGeographicLocation] = useState<GeographicLocation>()
  const [dataGeoJson, setDataGeoJson] = useState<any[]>([])
  const [treeData, setTreeData] = useState<Filter[]>([]);
  const [selectedGeographicLocationFilters, setSelectedGeographicLocationFilter] = useState<GeographicLocationFilter[]>([]);
  const [documents, setDocuments] = useState<MapPoint[]>([])

  const handleSelectedInstitutions = (geographicLocationFilters: GeographicLocationFilter[]) => {
    setSelectedGeographicLocationFilter(geographicLocationFilters)
  }

  const handleOnMarkerClick = (latlng: string | undefined) => {
    console.log(`Map was clicked at ${latlng}}!`)
    const filtered = documents.filter((doc) => doc.latlngStr === latlng)
    setSelectedMarker(filtered)
  }

  useEffect(() => {
    // Used to populate the filter options and set the initial selected filters

    // TODO: replace with api call
    const filterOptions = getFilterOptions()
    setTreeData(filterOptions);

    // set selected filters to all and pull markers in
    const newSelectedGeographicLocationFilters: GeographicLocationFilter[] = []
    filterOptions.forEach((category) => {
      if (!category.Institutions) {
        return
      }
      category.Institutions.forEach((institution) => {
        newSelectedGeographicLocationFilters.push({ Category: category.Category, Institution: institution })
      })
    });
    setSelectedGeographicLocationFilter(newSelectedGeographicLocationFilters)
  }, [])

  useEffect(() => {
    // Used to update markers shown on map when filters are changed

    const newGeographicLocations = getGeographicLocations(selectedGeographicLocationFilters);
    const geoJson = newGeographicLocations.map((location) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [location.geographicLocationLat, location.geographicLocationLong],
        },
        properties: {
          popupContent: location.geographicLocationName,
          show_on_map: true,
          
        },
      }
    })
    setDataGeoJson(geoJson)
  }, [selectedGeographicLocationFilters])

  useEffect(() => {
    const documents = getAllMapPoints();
    setDocuments(documents);
  }, [])

  return {
    selectedMarker,
    dataGeoJson,
    treeData,
    documents,
    handleCheckboxChange: handleSelectedInstitutions,
    handleOnMarkerClick
  }
}

export default useLeafletMap;