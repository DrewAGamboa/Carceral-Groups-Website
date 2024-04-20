import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

type ShowMoreTextProps = {
    text: string;
    maxCharacter?: number;
};

const ShowMoreText = (props: ShowMoreTextProps) => {
    const { text, maxCharacter = 100 } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <Typography variant="body1">
                {isExpanded ? text : `${text.substring(0, maxCharacter)}...`}
            </Typography>
            {text.length > maxCharacter && (
                <Button onClick={handleToggle}>
                    {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
            )}
        </div>
    );
};

export default ShowMoreText;
