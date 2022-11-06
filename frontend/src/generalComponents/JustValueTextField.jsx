import { StyledJustValueTextField } from "./styled/JustValueTextField.styled";

function JustValueTextField({ setValue, label, type, setRequiredErrMsg }) {
  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === "") {
      setRequiredErrMsg("All fields are required");
    } else {
      setRequiredErrMsg(null);
    }
  };
  return (
    <StyledJustValueTextField
      onChange={handleChange}
      label={label}
      type={type}
    />
  );
}

export default JustValueTextField;
