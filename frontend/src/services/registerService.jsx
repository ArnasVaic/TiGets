

export const postRegister =
    (dataObject, navigate) => async () => {
        try {
            const response = await fetch(`https://localhost:7056/api/Account/Register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataObject),
                
            }).then(() => { console.log("NewPostMade") });
            if (response.ok) {
                navigate('/login?ReturnUrl=%2Fmarket');
            } 
        } catch (error) {
            console.log("registerServiceerror", error.message)
            throw new Error("Server error");
        }
    };
