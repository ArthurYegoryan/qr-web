import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextInput({
    label,
    onChangeHandler,
    marginTop,
    existsError,
    errorText,
}) {
    return (
        <Box
            sx={{
                '& > :not(style)': { m: 0, width: '25ch' },
                marginTop: marginTop,
            }}
            noValidate
            autoComplete="off"
            onChange={onChangeHandler}
        >
            <TextField id="outlined-basic" 
                       label={label} 
                       variant="outlined"
                       size='small'
                       error={existsError}
                       helperText={existsError && errorText} />
        </Box>
    );
};