import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function Calendar({
    label,
    defaultDate,
    marginLeft
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'DesktopDatePicker'
                ]}
                sx={{marginLeft: marginLeft}}
            >
                <DemoItem label={label}>
                    <DesktopDatePicker defaultValue={dayjs(defaultDate)} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}