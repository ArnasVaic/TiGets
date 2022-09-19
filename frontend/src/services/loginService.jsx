export const postLogin =
  (username, password, returnUrl, navigate, setWrongPassword) => async () => {
    try {
      const response = await fetch(
        `https://localhost:7056/api/Account/login?Username=${username}&Password=${password}`,
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
