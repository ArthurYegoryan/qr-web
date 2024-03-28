import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextInput({
    label,
    setField,
    marginTop
}) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                marginTop: marginTop,
            }}
            noValidate
            autoComplete="off"
            onChange={(event) => setField(event.target.value)}
            onSubmit={(event) => setField(event.target.value)}
        >
            <TextField id="outlined-basic" label={label} variant="outlined" sx={{ margin: 0 }} />
        </Box>
    );
};