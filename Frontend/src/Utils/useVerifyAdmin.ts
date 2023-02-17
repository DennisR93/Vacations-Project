import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../Models/UserModel";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

// Verifying if the logged in user is Admin
function useVerifyAdmin() {

    const navigate = useNavigate();
    useEffect(() => {
        let user: UserModel = authStore.getState().user;
        if (user?.roleId === 2) {
            notifyService.error("You are not Admin!");
            navigate("/home");
        }
    })
}

export default useVerifyAdmin;