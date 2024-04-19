import { Typography } from '@mui/material';

type ChicagoCitationProps = {
    author?: string,
    title: string,
    placeOfPublication: string,
    publisher: string,
    yearOfPublication: string,
    pageNumbers: string,
    url?: string,
    accessedDate?: string
}

const ChicagoCitation = (props: ChicagoCitationProps) => {
    const { author, title, placeOfPublication, publisher, yearOfPublication, pageNumbers, url, accessedDate } = props;

    const linkCitation = (linkUrl?: string, linkAccessedDate?: string) => {
        const linkElement = () => {linkUrl && <a href={linkUrl} target="_blank" rel="noopener noreferrer">Link</a>}
        const accessedElement = () => {linkUrl && linkAccessedDate && `accessed ${linkAccessedDate}.`}
        return (
            <>
                {linkElement()}{accessedElement()}
            </>
        )
    }

    return (
        <Typography variant="caption" gutterBottom>
            {author && `${author} ,`} <em>{title}</em>. {placeOfPublication}: {publisher}, {yearOfPublication}. {pageNumbers && `pp. ${pageNumbers}.`} {linkCitation(url, accessedDate)}
        </Typography>
    );
}

export default ChicagoCitation;
