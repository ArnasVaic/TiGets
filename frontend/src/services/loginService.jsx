export const postLogin = (username, password, returnUrl) => async () => {
  try {
    const response = await fetch(
      `https://localhost:7056/api/Account/login?Username=${username}&Password=${password}&ReturnUrl=${returnUrl}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to post the Answer");
    }
  } catch (error) {
    throw new Error("Server error");
  }
};
