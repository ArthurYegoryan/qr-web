import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextInput({
    label,
    fields,
    changeFieldName,
    setField,
    onChangeHandler,
    marginTop,
}) {
    return (
        <Box
            sx={{
                '& > :not(style)': { m: 0, width: '25ch' },
                marginTop: marginTop,
            }}
            noValidate
            autoComplete="off"
            onChange={onChangeHandler ? onChangeHandler : (event) => setField({ ...fields, [changeFieldName]: event.target.value })}
        >
            <TextField id="outlined-basic" 
                       label={label} 
                       variant="outlined"
                       size='small' />
        </Box>
    );
};