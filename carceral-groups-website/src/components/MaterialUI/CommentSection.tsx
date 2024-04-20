import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { BlobDocumentComment } from '../../models/BlobDocumentComment';
import ShowMoreText from './ShowMoreText';

type CommentSectionProps = {
    comments: BlobDocumentComment[];
};

export default function CommentSection(props: CommentSectionProps) {
    const { comments } = props;

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
                            <ShowMoreText text={comment.content} />
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
