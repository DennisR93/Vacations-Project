import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Header from "../Header/Header";
import "./Menu.css";

function Menu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return () => unsubscribe();
    }, []);


    return (
        <div className="Menu">
            <div>
                <NavLink to="/home">Home</NavLink>
                <span> | </span>
                <NavLink to="/vacations">Vacations</NavLink>
                <span> | </span>
                <NavLink to="/about">About</NavLink>
                <span> | </span>
                <NavLink to="/contactus">Contact Us</NavLink>
            </div>
            <div>
                <AuthMenu />
            </div>
        </div>
    );
}

export default Menu;
