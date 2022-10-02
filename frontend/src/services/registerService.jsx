

export const postRegister =
    (dataObject, navigate, returnUrl) => async () => {
        try {
            const response = await fetch(`https://localhost:7056/api/Account/Register/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataObject)
            }).then(() => { console.log("NewPostMade") });
            if (response.ok) {
                navigate(returnUrl);
            } 
        } catch (error) {
            throw new Error("Server error");
        }
    };
