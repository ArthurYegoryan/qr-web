import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { colors } from '../../../assets/styles/colors';

export default function AutoCompleteSelect({
    label,
    data,
    size = "small",
    width = 300,
    marginTop,
    existsError,
    errorText,
    onChangeHandler
}) {
    return (
        <FormControl fullWidth size='small' error={existsError}>
            <Autocomplete
                disablePortal
                options={data}
                size={size}
                sx={{ 
                    width: width, 
                    marginTop: marginTop,
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: existsError && colors.errorLabelColor
                    },
                    "& .MuiInputLabel-root": {
                        color: existsError && colors.errorLabelColor
                    },
                    "& .MuiAutocomplete-popperDisablePortal": {
                        color: colors.errorLabelColor
                    },
                }}
                renderInput={(params) => <TextField {...params} label={label} />}
                onChange={onChangeHandler}
            />
            {existsError &&
                <FormHelperText>{errorText}</FormHelperText>
            }
        </FormControl>
    );
}