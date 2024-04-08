import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export interface ColorToggleButtonProps {
    alignment: string;
    handleChange: (event: React.MouseEvent<HTMLElement>, newAlignment: string) => void;
}

export default function ColorToggleButton(props: ColorToggleButtonProps) {
    const { alignment, handleChange } = props;

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton value="place_marker">Place Marker</ToggleButton>
            <ToggleButton value="delete_marker">Delete</ToggleButton>
            <ToggleButton value="Import">Import</ToggleButton>
            <ToggleButton value="Export">Export</ToggleButton>
        </ToggleButtonGroup>
    );
}
