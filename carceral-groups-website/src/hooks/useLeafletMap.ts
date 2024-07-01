/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getFilterOptions, getGeographicLocations } from "../api/services/MapPointsService";
import FiltersResponseFilter from "../models/FiltersResponseFilter";
import GeographicLocationFilter from "../models/GeographicLocationFilter";
import GeographicLocation from "../models/GeographicLocation";
// import GeographicLocation from "../models/GeographicLocation";

const useLeafletMap = () => {
  const [filterOptions, setFilterOptions] = useState<FiltersResponseFilter[]>([]);
  const [selectedGeographicLocationFilters, setSelectedGeographicLocationFilter] = useState<GeographicLocationFilter[]>([]);
  const [selectedGeoJSON, setDataGeoJson] = useState<any[]>([])
  const [selectedGeographicLocation, setSelectedGeographicLocation] = useState<GeographicLocation>()
  const [selectedGeographicLocations, setSelectedGeographicLocations] = useState<GeographicLocation[]>([])

  const handleSelectedInstitutions = (geographicLocationFilters: GeographicLocationFilter[]) => {
    setSelectedGeographicLocationFilter(geographicLocationFilters)
  }

  const handleOnGeographicLocationClick = (geographicLocationId: string) => {
    console.log(`GeographicLocation was clicked!`, geographicLocationId)
    const parsedId = parseInt(geographicLocationId)
    const newSelectedGeographicLocation = selectedGeographicLocations.find((location) => location.geographicLocationId === parsedId)
    setSelectedGeographicLocation(newSelectedGeographicLocation)
  }

  const handleOnDetailsClose = () => {
    setSelectedGeographicLocation(undefined)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterOptions = await getFilterOptions()
        setFilterOptions(filterOptions);

        // set selected filters to all and pull markers in
        const newSelectedGeographicLocationFilters: GeographicLocationFilter[] = []
        filterOptions.forEach((category) => {
          if (!category.institutions) { // if no institutions, skip
            return
          }
          category.institutions.forEach((institution) => {
            newSelectedGeographicLocationFilters.push({ CategoryId: category.categoryId, InstitutionId: institution.institutionId, Category: category.category, Institution: institution.institution })
          })
        });
        setSelectedGeographicLocationFilter(newSelectedGeographicLocationFilters)
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    // Used to update markers shown on map when filters are changed
    const fetchData = async () => {
      try {
        const newGeographicLocations = await getGeographicLocations(selectedGeographicLocationFilters);
        setSelectedGeographicLocations(newGeographicLocations)

        const newGeoJSON = newGeographicLocations.map((location) => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [location.longitude, location.latitude],
            },
            properties: {
              popupContent: location.geographicLocationName,
              show_on_map: true,
              geographicLocationId: location.geographicLocationId,
              color: location.color || '#f03',
            },
          }
        })
        setDataGeoJson(newGeoJSON)
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();

  }, [selectedGeographicLocationFilters])

  return {
    selectedGeographicLocation,
    selectedGeoJSON,
    filterOptions,
    handleSelectedInstitutions,
    handleOnGeographicLocationClick,
    handleOnDetailsClose
  }
}

export default useLeafletMap;