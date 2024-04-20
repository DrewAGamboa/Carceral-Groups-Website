/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BlobDocument } from '../../models/BlobDocument';
import { getDocument } from '../../api/services/MapPointsService';
import CommentSection from './CommentSection';

const DUMMY_BLOBDOCUMENT: BlobDocument = {
  id: '1',
  title: '1971.07.21_Arellano Contribution MASH Pinto Fund',
  fileUrl: 'https://vialekhnstore.blob.core.windows.net/documents/All/Federal/Mexican American Self Help (MASH)/1971.07.21_Arellano Contribution MASH Pinto Fund.pdf',
  type: 'pdf'
};

type DocumentDialogProps = {
  document_id: string;
};

export default function DocumentDialog(props: DocumentDialogProps) {
  const { document_id } = props;
  const [doc, setDoc] = React.useState<BlobDocument | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!document_id || !open) return;

    // fetch the document by id
    // set the document
    const doc = getDocument(document_id);
    if (doc) {
      // TODO: replace this when files are available
      setDoc({ ...doc, fileUrl: DUMMY_BLOBDOCUMENT.fileUrl });
    } else {
      setDoc(null);
    }
  }, [document_id, open]);

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
      <Button variant="outlined" onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson);
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
            <DialogTitle>{doc.title}</DialogTitle>
            <DialogContent>
              <iframe src={doc.fileUrl} title="Archival Material" width="100%" height="600px"></iframe>
              <DialogContentText>
                {contentTextHeader}
                {contentTextList()}
                {contentTextFooter}
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin='dense'
                id="outlined-multiline-static"
                name="comment"
                label="Multiline"
                multiline
                fullWidth
                rows={4}
                defaultValue=""
              />
              <CommentSection document_id={doc.id} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Comment</Button>
            </DialogActions>
          </>
        }
      </Dialog>
    </React.Fragment>
  );
}