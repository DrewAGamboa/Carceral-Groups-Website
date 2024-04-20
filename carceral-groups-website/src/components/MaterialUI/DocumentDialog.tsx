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
            // const email = formJson.email;
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
                To leave a comment for this archival material, please enter your comment here. Your comment will be stored for future reference.
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
                margin="dense"
                id="emailAddress"
                name="email"
                label="Email Address"
                type="email"
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