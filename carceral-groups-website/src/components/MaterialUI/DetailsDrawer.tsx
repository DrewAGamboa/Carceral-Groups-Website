import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { getGeographicLocationsDocumentTypes } from '../../api/services/MapPointsService';
import GeographicLocation from '../../models/GeographicLocation';
import AccordionOptionDocuments from './AccordionOptionDocuments';
import GeographicDocumentType from '../../models/GeographicDocumentType';

type DetailsDrawerProps = {
  selectedMark?: GeographicLocation;
  onDetailsClose: () => void;
};

export default function DetailsDrawer({ selectedMark: selectedLocation, onDetailsClose }: DetailsDrawerProps) {
  const anchor = 'right'
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedGeographicLocation, setSelectedGeographicLocation] = useState<GeographicLocation | undefined>(undefined);
  const [documentTypes, setDocumentTypes] = useState<GeographicDocumentType[]>([]);

  useEffect(() => {
    if (selectedLocation !== undefined) {
      setIsOpen(true);
      setSelectedGeographicLocation(selectedLocation);

      const fetchData = async () => {
        try {
          const docTypes = await getGeographicLocationsDocumentTypes(selectedLocation);
          setDocumentTypes(docTypes)
        }
        catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }
  }, [selectedLocation]);

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setIsOpen(open);
        onDetailsClose()
      };

  return (
    <>
      <Drawer
        anchor={anchor}
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {selectedGeographicLocation &&
          <>
            <Typography variant="h6">{selectedGeographicLocation.geographicLocationName}</Typography>
            <Box
              sx={{ width: 400 }}
              role="presentation">
              {
                documentTypes.map((docType) => {
                  return <AccordionOptionDocuments key={docType.documentTypeId} docType={docType} geographicLocation={selectedGeographicLocation} />
                })
              }
            </Box>
          </>
        }
      </Drawer>
    </>
  );
}   
