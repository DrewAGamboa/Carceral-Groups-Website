import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { getGeographicLocationsDocumentTypes } from '../../api/services/MapPointsService';
import GeographicLocation from '../../models/GeographicLocation';
import AccordionOptionDocuments from './AccordionOptionDocuments';

type DetailsDrawerProps = {
  selectedMark?: GeographicLocation;
};

export default function DetailsDrawer({ selectedMark: selectedLocation }: DetailsDrawerProps) {
  const anchor = 'right'
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedGeographicLocation, setSelectedGeographicLocation] = useState<GeographicLocation | undefined>(undefined);
  const [documentTypes, setDocumentTypes] = useState<string[]>([]);

  useEffect(() => {
    if (selectedLocation !== undefined) {
      setIsOpen(true);
      setSelectedGeographicLocation(selectedLocation);
      const docTypes = getGeographicLocationsDocumentTypes(selectedLocation);
      setDocumentTypes(docTypes)
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
            <Typography variant="h6">{selectedGeographicLocation.GeographicLocationName}</Typography>
            <Box
              sx={{ width: 400 }}
              role="presentation">
              {
                documentTypes.map((docType) => {
                  return <AccordionOptionDocuments docType={docType} geographicLocation={selectedGeographicLocation} />
                })
              }
            </Box>
          </>
        }
      </Drawer>
    </>
  );
}   
