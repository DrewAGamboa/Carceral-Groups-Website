/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import MapPoint from "../models/MapPoint";
import { getAllMapPoints, getFilterOptions, getUniqueGeoJsonPreppedPoints } from "../api/services/MapPointsService";
import Filter from "../models/Filter";
import GeographicLocationFilter from "../models/GeographicLocationFilter";

const useLeafletMap = () => {
  const [selectedMarker, setSelectedMarker] = useState<MapPoint[]>()
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

    // TODO: replace with api call
    const uniqueGeoJsonPreppedData = getUniqueGeoJsonPreppedPoints();
    const newGeoJson = uniqueGeoJsonPreppedData.map((feature) => {
      const show_on_map = selectedGeographicLocationFilters.find((option) => option.Institution === feature.properties.group) ? true : false
      return {
        ...feature,
        properties: {
          ...feature.properties,
          show_on_map
        }
      }
    })
    setDataGeoJson(newGeoJson)
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