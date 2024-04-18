/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CommentSection from './CommentSection';

export default function FormDialog() {
  // const docUrl = 'https://vialekhnstore.blob.core.windows.net/documents/All/Federal/Mexican American Self Help (MASH)/1971.07.21_Arellano Contribution MASH Pinto Fund.pdf'
  // const mp3Url = 'https://vialekhnstore.blob.core.windows.net/documents/All/State/Asian Pacific Islander Cultural Awareness Group (APICAG)/2024.02.19_Ralph Dunuan 1.mp3'
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Comment
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
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Leave a Comment</DialogTitle>
        <DialogContent>
          {/* <iframe src={docUrl} title="Archival Material" width="100%" height="600px"></iframe> */}
          {/* <iframe src={mp3Url} title="Archival Material 2" width="100%" height="100px"></iframe> */}
          <DialogContentText>
            To leave a comment for this archival material, please enter your comment here. Your comment will be stored for future reference.
          </DialogContentText>
          {/* <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            fullWidth
            rows={4}
            defaultValue=""
          />
          <CommentSection />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Comment</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}