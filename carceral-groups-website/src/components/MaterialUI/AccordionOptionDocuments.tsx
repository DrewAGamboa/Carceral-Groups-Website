import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getDocumentsByLocationAndType } from "../../api/services/MapPointsService";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GeographicLocation from "../../models/GeographicLocation";
import { GeographicDocumentResponse } from "../../models/GeographicDocument";
import DocumentDialog from "./DocumentDialog";

type AccordionOptionDocumentProps = {
    docType: string;
    geographicLocation: GeographicLocation;
}

const AccordionOptionDocuments = (props: AccordionOptionDocumentProps) => {
    const { docType, geographicLocation } = props;
    const [geographicDocumentResponse, setGeographicDocumentResponse] = useState<GeographicDocumentResponse[]>([]);
    const [expanded, setExpanded] = useState<boolean>(false);


    useEffect(() => {
        if (expanded) {
          const documents = getDocumentsByLocationAndType(geographicLocation, docType)
            setGeographicDocumentResponse(documents)
        }
      }, [expanded]);


    const handleChange = (docType: string, geographicLocation: GeographicLocation) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        // setExpanded(isExpanded ? panel : false);
        const documents = getDocumentsByLocationAndType(geographicLocation, docType)
        console.log('TODO_handleChange', geographicLocation, docType, isExpanded, documents)
        setExpanded(isExpanded)
      };

    return (
        <Accordion onChange={handleChange(docType, geographicLocation)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>{docType}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {geographicDocumentResponse.map((doc, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>{doc.geographicDocumentTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DocumentDialog document_id={doc.geographicDocumentId}/>
            </AccordionDetails>
          </Accordion>
        ))
        }
      </AccordionDetails>
    </Accordion>
    )
}

export default AccordionOptionDocuments