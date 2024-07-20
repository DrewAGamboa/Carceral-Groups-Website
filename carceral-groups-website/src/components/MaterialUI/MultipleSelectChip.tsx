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
    name: string,
    label: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: { value: string; label: string; original: any }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedValue?: { value: string; label: string; original: any  }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelectValue: (selectedValues: { value: string; label: string; original: any }[]) => void;
    disabled?: boolean;
};

export default function MultipleSelectChip({ name, label, options, selectedValue, onSelectValue, disabled }: MultipleSelectChipProps) {
    const theme = useTheme();
    const labelValues = selectedValue ? selectedValue.map((option) => option.label) : []

    const handleChange = (event: SelectChangeEvent<typeof labelValues>) => {
        const {
            target: { value },
        } = event;
        const labels = typeof value === 'string' ? value.split(',') : value
        const selectedValues = options.filter((option) => labels.includes(option.label))
        onSelectValue(selectedValues)
    };


    return (
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} disabled={disabled}>
            <InputLabel id="multiple-chip-label">{label}</InputLabel>
            <Select
                labelId="multiple-chip-label"
                id="multiple-chip"
                name={name}
                multiple
                value={labelValues}
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
                disabled={disabled}
            >
                {options.map((name) => (
                    <MenuItem
                        key={name.value}
                        value={name.label}
                        style={getStyles(name.label, labelValues, theme)}
                    >
                        {name.label}
                    </MenuItem>
                ))}
            </Select>
            <input type="hidden" name={name} value={selectedValue ? selectedValue.map((option) => option.value) : []} />
        </FormControl>
    );
}
