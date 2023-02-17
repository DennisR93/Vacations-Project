import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { VacationActionType, vacationsStore } from "../../../Redux/VacationState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import useVerifyLoggedInNoNotyf from "../../../Utils/useVerifyLoggedInNoNotyf";
import Spinner from "../../SharedArea/Spinner/Spinner";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

    useVerifyLoggedInNoNotyf();

    let duplicateVacations: VacationModel[] = [];

    let user: UserModel = authStore.getState().user;

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [isFollow, setIsFollow] = useState<boolean>(false);

    useEffect(() => {

        // If user has role of 2 (user), shows vacations for user
        if (user?.roleId === 2) {
            vacationsStore.dispatch({ type: VacationActionType.EmptyVacations, payload: [] });
            vacationsService.getVacationsForUsers(user.userId)
                .then(vacations => setVacations(vacations))
                .catch(err => notifyService.error(err));
        }
        // Shows vacations for admin
        else {
            vacationsService.getAllVacations()
                .then(vacations => setVacations(vacations))
                .catch(err => notifyService.error(err));
        }

        // Listening to changes
        const unsubscribe = vacationsStore.subscribe(() => {
            duplicateVacations = [...vacations];
            setVacations(duplicateVacations);
        });
        return () => unsubscribe();

    }, []);

    // Function to show vacations with / without filter
    async function showVacations() {
        try {
            if (!authStore.getState().token) return;
            vacationsStore.dispatch({ type: VacationActionType.EmptyVacations, payload: [] });
            const vacations = await vacationsService.getVacationsForUsers(user.userId);
            if (isFollow) {
                setVacations(vacations.filter(v => v.isFollowing));
            }
            else {
                setVacations(vacations);
            }
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    // ReRender component on change of followers
    useEffect(() => { showVacations(); }, [isFollow]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalItems = vacations.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Pagination page handler
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        showVacations();
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = vacations.slice(startIndex, endIndex);

    return (
        <div className="VacationList">

            {vacations.length === 0 && <Spinner />}

            <div className='Greeting'>
                <h2>Vacations</h2>
                <p>Here you can find all the vacations plans we offer</p>
            </div>

            {user?.roleId === 2 && <>

                <div className="FollowersVacations">
                    <FormControlLabel
                        value="Filter"
                        control={<Switch onChange={() => setIsFollow(!isFollow)} checked={isFollow} onClick={() => handlePageChange(1)} />}
                        label="Filter"
                        labelPlacement="top"
                        color="white"
                    />
                </div>

                <div className="VacationsContainer">
                    {currentItems.map((v) => (
                        <VacationCard key={v.vacationId} vacation={v} updateVacations={() => showVacations()} />
                    ))}
                </div>

                <div className="Pagination">
                    <button className="Btn41-43 Btn-41" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages} </span>
                    <button className="Btn41-43 Btn-42" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </>}

            {user?.roleId === 1 && <>
                <NavLink to="/vacations/new" className='Add'><AddIcon fontSize='large' /></NavLink>
                <NavLink to="/vacations/chart" className='Chart'><BarChartIcon fontSize='large' /></NavLink>
                <div className="VacationsContainer">
                    {currentItems.map((va) => (
                        <AdminVacationCard key={va.vacationId} vacation={va} />
                    ))}
                </div>

                <div className="Pagination">
                    <button className="Btn41-43 Btn-41" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages} </span>
                    <button className="Btn41-43 Btn-42" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </>}

        </div>
    );
}

export default VacationList;
