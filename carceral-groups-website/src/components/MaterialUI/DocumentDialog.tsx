/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getDocument } from '../../api/services/MapPointsService';
import CommentSection from './CommentSection';
import { BlobDocumentComment } from '../../models/BlobDocumentComment';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import ChicagoCitation from './ChicagoCitation';
import { List, ListItem, ListItemText } from '@mui/material';
import { CitationInfo } from '../../models/CitationInfo';
import DocumentResponse from '../../models/DocumentResponse';

const DUMMY_COMMENTS: BlobDocumentComment[] = [
  {
    id: '4',
    fromName: 'Drew Gamboa',
    content: 'The institutional coursework at McNeil reflected the group’s membership. In MASH’s collective newsletter pamphlets called “La Palabra Alambre de MASH,” one of its winter editions—covering the group’s activities from October 1971 to March 1972—had been mailed to Shoreline Community College professor and director of the Chicano Education Association Raul Arellano. Among prisoners’ op-eds, poetry, and photographs of MASH-led events, Arellano would read about the group’s class roster for the summer and fall of 1971. The group’s editor Gil Leano wrote, “Following is but part of the roster of those carnales who are presently engaged in self-betterment through education… Education, carnales, is what the system encourages—encourages, that is, without consciously realizing that the encouragement given is the means of its own demise. We applaud the system’s efforts. En todo esto miro las semillas de cambio…” The fall roster included a list of forty-eight students enrolled in classes ranging from an English class for Spanish Speaking students (15), Mexican American culture (26), and a conglomeration of psychology, economic, business, and adult education courses (11). The presence of ESL classes at McNeil, MASH members’ enrollments in those classes, and the groups objectives surface a continuation of McNeil as a space premised on criminalizing immigrants. Through this institutional characteristic at McNeil, MASH formed partially as a transnational group that included both Mexican Americans and Mexican immigrants.'
  },
  {
    id: '1',
    fromName: 'Ali Connors',
    content: 'This analysis really highlights how inmates contribute culturally to society.'
  },
  {
    id: '2',
    fromName: 'Trevor Hansen',
    content: 'It\'s fascinating to see the depth of creativity and resilience among incarcerated individuals. Understanding who created the artifact and their background provides a richer context to appreciate their work and struggles.'
  },
  {
    id: '3',
    fromName: 'Sandra Adams',
    content: 'The artifact’s analysis offers profound insights into the relationship between incarcerated individuals and their communities. By examining who created it and their social standing, alongside the historical and cultural context of its creation, we begin to understand the complex narratives and power dynamics at play. This analysis not only sheds light on the artifact itself but also raises important questions about the broader implications of cultural production within prison walls. What can’t be answered directly opens new avenues for further research, urging us to delve deeper into the unexplored stories of these creators.'
  }
]

const DUMMY_CITATIONS: CitationInfo[] = [
  {
    title: "“La Palabra Alambre de MASH,” October 1971-March 1972",
    publisher: "Tomás Ybarra-Frausto papers",
    yearOfPublication: "1943-1988",
    placeOfPublication: "UW Special Collections, Seattle, WA"
  },
  {
    author: "John Doe",
    title: "Understanding the Universe",
    placeOfPublication: "New York",
    publisher: "Universe Books",
    yearOfPublication: "2022",
    pageNumbers: "50-60",
    url: "http://example.com",
    accessedDate: "April 10, 2024"
  }
];

type DocumentDialogProps = {
  document_id: string;
};

export default function DocumentDialog(props: DocumentDialogProps) {
  //TODO: Remove once width is decided
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('lg');
  const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };



  const { document_id } = props;
  const [doc, setDoc] = React.useState<DocumentResponse | null>(null);
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = React.useState<BlobDocumentComment[]>([]);

  React.useEffect(() => {
    if (!document_id || !open) return;

    // fetch the document by id
    // set the document
    const doc = getDocument(document_id);
    if (doc) {
      // TODO: replace this when files are available
      setDoc(doc);
    } else {
      setDoc(null);
    }

    setComments(DUMMY_COMMENTS)

  }, [document_id, open]);

  const handleNewComment = (name: string, content: string) => {
    // TODO: save somewhere in storage
    const comment: BlobDocumentComment = {
      id: `${comments.length + 1}`,
      fromName: name,
      content: content
    };
    setComments([comment, ...comments]);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const docCitations = DUMMY_CITATIONS.map((citation, index) => {
    return (
      <ListItem key={index}>
        <ListItemText primary={<ChicagoCitation key={index} {...citation} numberInList={index + 1} />} />
      </ListItem>
    )
  })


  const contentTextHeader = `Artifact analysis helps us surface the significance of each archival document. Understanding the significance of this material helps illustrate the involvement that people incarcerated have done in collaboration with their communities.  Try to answer as many of the following questions as possible:`
  const contentTextList = () => {
    return (
      <ul>
        <li>What is the artifact?</li>
        <li>Who created it? What is their position/social standing, etc.?</li>
        <li>Why did they create it? Intended audience, the context, who or what they might be trying to promote or arguing against, etc.?</li>
        <li>When was it created? What else was happening at the time?</li>
        <li>How was it created?</li>
        <li>What questions do you have about the artifact? What issues can't be answered? What else do we need to know?</li>
        <li><i>If the document is a newspaper created by a cultural group, focus on one particular part of the document (an article, poetry, pictures, etc.)  that interests you and write about its significance.</i></li>
      </ul>
    );
  }
  const contentTextFooter = `Feel free to find a document that speaks to you and submit a brief description and analysis of the artifact.`

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        scroll={'body'}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson);
            // clear form
            handleNewComment(formJson.name, formJson.comment);
            // handleClose();
          },
        }}
      >
        {doc === null &&
          <>
            <DialogTitle>Document Not Found</DialogTitle>
            <DialogContent>
              <DialogContentText>
                The document you are looking for is not available at this time. Please try again later.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </>
        }
        {doc &&
          <>
            <DialogTitle>{doc.DocumentTitle}</DialogTitle>
            <DialogContent>
              <iframe src={doc.DocumentURI} title="Archival Material" width="100%" height="600px"></iframe>
              <List>
                {docCitations}
              </List>
              <Box component="section" sx={{ p: 2 }}>
                {contentTextHeader}
                {contentTextList()}
                {contentTextFooter}
                <Box
                  component="section"
                  sx={{ p: 2, my: 2, border: '1px solid grey', borderRadius: '5px' }}>
                  <TextField
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                  />
                  <TextField
                    required
                    margin='dense'
                    id="outlined-multiline-static"
                    name="comment"
                    label="Leave a Comment"
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue=""
                  />
                  <Box
                    display="flex"
                    justifyContent={'flex-end'}
                    sx={{ pt: 2 }}
                  >
                    <Button type="submit">Comment</Button>
                  </Box>
                </Box>
              </Box>
              <CommentSection comments={comments} />

            </DialogContent>
            <DialogActions>
              {/* //TODO: Remove once width is decided */}
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                <Select
                  value={maxWidth}
                  onChange={handleMaxWidthChange}
                  label="maxWidth"
                  inputProps={{
                    name: 'max-width',
                    id: 'max-width',
                  }}
                >
                  <MenuItem value={false as any}>false</MenuItem>
                  <MenuItem value="xs">xs</MenuItem>
                  <MenuItem value="sm">sm</MenuItem>
                  <MenuItem value="md">md</MenuItem>
                  <MenuItem value="lg">lg</MenuItem>
                  <MenuItem value="xl">xl</MenuItem>
                </Select>
              </FormControl>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </>
        }
      </Dialog>
    </React.Fragment>
  );
}