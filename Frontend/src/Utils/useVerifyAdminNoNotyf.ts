import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../Models/UserModel";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

function useVerifyAdminNoNotyf() {

    const navigate = useNavigate();
    useEffect(() => {
        let user: UserModel = authStore.getState().user;
        if (user?.roleId === 2) {
            navigate("/home");
        }
    })
}

export default useVerifyAdminNoNotyf;