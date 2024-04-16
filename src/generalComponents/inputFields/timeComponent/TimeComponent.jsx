import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

export default function Time({
    label,
    width
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DesktopTimePicker',
        ]}
      >
        <DemoItem label={label}>
          <DesktopTimePicker defaultValue={dayjs()}
                             slotProps={{textField: {size: "small"}}}
                             sx={{width: width}} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}