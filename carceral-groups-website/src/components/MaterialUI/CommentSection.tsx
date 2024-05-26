import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ShowMoreText from './ShowMoreText';
import { Box } from '@mui/material';
import GeographicDocumentComment from '../../models/GeographicDocumentComment';

type CommentSectionProps = {
    comments: GeographicDocumentComment[];
};

export default function CommentSection(props: CommentSectionProps) {
    const { comments } = props;

    const commentContent = (comment: GeographicDocumentComment) => {
        return (
            <>
                <ListItemText
                    primary={comment.commentAuthor}
                    secondary={
                        <React.Fragment>
                            <ShowMoreText text={comment.commentText} />
                        </React.Fragment>
                    }
                />
            </>
        )
    }

    const commentList = comments.map((comment) => {
        return (
            <ListItem
                key={comment.commentId}
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
