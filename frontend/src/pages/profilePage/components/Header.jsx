import { MARKET_URL } from '../../../constants';
import LogoutButton from "../../../generalComponents/LogoutButton";
import NavigationButton from "../../../generalComponents/NavigationButton";
import { StyledProfileHeader } from "./ProfileHeader.styled";

function Header() {
  return (
    <StyledProfileHeader>
      <LogoutButton />
      <NavigationButton text="Market" url={MARKET_URL} />
    </StyledProfileHeader>
  );
}

export default Header;
