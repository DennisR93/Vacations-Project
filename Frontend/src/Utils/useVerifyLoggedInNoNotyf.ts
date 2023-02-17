import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";

// Custom Hook

function useVerifyLoggedInNoNotyf() {

    const navigate = useNavigate();

    useEffect(() => {
        // If we don't heave a token:
        if (!authStore.getState().token) {
            navigate("/login");
        }
    }, []);

}

export default useVerifyLoggedInNoNotyf;