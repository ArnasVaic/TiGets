import { LOGIN_URL, POST_REGISTER_URL } from "../constants";

export const postRegister =
  (dataObject, navigate, setErrorMsg, setLoading, setSuccess) => async () => {
    setLoading(true);
    try {
      const response = await fetch(POST_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-control-allow-credentials": "true",
        },
        body: JSON.stringify(dataObject),
      });
      if (response.ok) {
        setSuccess(true);
        navigate(LOGIN_URL);
      } else {
        let errMsg = new TextDecoder().decode(
          (await response.body.getReader().read()).value
        );
        if (errMsg.includes("PasswordTooShort")) {
          setErrorMsg("The password should be at least 6 characters long");
        } else if (errMsg.includes("PasswordRequiresNonAlphanumeric")) {
          setErrorMsg(
            "The password requires at least one non alpanumeric symbol"
          );
        } else if (errMsg.includes("PasswordRequiresDigit")) {
          setErrorMsg("The password requires at least one digit");
        } else if (errMsg.includes("PasswordRequiresLower")) {
          setErrorMsg(
            "The password requires at least one non lowercase letter"
          );
        } else if (errMsg.includes("PasswordRequiresUpper")) {
          setErrorMsg(
            "The password requires at least one non uppercase letter"
          );
        } else if (errMsg.includes("PasswordRequiresUniqueChars")) {
          setErrorMsg("The password requires at least one unique char");
        } else if (errMsg.includes("InvalidUserName")) {
          setErrorMsg("Invalid username");
        } else if (errMsg.includes("InvalidEmail")) {
          setErrorMsg("Invalid email");
        } else if (errMsg.includes("DuplicateEmail")) {
          setErrorMsg("Duplicate email");
        } else if (errMsg.includes("User with this username already exists.")) {
          setErrorMsg("User with this username already exists.");
        } else {
          alert("Oopsies!\n" + errMsg);
        }
      }
    } catch (error) {
      throw new Error("Server error");
    }
    setLoading(false);
  };

export const getInfo = (setInfoAlert, setInformation) => async () => {
  const response = await fetch("https://localhost:7056/api/Account/GetInfo", {
    method: "GET",
    credentials: "include",
  });

  response
    .text()
    .then((value) => {
      setInfoAlert(true);
      setInformation(value);
    })
    .catch((err) => {
      setInfoAlert(true);
      setInformation(
        "The information about this app cannot be provided currently."
      );
    });
};
