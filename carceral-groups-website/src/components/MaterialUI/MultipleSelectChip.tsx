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
    selectedValue: { value: string; label: string }[];
    onSelectValue: (selectedValues: { value: string; label: string }[]) => void;    
};

export default function MultipleSelectChip({ label, options, selectedValue, onSelectValue }: MultipleSelectChipProps) {
    const theme = useTheme();
    const values = selectedValue.map((option) => option.label)

    const handleChange = (event: SelectChangeEvent<typeof values>) => {
        const {
            target: { value },
        } = event;
        const labels = typeof value === 'string' ? value.split(',') : value
        const selectedValues = options.filter((option) => labels.includes(option.label))
        onSelectValue(selectedValues)
    };


    return (
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="multiple-chip-label">{label}</InputLabel>
            <Select
                labelId="multiple-chip-label"
                id="multiple-chip"
                multiple
                value={values}
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
                        style={getStyles(name.label, values, theme)}
                    >
                        {name.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
