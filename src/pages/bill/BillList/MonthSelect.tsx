import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface Props {
    value?: Date;
    onChange?: (value: Date) => void;
}

const YEAR_COUNT = 3;

const MonthSelect: React.FC<Props> = ({ value, onChange }) => {
    const date = value ?? new Date();
    const [year, month] = [date.getFullYear(), date.getMonth()];

    const handleChange = (type: 'year' | 'month', value: number) => {
        const newDate = new Date(year, month, 1);
        if (type === 'year') {
            newDate.setFullYear(value);
        } else {
            newDate.setMonth(value);
        }
        onChange?.(newDate);
    };

    return (
        <Box sx={{ display: 'flex', mb: 2 }}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">年份</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={year} label="年份" onChange={(event) => handleChange('year', +event.target.value)}>
                    {Array.from({ length: YEAR_COUNT * 2 }).map((_, index) => (
                        <MenuItem key={index} value={year - index + YEAR_COUNT}>
                            {year - index + YEAR_COUNT}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ ml: 2 }} fullWidth size="small">
                <InputLabel>月份</InputLabel>
                <Select value={month} label="月份" onChange={(event) => handleChange('month', +event.target.value)}>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <MenuItem key={index} value={index}>
                            {(index + 1).toString().padStart(2, '0')}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default MonthSelect;
