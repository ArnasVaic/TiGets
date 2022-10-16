export const LOGIN_URL = "/login";
export const POST_LOGIN_URL = (username) =>
  `https://localhost:7056/api/Account/Login?Username=${username}`;
export const REGISTER_URL = "/register";
export const PROFILE_URL = "/profile";
export const MARKET_URL = "/";
export const PATCH_BUY_URL = (ticketId) =>
  `https://localhost:7056/api/Ticket/Buy?TicketId=${ticketId}`;
export const GET_MARKET_TICKETS =
  "https://localhost:7056/api/Ticket/GetTickets";
export const POST_REGISTER_URL = "https://localhost:7056/api/Account/Register";
export const POST_LOGOUT_URL = "https://localhost:7056/api/Account/Logout";

export const PATCH_ADD_BALANCE = (amount) =>
  `https://localhost:7056/api/Account/Balance?amount=${amount}`;
export const GET_PROFILE_TICKETS =
  "https://localhost:7056/api/Ticket/GetUserTickets";
export const GET_USER_DATA_URL =
  "https://localhost:7056/api/Account/GetProfileData";
