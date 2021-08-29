import { KeyboardDatePicker } from "@material-ui/pickers"

export interface SharesInputProps {
  selectedDate?: Date;
  handleDateChange: (value?: string | null) => void;
}

export const SharesInput = (props: SharesInputProps) => {
  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id="date-picker-inline"
      label="Date picker inline"
      value={props.selectedDate ?? new Date()}
      onChange={(x,y) =>props.handleDateChange(y)}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  )
}