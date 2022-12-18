export const BACKEND_URL = "https://139.162.139.196:7056";
export const LOGIN_URL = "/login";
export const TICKET_URL = (ticketId) => `/ticket/${ticketId}`;
export const TICKET_URL_PATH = "/ticket/:ticketId";
export const POST_LOGIN_URL = (username) =>
  `${BACKEND_URL}/api/Account/Login?Username=${username}`;
export const REGISTER_URL = "/register";
export const PROFILE_URL = "/profile";
export const MARKET_URL = "/";
export const PATCH_BUY_URL = (ticketId) =>
  `${BACKEND_URL}/api/Ticket/Buy?TicketId=${ticketId}`;
export const GET_MARKET_TICKETS = `${BACKEND_URL}/api/Ticket/GetMarketTickets`;
export const POST_REGISTER_URL = `${BACKEND_URL}/api/Account/Register`;
export const POST_LOGOUT_URL = `${BACKEND_URL}/api/Account/Logout`;

export const PATCH_ADD_BALANCE = (amount) =>
  `${BACKEND_URL}/api/Account/Balance?amount=${amount}`;
export const GET_PROFILE_TICKETS = `${BACKEND_URL}/api/Ticket/GetUserTickets`;
export const GET_USER_DATA_URL = `${BACKEND_URL}/api/Account/GetProfileData`;
export const PATCH_MOVE_TICKET_URL = (ticketId, state) =>
  `${BACKEND_URL}/api/Ticket/Move?ticketId=${ticketId}&state=${state}`;
export const POST_IMPORT_TICKET_URL = `${BACKEND_URL}/api/Ticket/Import`;

export const GET_TRANSFERS_URL = (ticketId) =>
  `${BACKEND_URL}/api/Transfer/GetTransfers?ticketId=${ticketId}`;

export const BACKGROUND = "#F1D3B3";
export const HEADER = "#C7BCA1";
export const TICKET = "#C7BCA1";
export const TICKET_HOVER = "#9e8e82";
export const TICKET_SHADOW = "#695f57";
export const GREEN_BUTTON = "#80a035";
export const DARK_BUTTON = "#65647C";
export const BACKGROUND2 = "#e8bd90";
