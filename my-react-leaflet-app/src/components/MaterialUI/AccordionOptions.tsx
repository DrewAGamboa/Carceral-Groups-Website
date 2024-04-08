import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterOptions from './FilterOptions';
import CsvUpload from '../CsvUpload/CsvUpload';

interface AccordionOptionsProps {
    open?: boolean,
    options: {label: string, checked: boolean, children: any[]}
    onOptionsChange: (updatedTreeData: any) => void;
    onUpload: (data: any[]) => void;
}

export default function AccordionOptions({ open, options, onOptionsChange, onUpload }: AccordionOptionsProps) {
    return (
        <div>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography sx={{ opacity: open ? 1 : 0 }}>Filters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FilterOptions options={options} onOptionsChange={onOptionsChange} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"

                >
                    <Typography sx={{ opacity: open ? 1 : 0 }}>Import</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CsvUpload handleUpload={onUpload} />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}