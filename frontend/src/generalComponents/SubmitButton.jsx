import { Button } from "@mui/material";

function SubmitButton({ text, onClick }) {
  return (
    <Button variant="contained" onClick={onClick}>
      {text}
    </Button>
  );
}

export default SubmitButton;
