export const LOGIN_URL = "/login";
export const POST_LOGIN_URL = (username, password) => `https://localhost:7056/api/Account/login?Username=${username}&Password=${password}`;