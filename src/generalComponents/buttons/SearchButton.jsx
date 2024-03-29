import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function SearchButton({
    type = "button",
    label = "Button",
    startIcon,
    endIcon,
    size = "small",
    backgroundColor = "blue",
    color = "white",
    marginLeft,
    marginRight,
    onClickHandler
}) {
    return (
        <Stack direction="row" 
               spacing={2} 
               sx={{marginRight: marginRight, marginLeft: marginLeft}}
        >
            <Button variant="contained"
                    type={type}
                    startIcon={startIcon}
                    endIcon={endIcon} 
                    size={size} 
                    sx={{
                        backgroundColor: backgroundColor,
                        color: color
                    }}
                    onClick={onClickHandler}
            >
                {label}
            </Button>
        </Stack>
    );
}