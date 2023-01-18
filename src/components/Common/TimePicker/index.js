import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function TimePickerComp({
  onTimeChange,
  label,
  style,
  value: incommingValue,
  date,
}) {
  const [value, setValue] = React.useState(
    dayjs(
      (date && `${date}T00:00:00.000Z`) ||
        incommingValue ||
        "2023-01-17T00:00:00.000Z"
    )
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          onTimeChange(dayjs(newValue));
        }}
        renderInput={(params) => <TextField sx={style} {...params} />}
      />
    </LocalizationProvider>
  );
}
