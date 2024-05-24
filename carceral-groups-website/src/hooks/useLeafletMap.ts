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
        console.log('Updated Tree Data:', geographicLocationFilters)
        setSelectedGeographicLocationFilter(geographicLocationFilters)
    
        // update geojson show on map
        // TODO: this should be handled in a use effect to call the api
        const newGeoJson = dataGeoJson.map((feature) => {
          const show_on_map = geographicLocationFilters.find((option) => option.Institution === feature.properties.group) ? true : false
          return {
            ...feature,
            properties: {
              ...feature.properties,
              show_on_map
            }
          }
        })
        setDataGeoJson(newGeoJson)
      }

    const handleOnMarkerClick = (latlng: string | undefined) => {
        console.log(`Map was clicked at ${latlng}}!`)
        const filtered = documents.filter((doc) => doc.latlngStr === latlng)
        setSelectedMarker(filtered)
    }

    useEffect(() => {
        const filterOptions = getFilterOptions()
        const documents = getAllMapPoints();
        const uniqueGeoJsonPreppedData = getUniqueGeoJsonPreppedPoints();
        setDataGeoJson(uniqueGeoJsonPreppedData);
        setTreeData(filterOptions);
        setDocuments(documents);
      }, [setDocuments, setTreeData, setDataGeoJson])

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