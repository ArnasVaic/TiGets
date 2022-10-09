export const LOGIN_URL = "/login";
export const POST_LOGIN_URL = (username) =>
  `https://localhost:7056/api/Account/login?Username=${username}`;
export const REGISTER_URL = "/register";
