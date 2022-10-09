import { POST_LOGIN_URL } from "../constants";

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
      });
      if (response.ok) {
        navigate(returnUrl);
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
          alert("Oops, something went wrong. Please try again");
        }
      }
    } catch (error) {
      alert("Oops, server error");
    }
    setLoading(false);
  };
