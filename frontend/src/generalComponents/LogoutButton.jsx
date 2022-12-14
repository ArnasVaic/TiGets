import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DARK_BUTTON } from "../constants";
import { postLogout } from "../services/loginService";
import { StyledLogoutButton } from "./styled/LogoutButton.styled";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <StyledLogoutButton
        variant="contained"
        onClick={() => dispatch(postLogout(navigate))}
        style={{ backgroundColor: DARK_BUTTON }}
      >
        Log out
        <Logout style={{ marginLeft: "5px" }} />
      </StyledLogoutButton>
    </>
  );
}

export default LogoutButton;
