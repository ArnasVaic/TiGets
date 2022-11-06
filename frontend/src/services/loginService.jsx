import { useNavigate } from "react-router-dom";
import {
  LOGIN_URL,
  MARKET_URL,
  POST_LOGIN_URL,
  POST_LOGOUT_URL,
} from "../constants";

export const postLogin =
  (username, password, returnUrl, navigate, setWrongPassword, setLoading) =>
  async () => {
    setLoading(true);
    setWrongPassword(false);
    try {
      const response = await fetch(POST_LOGIN_URL(username), {
        method: "POST",
        headers: {
          password: password,
        },
        credentials: "include",
      });
      if (response.ok) {
        if (!returnUrl) {
          navigate(MARKET_URL);
        } else {
          navigate(returnUrl);
        }
        setWrongPassword(false);
      } else {
        let errMsg = new TextDecoder().decode(
          (await response.body.getReader().read()).value
        );
        if (
          errMsg === "User does not exist." ||
          errMsg === "Incorrect password."
        ) {
          setWrongPassword(true);
        } else {
          alert("Oopsies!\n" + errMsg);
        }
      }
    } catch (error) {
      alert("Oops, server error");
    }
    setLoading(false);
  };

export const postLogout = (navigate) => async () => {
  try {
    const response = await fetch(POST_LOGOUT_URL, {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      navigate(LOGIN_URL);
    } else {
      let errMsg = new TextDecoder().decode(
        (await response.body?.getReader()?.read()).value
      );
      alert("Oops, something went wrong. Please try again\n" + errMsg);
    }
  } catch (error) {
    alert("Oops, server error");
  }
};
