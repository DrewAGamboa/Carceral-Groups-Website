import { useState } from 'react';
import { Button } from '@mui/material';

type ShowMoreTextProps = {
    text: string;
    maxCharacter?: number;
};

const ShowMoreText = (props: ShowMoreTextProps) => {
    const { text, maxCharacter = 100 } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    const isWithinLimit = text.length <= maxCharacter;
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            {isExpanded ? text : `${text.substring(0, maxCharacter)}${isWithinLimit ? '' : '…'}`}
            {text.length > maxCharacter && (
                <Button variant='text' onClick={handleToggle}>
                    {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
            )}
        </>
    );
};

export default ShowMoreText;
