import { styled } from "@mui/material";
import { HEADER } from '../../constants';

export const StyledProfileHeader = styled(`div`)`
  height: 60px;
  width: 100%;
  padding: 10px;
  text-align: center;
  color: white;
  font-size: 30px;
  border-bottom: 1px solid black;
  outline-style: solid;
  outline-width: thin;
  background-color: ${HEADER};
`;
