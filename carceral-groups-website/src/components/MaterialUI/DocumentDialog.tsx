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
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import ChicagoCitation from './ChicagoCitation';
import { List, ListItem, ListItemText } from '@mui/material';
import { CitationInfo } from '../../models/CitationInfo';
import DocumentResponse from '../../models/DocumentResponse';
import { useEffect, useState } from 'react';
import { createGeographicDocumentComment, getGeographicDocumentComments } from '../../api/services/GeographicDocumentCommentService';
import GeographicDocumentComment from '../../models/GeographicDocumentComment';
import CustomSnackBar from './CustomSnackBar';

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
  const [doc, setDoc] = useState<DocumentResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<GeographicDocumentComment[]>([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    if (!document_id || !open) return;

    const fetchData = async () => {
      const doc = await getDocument(document_id);
      setDoc(doc);
      const comments = await getGeographicDocumentComments(document_id);
      setComments(comments);
    }
    fetchData();
  }, [document_id, open]);

  const handleNewComment = (name: string, content: string) => {
    // TODO: save somewhere in storage
    if (!doc) return;

    const comment: GeographicDocumentComment = {
      commentId: '-1',
      geographicDocumentId: doc.documentId,
      commentText: content,
      commentAuthor: name,
      commentAuthorEmail: name + "@example.com",
      commentDate: new Date().toISOString(),
      isApproved: true // TODO: change to false when we have hooked correctly to backend
    };
    const fetchComments = async () => {
      await createGeographicDocumentComment(comment);
      const comments = await getGeographicDocumentComments(document_id);
      setComments(comments);
      setOpenSnackBar(true);
    }
    fetchComments();
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
            <DialogTitle>{doc.documentTitle}</DialogTitle>
            <DialogContent>
              <iframe src={doc.documentURI} title="Archival Material" width="100%" height="600px"></iframe>
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
                  <CustomSnackBar open={openSnackBar} handleClose={() => setOpenSnackBar(false)} message={'Thank you. Your comment has been submitted for approval.'}  />
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
