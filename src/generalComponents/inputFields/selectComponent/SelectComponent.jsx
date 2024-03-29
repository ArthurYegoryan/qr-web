import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectComponent({ 
    label, 
    chooseData, 
    fields, 
    changeFieldName, 
    setField, 
    width,
    marginTop,
    marginLeft
}) {
    const [ value, setValue ] = React.useState("");
  
    const handleChange = (event) => {
        setValue(event.target.value);
        setField({ ...fields, [changeFieldName]: event.target.value });
    };

    return (
        <Box sx={{ minWidth: 120, width: width, marginTop: marginTop, marginLeft: marginLeft }}>
            <FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    onChange={handleChange}
                >
                    <MenuItem value="All">Ամբողջը</MenuItem>
                    {
                        chooseData.map(({ name_am, name_en }) => {
                            return (
                                <MenuItem value={name_en}>{name_am}</MenuItem>
                            );
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    );
}