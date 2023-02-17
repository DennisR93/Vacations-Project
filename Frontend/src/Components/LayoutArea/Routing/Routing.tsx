import { Navigate, Route, Routes } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import About from "../../AboutArea/About/About";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import ContactUs from "../../ContactUsArea/ContactUs/ContactUs";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacatiosArea/AddVacation/AddVacation";
import EditVacation from "../../VacatiosArea/EditVacation/EditVacation";
import VacationList from "../../VacatiosArea/VacationList/VacationList";
import VacationsChart from "../../VacatiosArea/VacationsChart/VacationsChart";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/vacations" element={<VacationList />} />
                <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />
                <Route path="/vacations/new" element={<AddVacation />} />
                <Route path="/vacations/chart" element={<VacationsChart />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/" element={(authStore.getState().token) ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
