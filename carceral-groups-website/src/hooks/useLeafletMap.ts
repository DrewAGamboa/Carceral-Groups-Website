/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import MapPoint from "../models/MapPoint";
import { getAllMapPoints, getFilterOptions, getUniqueGeoJsonPreppedPoints } from "../api/services/MapPointsService";

const useLeafletMap = () => {
    const [selectedMarker, setSelectedMarker] = useState<MapPoint[]>()
    const [dataGeoJson, setDataGeoJson] = useState<any[]>([])
    const [treeData, setTreeData] = useState<{label: string, checked:boolean, children: any[]}>({ label: 'All', checked: true, children: [] });
    const [documents, setDocuments] = useState<MapPoint[]>([])

    const handleCheckboxChange = (updatedTreeData: { label: string, checked: boolean, children: any[] }) => {
        console.log('Updated Tree Data:', updatedTreeData)
        setTreeData(updatedTreeData)
        // get all options
        let queue = [updatedTreeData]
        const allOptions: any[] = []
    
        while (queue.length > 0) {
          const current = queue.shift()
          allOptions.push(current)
          if (current && current.children.length > 0)
            queue = queue.concat(current.children)
        }
        console.log(allOptions)
    
        // update geojson show on map
        const newGeoJson = dataGeoJson.map((feature) => {
          const show_on_map = allOptions.find((option) => option?.label === feature.properties.group)?.checked
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
        const documents = getAllMapPoints();
        const uniqueGeoJsonPreppedData = getUniqueGeoJsonPreppedPoints();
        const filterOptions = getFilterOptions()
        setDataGeoJson(uniqueGeoJsonPreppedData);
        setTreeData(filterOptions);
        setDocuments(documents);
      }, [setDocuments, setTreeData, setDataGeoJson])

    return {
        selectedMarker,
        dataGeoJson,
        treeData,
        documents,
        handleCheckboxChange,
        handleOnMarkerClick
    }
}

export default useLeafletMap;