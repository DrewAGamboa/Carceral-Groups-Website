import { Accordion, AccordionDetails, AccordionSummary, List, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getDocumentsByLocationAndType } from "../../api/services/MapPointsService";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GeographicLocation from "../../models/GeographicLocation";
import { DocumentListResponseItem } from "../../models/GeographicDocument";
import DocumentDialog from "./DocumentDialog";
import GeographicDocumentType from "../../models/GeographicDocumentType";

type AccordionOptionDocumentProps = {
  docType: GeographicDocumentType;
  geographicLocation: GeographicLocation;
}

const AccordionOptionDocuments = (props: AccordionOptionDocumentProps) => {
  const { docType, geographicLocation } = props;
  const [geographicDocumentResponse, setGeographicDocumentResponse] = useState<DocumentListResponseItem[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (expanded) {
      const fetchData = async () => {
        try {
          const documents = await getDocumentsByLocationAndType(geographicLocation, docType)
          setGeographicDocumentResponse(documents)
        }
        catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }
  }, [expanded, docType, geographicLocation]);

  const handleChange = (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded)
  };

  return (
    <Accordion onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>{docType.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {geographicDocumentResponse.map((doc, index) => (
            <DocumentDialog
              key={index}
              documentId={doc.documentId}
              documentTitle={doc.documentTitle}
            />
          ))
          }
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionOptionDocuments