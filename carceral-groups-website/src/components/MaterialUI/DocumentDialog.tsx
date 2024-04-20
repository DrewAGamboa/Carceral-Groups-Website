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
import { BlobDocumentComment } from '../../models/BlobDocumentComment';

const DUMMY_BLOBDOCUMENT: BlobDocument = {
  id: '1',
  title: '1971.07.21_Arellano Contribution MASH Pinto Fund',
  fileUrl: 'https://vialekhnstore.blob.core.windows.net/documents/All/Federal/Mexican American Self Help (MASH)/1971.07.21_Arellano Contribution MASH Pinto Fund.pdf',
  type: 'pdf'
};

const DUMMY_COMMENTS: BlobDocumentComment[] = [
  {
      id: '1',
      image: { url: '/static/images/avatar/1.jpg', alt: 'Remy Sharp' },
      title: 'Brunch this weekend?',
      from: 'Ali Connors',
      content: ' — I\'ll be in your neighborhood doing errands this…'
  },
  {
      id: '2',
      image: { url: '/static/images/avatar/2.jpg', alt: 'Travis Howard' },
      title: 'Summer BBQ',
      from: 'to Scott, Alex, Jennifer',
      content: ' — Wish I could come, but I\'m out of town this…'
  },
  {
      id: '3',
      image: { url: '/static/images/avatar/3.jpg', alt: 'Cindy Baker' },
      title: 'Oui Oui',
      from: 'Sandra Adams',
      content: ' — Do you have Paris recommendations? Have you ever…'
  },
  {
      id: '4',
      image: { url: '/static/images/avatar/3.jpg', alt: 'Cindy Baker' },
      title: 'Oui Oui',
      from: 'Drew Gamboa',
      content: 'The institutional coursework at McNeil reflected the group’s membership. In MASH’s collective newsletter pamphlets called “La Palabra Alambre de MASH,” one of its winter editions—covering the group’s activities from October 1971 to March 1972—had been mailed to Shoreline Community College professor and director of the Chicano Education Association Raul Arellano. Among prisoners’ op-eds, poetry, and photographs of MASH-led events, Arellano would read about the group’s class roster for the summer and fall of 1971. The group’s editor Gil Leano wrote, “Following is but part of the roster of those carnales who are presently engaged in self-betterment through education… Education, carnales, is what the system encourages—encourages, that is, without consciously realizing that the encouragement given is the means of its own demise. We applaud the system’s efforts. En todo esto miro las semillas de cambio…” The fall roster included a list of forty-eight students enrolled in classes ranging from an English class for Spanish Speaking students (15), Mexican American culture (26), and a conglomeration of psychology, economic, business, and adult education courses (11). The presence of ESL classes at McNeil, MASH members’ enrollments in those classes, and the groups objectives surface a continuation of McNeil as a space premised on criminalizing immigrants. Through this institutional characteristic at McNeil, MASH formed partially as a transnational group that included both Mexican Americans and Mexican immigrants.'
  }
]

type DocumentDialogProps = {
  document_id: string;
};

export default function DocumentDialog(props: DocumentDialogProps) {
  const { document_id } = props;
  const [doc, setDoc] = React.useState<BlobDocument | null>(null);
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = React.useState<BlobDocumentComment[]>([]);

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

    setComments(DUMMY_COMMENTS)

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
              <CommentSection comments={comments} />
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