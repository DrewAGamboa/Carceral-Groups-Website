import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

type MultipleSelectChipProps = {
    label: string,
    options: { value: string; label: string }[];
};

export default function MultipleSelectChip({ label, options }: MultipleSelectChipProps) {
    const theme = useTheme();
    const [selectedLabel, setSelectedLabel] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof selectedLabel>) => {
        const {
            target: { value },
        } = event;
        const labels = typeof value === 'string' ? value.split(',') : value
        setSelectedLabel(
            // On autofill we get a stringified value.
            labels,
        );
        const selectedValues = options.filter((option) => labels.includes(option.label))
        console.log('TODO_1', labels, selectedValues)

    };

    return (
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedLabel}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label={label} />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {options.map((name) => (
                    <MenuItem
                        key={name.value}
                        value={name.label}
                        style={getStyles(name.label, selectedLabel, theme)}
                    >
                        {name.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
