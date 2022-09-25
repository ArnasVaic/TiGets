import { POST_LOGIN_URL } from '../constants';

export const postLogin =
  (username, password, returnUrl, navigate, setWrongPassword) => async () => {
    try {
      const response = await fetch(
        POST_LOGIN_URL(username, password),
        {
          method: "POST",
        }
      );
      if (response.ok) {
        navigate(returnUrl);
        setWrongPassword(false);
      } else {
        setWrongPassword(true);
      }
    } catch (error) {
      throw new Error("Server error");
    }
  };
