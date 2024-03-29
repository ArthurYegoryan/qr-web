import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

export default function Calendar({
    label,
    defaultDate = Date.now(),
    // defaultTime = `${(new Date()).getHours()}: ${(new Date()).getMinutes()}`,
    marginLeft,
    fields,
    setField,
    changeFieldName
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'DesktopDatePicker'
                ]}
                sx={{marginLeft: marginLeft}}
            >
                <DemoItem label={label} >
                    <DesktopDatePicker defaultValue={dayjs(defaultDate)} 
                                       slotProps={{textField: {size: "small"}}}
                                       onChange={(date) => setField({ ...fields, [changeFieldName]: date.toString().slice(5, 16)})} />
                    {/* <DesktopTimePicker defaultValue={dayjs(defaultTime)}
                                       slotProps={{textField: {size: "small"}}} /> */}
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}