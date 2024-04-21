import { Typography } from '@mui/material';

type ChicagoCitationProps = {
    author?: string,
    title: string,
    placeOfPublication: string,
    publisher: string,
    yearOfPublication: string,
    pageNumbers?: string,
    url?: string,
    accessedDate?: string,
    numberInList?: number
}

const ChicagoCitation = (props: ChicagoCitationProps) => {
    const { author, title, placeOfPublication, publisher, yearOfPublication, pageNumbers, url, accessedDate, numberInList } = props;

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
            {numberInList && `${numberInList}. `}<em>{title}</em>, {author && `${author},`} {publisher}, {yearOfPublication}, {placeOfPublication}, {pageNumbers && `pp. ${pageNumbers}.`} {linkCitation(url, accessedDate)}
        </Typography>
    );
}

export default ChicagoCitation;
