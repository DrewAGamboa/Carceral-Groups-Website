/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getFilterOptions, getGeographicLocations } from "../api/services/MapPointsService";
import FiltersResponseFilter from "../models/Filter";
import GeographicLocationFilter from "../models/GeographicLocationFilter";
import GeographicLocation from "../models/GeographicLocation";
// import GeographicLocation from "../models/GeographicLocation";

const useLeafletMap = () => {
  const [selectedGeographicLocation, setSelectedGeographicLocation] = useState<GeographicLocation>()
  const [selectedGeographicLocations, setSelectedGeographicLocations] = useState<GeographicLocation[]>([])
  const [dataGeoJson, setDataGeoJson] = useState<any[]>([])
  const [treeData, setTreeData] = useState<FiltersResponseFilter[]>([]);
  const [selectedGeographicLocationFilters, setSelectedGeographicLocationFilter] = useState<GeographicLocationFilter[]>([]);

  const handleSelectedInstitutions = (geographicLocationFilters: GeographicLocationFilter[]) => {
    setSelectedGeographicLocationFilter(geographicLocationFilters)
  }

  const handleOnMarkerClick = (geographicLocationId: string) => {
    console.log(`GeographicLocation was clicked!`, geographicLocationId)
    const newSelectedGeographicLocation = selectedGeographicLocations.find((location) => location.GeographicLocationId === geographicLocationId)
    setSelectedGeographicLocation(newSelectedGeographicLocation)
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
    setSelectedGeographicLocations(newGeographicLocations)

    const geoJson = newGeographicLocations.map((location) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [location.Latitude, location.Longitude],
        },
        properties: {
          popupContent: location.GeographicLocationName,
          show_on_map: true,
          geographicLocationId: location.GeographicLocationId,
        },
      }
    })
    setDataGeoJson(geoJson)
  }, [selectedGeographicLocationFilters])

  return {
    selectedGeographicLocation,
    dataGeoJson,
    treeData,
    handleCheckboxChange: handleSelectedInstitutions,
    handleOnMarkerClick
  }
}

export default useLeafletMap;