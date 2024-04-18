import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { BlobDocumentComment } from '../../models/BlobDocumentComment';

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
    }
]

type CommentSectionProps = {
    document_id: string;
};

export default function CommentSection(props: CommentSectionProps) {
    const { document_id } = props;
    const [comments, setComments] = React.useState<BlobDocumentComment[]>([]);

    React.useEffect(() => {
        if (!document_id) return;

        // fetch the comments for document by id
        // set the document
        // const doc = getDocument(document_id);
        setComments(DUMMY_COMMENTS)
    }, [document_id]);

    const commentContent = (comment: BlobDocumentComment) => {
        return (
            <>
                <ListItemAvatar>
                    <Avatar alt={comment.image.alt} src={comment.image.url} />
                </ListItemAvatar>
                <ListItemText
                    primary={comment.title}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {comment.from}
                            </Typography>
                            {comment.content}
                        </React.Fragment>
                    }
                />
            </>
        )
    }

    const commentList = comments.map((comment, index) => {
        return (
            <div key={index}>
                {index > 0 &&
                    <Divider key={`divider_${index}`} variant="inset" component="li" />
                }
                <ListItem
                    key={comment.id}
                    alignItems="flex-start">
                    {commentContent(comment)}
                </ListItem>
            </div>
        )
    })
    
    return (
        <List>
            {commentList}
        </List>
    );
}
