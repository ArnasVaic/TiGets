import { Stack, styled } from "@mui/material";
import { BACKGROUND } from "../../constants";

export const StyledCenteredColumn = styled(Stack)`
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
  max-width: 100%;
  justify-content: space-between;
`;
