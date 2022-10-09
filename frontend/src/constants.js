export const LOGIN_URL = "/login";
export const POST_LOGIN_URL = (username) =>
  `https://localhost:7056/api/Account/login?Username=${username}`;
export const REGISTER_URL = "/register";
export const PROFILE_URL = "/profile";
export const MARKET_URL = "/market";
export const PATCH_BUY_URL = (ticketId) =>
  `https://localhost:7056/api/Ticket/buy?TicketId=${ticketId}`;
export const GET_MARKET_TICKETS =
  "https://localhost:7056/api/Ticket/getTicketsOnTheMarket";
