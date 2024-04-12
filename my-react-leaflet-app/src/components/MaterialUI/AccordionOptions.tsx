import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterOptions from './FilterOptions';
import CsvUpload from '../CsvUpload/CsvUpload';
import FilterListIcon from '@mui/icons-material/FilterList';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

interface AccordionOptionsProps {
    open?: boolean,
    options: { label: string, checked: boolean, children: any[] }
    onOptionsChange: (updatedTreeData: any) => void;
    onUpload: (data: any[]) => void;
    onExpand: () => void;
}

export default function AccordionOptions({ open, options, onOptionsChange, onUpload, onExpand }: AccordionOptionsProps) {
    const handleOnChange = (event: React.SyntheticEvent<Element, Event>, expanded: boolean) => {
        if(expanded)
            onExpand()
    }

    return (
        <>
            <Accordion onChange={handleOnChange}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <FilterListIcon />
                    {open &&
                        <Typography>Filters</Typography>
                    }
                </AccordionSummary>
                <AccordionDetails>
                    <FilterOptions options={options} onOptionsChange={onOptionsChange} />
                </AccordionDetails>
            </Accordion>
            <Accordion onChange={handleOnChange}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"

                >
                    <DriveFolderUploadIcon />
                    {open &&
                        <Typography>Import</Typography>
                    }
                </AccordionSummary>
                <AccordionDetails>
                    <CsvUpload handleUpload={onUpload} />
                </AccordionDetails>
            </Accordion>
        </>
    );
}