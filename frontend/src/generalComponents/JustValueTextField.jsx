import { StyledJustValueTextField } from './styled/JustValueTextField.styled';

function JustValueTextField({ setValue, label, type }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return <StyledJustValueTextField onChange={handleChange} label={label} type={type} />;
}

export default JustValueTextField;
