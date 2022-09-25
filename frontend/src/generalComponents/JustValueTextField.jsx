import { TextField } from "@mui/material";

function JustValueTextField({ setValue, label, type }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return <TextField onChange={handleChange} label={label} type={type} />;
}

export default JustValueTextField;
