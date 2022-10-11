
export const postRegister =
    (dataObject, navigate) => async () => {
        try {
            const response = await fetch("https://localhost:7056/api/Account/Register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-control-allow-credentials": "true",
                },
                body: JSON.stringify(dataObject),
            });
            if (response.ok) {
                navigate('/login?ReturnUrl=%2Fmarket');
            }
        } catch (error) {
            console.log("RegisterServiceerror", error.message, error.data)
            throw new Error("Server error");
        }
    };