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
import { Box, FormControl, InputLabel, ListItemButton, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import DocumentResponse from '../../models/DocumentResponse';
import { useEffect, useState } from 'react';
import { createGeographicDocumentComment, getGeographicDocumentComments } from '../../api/services/GeographicDocumentCommentService';
import GeographicDocumentComment from '../../models/GeographicDocumentComment';
import CustomSnackBar from './CustomSnackBar';
import RawTypography from './RawTypography';

type DocumentDialogProps = {
  documentId: string;
  documentTitle: string;
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

  const { documentId, documentTitle } = props;
  const [doc, setDoc] = useState<DocumentResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<GeographicDocumentComment[]>([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    if (!documentId || !open) return;

    const fetchData = async () => {
      const doc = await getDocument(documentId);
      setDoc(doc);
      const comments = await getGeographicDocumentComments(documentId);
      setComments(comments);
    }
    fetchData();
  }, [documentId, open]);

  const handleNewComment = (name: string, content: string, email: string) => {
    // TODO: save somewhere in storage
    if (!doc) return;

    const comment: GeographicDocumentComment = {
      commentId: '-1',
      documentId: documentId,
      commentText: content,
      fullName: name,
      email: email,
      commentDate: new Date().toISOString(),
      isApproved: true // TODO: change to false when we have hooked correctly to backend
    };
    const fetchComments = async () => {
      await createGeographicDocumentComment(comment);
      const comments = await getGeographicDocumentComments(documentId);
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
      <ListItemButton onClick={handleClickOpen} divider>
        <RawTypography htmlContent={documentTitle} />
      </ListItemButton>
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
            handleNewComment(formJson.name, formJson.comment, formJson.email);
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
            <DialogTitle><RawTypography htmlContent={doc.documentTitle}/></DialogTitle>
            <DialogContent>
              <iframe src={doc.uri} title="Archival Material" width="100%" height="600px"></iframe>
              <RawTypography variant="caption" gutterBottom htmlContent={`1. ${doc?.citation}`}/>
              <Box component="section" sx={{ p: 2 }}>
                {contentTextHeader}
                {contentTextList()}
                {contentTextFooter}
                <Box
                  component="section"
                  sx={{ p: 2, my: 2, border: '1px solid grey', borderRadius: '5px' }}>
                  <div>
                    <TextField
                      required
                      margin="dense"
                      id="name"
                      name="name"
                      label="Name"
                      type="text"
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      margin="dense"
                      id="email"
                      name="email"
                      label="E-mail"
                      type="email"
                    />
                  </div>
                  <div>
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
                  </div>
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
