import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const DUMMY_COMMENTS = [
    {
        image: { url: '/static/images/avatar/1.jpg', alt: 'Remy Sharp' },
        title: 'Brunch this weekend?',
        from: 'Ali Connors',
        content: ' — I\'ll be in your neighborhood doing errands this…'
    },
    {
        image: { url: '/static/images/avatar/2.jpg', alt: 'Travis Howard' },
        title: 'Summer BBQ',
        from: 'to Scott, Alex, Jennifer',
        content: ' — Wish I could come, but I\'m out of town this…'
    },
    {
        image: { url: '/static/images/avatar/3.jpg', alt: 'Cindy Baker' },
        title: 'Oui Oui',
        from: 'Sandra Adams',
        content: ' — Do you have Paris recommendations? Have you ever…'
    }
]

export default function CommentSection() {
    const comments = DUMMY_COMMENTS.map((comment, index) => {
        return (
            <>
                {index > 0 &&
                    <Divider variant="inset" component="li" />
                }
                <ListItem alignItems="flex-start">
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
                </ListItem>

            </>
        )
    })
    return (
        <List>
            {comments}
        </List>
    );
}
