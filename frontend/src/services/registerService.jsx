import { LOGIN_URL, POST_REGISTER_URL } from '../constants';

export const postRegister =
    (dataObject, navigate, setErrorMsg, setIsError, setLoading) => async () => {
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
                navigate('/login');
            } else {
                let errMsg = new TextDecoder().decode(
                    (await response.body.getReader().read()).value
                );
                if (errMsg === "Failed : PasswordTooShort") {
                    setErrorMsg("The password should be at least 6 characters long");
                    setIsError(true);
                }
                else if (errMsg === "Failed : PasswordRequiresNonAlphanumeric") {
                    setErrorMsg("The password requires at least one non alpanumeric symbol ");
                    setIsError(true);
                }
                else if (errMsg === "Failed : PasswordRequiresDigit") {
                    setErrorMsg("The password requires at least one digit ");
                    setIsError(true);
                }
                else if (errMsg === "Failed : PasswordRequiresLower") {
                    setErrorMsg("The password requires at least one non lowercase letter");
                    setIsError(true);
                }
                else if (errMsg === "Failed : PasswordRequiresUpper") {
                    setErrorMsg("The password requires at least one non uppercase letter");
                    setIsError(true);
                }
                else if (errMsg === "Failed : PasswordRequiresUniqueChars") {
                    setErrorMsg("The password requires at least one unique char");
                    setIsError(true);
                }
                else if (errMsg === "Failed : InvalidUserName") {
                    setErrorMsg("Invalid username");
                    setIsError(true);
                }
                else if (errMsg === "Failed : InvalidEmail") {
                    setErrorMsg("Invalid email");
                    setIsError(true);
                }
                else if (errMsg === "Failed : DuplicateEmail") {
                    setErrorMsg("Duplicate email");
                    setIsError(true);
                }
                else if (errMsg === "User with this username already exists.") {
                    setErrorMsg("User with this username already exists.");
                    setIsError(true);
                }
                else {
                    alert("Oops, something went wrong. Please try again\n" + errMsg);
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

    response.text().then(value => {
        setInfoAlert(true);
        setInformation(value);
    }).catch(err => {
        setInfoAlert(true);
        setInformation("The information about this app cannot be provided currently.");
    });
}