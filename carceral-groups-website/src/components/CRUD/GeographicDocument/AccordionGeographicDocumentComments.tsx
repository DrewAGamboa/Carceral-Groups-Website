import { Accordion, AccordionDetails, AccordionSummary, Divider, List, ListItem, Typography, styled } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import GeographicDocument from "../../../models/GeographicDocument";
import GeographicDocumentComment from "../../../models/GeographicDocumentComment";
import { getGeographicDocumentComments } from "../../../api/services/GeographicDocumentCommentService";
import ShowMoreText from "../../MaterialUI/ShowMoreText";

type AccordionGeographicDocumentCommentsProps = {
    geographicDocument: GeographicDocument;
}

const RowContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

const AccordionGeographicDocumentComments = ({ geographicDocument }: AccordionGeographicDocumentCommentsProps) => {
    const [geographicDocumentComments, setGeographicDocumentComments] = useState<GeographicDocumentComment[]>([]);
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        if (expanded) {
            const fetchData = async () => {
                try {
                    const comments = await getGeographicDocumentComments(geographicDocument.documentId)
                    setGeographicDocumentComments(comments)
                }
                catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchData();
        }
    }, [expanded, geographicDocument]);

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
                <Typography>{"Comments"}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {geographicDocumentComments.map((comment, index) => (
                        <ListItem key={index}>
                            <RowContainer>
                                <Divider />
                                <Typography>{`Name: ${comment.fullName}`}</Typography>
                                <Typography>{`Email: ${comment.email}`}</Typography>
                                <Typography>{`Comment Text: `}<ShowMoreText text={comment.commentText} /></Typography>
                            </RowContainer>
                        </ListItem>
                    ))
                    }
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionGeographicDocumentComments;