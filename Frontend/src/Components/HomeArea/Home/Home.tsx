import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import homeImage from "../../../Assets/Images/home.png";
import "./Home.css";
import Header from "../../LayoutArea/Header/Header";

function Home(): JSX.Element {

    useVerifyLoggedIn();

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="Home">
            {user && <>
                <Header />
                <span className="Strokeme">Hello {user.firstName} {user.lastName}!</span>
                <p className="Strokeme">We are glad you chose our company to plan your next amazing trip to various locations!</p>
                <p className="Strokeme">We suggest to read every vacations description carefully!</p>
                <img src={homeImage} />
            </>}

        </div>
    );
}

export default Home;
