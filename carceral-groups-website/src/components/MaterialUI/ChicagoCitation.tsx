import { Typography } from '@mui/material';

type ChicagoCitationProps = {
    author: string,
    title: string,
    placeOfPublication: string,
    publisher: string,
    yearOfPublication: string,
    pageNumbers: string,
    url: string,
    accessedDate: string
}

const ChicagoCitation = (props: ChicagoCitationProps) => {
    const { author, title, placeOfPublication, publisher, yearOfPublication, pageNumbers, url, accessedDate } = props;

    return (
        <Typography variant="caption" gutterBottom>
            {author}, <em>{title}</em>. {placeOfPublication}: {publisher}, {yearOfPublication}. {pageNumbers && `pp. ${pageNumbers}.`} {url && <a href={url} target="_blank" rel="noopener noreferrer">Link</a>}{url && accessedDate && `, accessed ${accessedDate}.`}
        </Typography>
    );
}

export default ChicagoCitation;
