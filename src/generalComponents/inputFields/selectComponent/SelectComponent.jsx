import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectComponent({ 
    label, 
    hasFirstRow,
    firstRowLabel,
    firstRowValue,
    chooseData, 
    chooseDataLabel,
    chooseDataValue,
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
        fields ? setField({ ...fields, [changeFieldName]: event.target.value }) 
               : setField(value);
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
                    {hasFirstRow &&
                        <MenuItem value={firstRowValue}>{firstRowLabel}</MenuItem>
                    }
                    {
                        chooseData.map((data) => {
                            return (
                                <MenuItem value={data[chooseDataValue]}>{data[chooseDataLabel]}</MenuItem>
                            );
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    );
}