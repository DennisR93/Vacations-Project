import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

// Verifying if the logged in user is User
function useVerifyLoggedIn() {

    const navigate = useNavigate();

    useEffect(() => {
        // If we don't heave a token:
        if (!authStore.getState().token) {
            notifyService.error("You are not logged in!");
            navigate("/login");
        }
    }, []);

}

export default useVerifyLoggedIn;