import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';
import CarceralDocument from '../../models/CarceralDocument';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import FormDialog from './FormDialog';

type DetailsDrawerProps = {
  selectedMark?: CarceralDocument[];
};

export default function DetailsDrawer({ selectedMark }: DetailsDrawerProps) {
  const anchor = 'right';
  const [state, setState] = React.useState({
    right: false,
  });

  useEffect(() => {
    if (selectedMark !== undefined) {
      setState({ right: true });
    }
  }, [selectedMark]);

  const toggleDrawer =
    (anchor: string, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const docTypeAccordions = CarceralDocument.getCarceralDocumentsByType(selectedMark || []).map((docType, index) => (
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
              <Typography>{doc.getTitle()}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormDialog />
            </AccordionDetails>
          </Accordion>
        ))
        }
      </AccordionDetails>
    </Accordion>
  ));

  const list = (anchor: string) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="">
        {docTypeAccordions}
      </div>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </>
  );
}   