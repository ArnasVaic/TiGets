import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../services/loginService";
import { StyledLogoutButton } from "./styled/LogoutButton.styled";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <StyledLogoutButton
        variant="outlined"
        onClick={() => dispatch(postLogout(navigate))}
      >
        <Logout />
        Log out
      </StyledLogoutButton>
    </>
  );
}

export default LogoutButton;
