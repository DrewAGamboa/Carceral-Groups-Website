import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import DocumentDialog from './DocumentDialog';
import MapPoint from '../../models/MapPoint';
import { getCarceralDocumentsByType } from '../../api/services/MapPointsService';

type DetailsDrawerProps = {
  selectedMark?: MapPoint[];
};

export default function DetailsDrawer({ selectedMark }: DetailsDrawerProps) {
  const anchor = 'right'
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  useEffect(() => {
    if (selectedMark !== undefined) {
      setIsOpen(true);
    }
  }, [selectedMark]);

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

  const docTypeAccordions = getCarceralDocumentsByType().map((docType, index) => (
    <Accordion key={index}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>{docType.type}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {docType.docs.map((doc, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>{doc.documentDisplayTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DocumentDialog document_id={doc.id}/>
            </AccordionDetails>
          </Accordion>
        ))
        }
      </AccordionDetails>
    </Accordion>
  ));

  const list = () => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
        {docTypeAccordions}
    </Box>
  );

  return (
    <>
      <Drawer
        anchor={anchor}
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </>
  );
}   