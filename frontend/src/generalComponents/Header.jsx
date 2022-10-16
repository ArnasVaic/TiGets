import LogoutButton from "./LogoutButton";
import NavigationButton from "./NavigationButton";
import { StyledProfileHeader } from "./styled/ProfileHeader.styled";

function Header({ navigateText, url }) {
  return (
    <StyledProfileHeader>
      <LogoutButton />
      <NavigationButton text={navigateText} url={url} />
    </StyledProfileHeader>
  );
}

export default Header;
