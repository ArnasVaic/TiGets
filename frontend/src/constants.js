export const LOGIN_URL = "/login";
export const TICKET_URL = (ticketId) =>
    `/ticket/${ticketId}`;
export const TICKET_URL_PATH = "/ticket/:ticketId";
export const POST_LOGIN_URL = (username) =>
  `https://localhost:7056/api/Account/Login?Username=${username}`;
export const REGISTER_URL = "/register";
export const PROFILE_URL = "/profile";
export const MARKET_URL = "/";
export const PATCH_BUY_URL = (ticketId) =>
  `https://localhost:7056/api/Ticket/Buy?TicketId=${ticketId}`;
export const GET_MARKET_TICKETS =
  "https://localhost:7056/api/Ticket/GetMarketTickets";
export const POST_REGISTER_URL = "https://localhost:7056/api/Account/Register";
export const POST_LOGOUT_URL = "https://localhost:7056/api/Account/Logout";

export const PATCH_ADD_BALANCE = (amount) =>
  `https://localhost:7056/api/Account/Balance?amount=${amount}`;
export const GET_PROFILE_TICKETS =
  "https://localhost:7056/api/Ticket/GetUserTickets";
export const GET_USER_DATA_URL =
  "https://localhost:7056/api/Account/GetProfileData";
export const PATCH_MOVE_TICKET_URL = (ticketId, state) =>
  `https://localhost:7056/api/Ticket/Move?ticketId=${ticketId}&state=${state}`;
export const POST_IMPORT_TICKET_URL =
    "https://localhost:7056/api/Ticket/Import";

export const GET_TRANSFERS_URL = (ticketId) =>
    `https://localhost:7056/api/Transfer/GetTransfers?ticketId=${ticketId}`;