/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterOptions from './FilterOptions';
import FilterListIcon from '@mui/icons-material/FilterList';
import FiltersResponseFilter from '../../models/Filter';
import GeographicLocationFilter from '../../models/GeographicLocationFilter';

interface AccordionOptionsProps {
    open?: boolean,
    options: FiltersResponseFilter[]
    onOptionsChange: (geographicLocationFilters: GeographicLocationFilter[]) => void;
    onExpand: () => void;
}

export default function AccordionOptions({ open, options, onOptionsChange, onExpand }: AccordionOptionsProps) {
    const handleOnChange = (_event: React.SyntheticEvent<Element, Event>, expanded: boolean) => {
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
        </>
    );
}