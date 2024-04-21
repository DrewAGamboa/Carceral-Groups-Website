import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { BlobDocumentComment } from '../../models/BlobDocumentComment';
import ShowMoreText from './ShowMoreText';
import { Box } from '@mui/material';

type CommentSectionProps = {
    comments: BlobDocumentComment[];
};

export default function CommentSection(props: CommentSectionProps) {
    const { comments } = props;

    const commentContent = (comment: BlobDocumentComment) => {
        return (
            <>
                <ListItemText
                    primary={comment.fromName}
                    secondary={
                        <React.Fragment>
                            <ShowMoreText text={comment.content} />
                        </React.Fragment>
                    }
                />
            </>
        )
    }

    const commentList = comments.map((comment) => {
        return (
            <ListItem
                key={comment.id}
                alignItems="flex-start">
                {commentContent(comment)}
            </ListItem>
        )
    })

    return (
        <Box component="section" sx={{ p: 2 }}>
            <Typography variant="h6" component="div">
                Comments
            </Typography>
            <List>
                {commentList}
            </List>
        </ Box>
    );
}
