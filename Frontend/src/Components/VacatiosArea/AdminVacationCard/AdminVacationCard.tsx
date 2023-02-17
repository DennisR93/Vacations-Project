import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/Config";
import "./AdminVacationCard.scss";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import { VacationActionType, vacationsStore } from "../../../Redux/VacationState";


interface AdminVacationCardProps {
    vacation: VacationModel;
}

function AdminVacationCard(props: AdminVacationCardProps): JSX.Element {

    useVerifyLoggedIn();
    useVerifyAdmin();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    async function deleteVacation(vacationId: number) {
        try {
            await vacationsService.deleteVacation(vacationId);
            notifyService.success("Vacation has been deleted");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AdminVacationCard">
            <div className="Card">
                <div className="Wrapper" style={{ backgroundImage: `url(${appConfig.vacationImagesUrl + props.vacation.imageName})` }}>
                    <div className="Header">
                        <div className="Date">
                            <p className="Strokeme">Check In: {props.vacation.checkIn}</p>
                            <p className="Strokeme">Check Out: {props.vacation.checkOut}</p>
                        </div>
                        <div className="MenuContent">
                            <ul>
                                <li><NavLink to={"/vacations/edit/" + props.vacation.vacationId}>
                                    <EditIcon fontSize="small" className="EditIcon" /></NavLink>
                                </li>
                                <li><NavLink to="#" onClick={handleClickOpen}>
                                    <DeleteIcon fontSize="small" className="DeleteIcon" /></NavLink>
                                    <Dialog
                                        open={open}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="alert-dialog-slide-description">
                                        <DialogTitle>{`Are you sure you want to delete ${props.vacation.destination} vacation?`}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-slide-description">
                                                You are about to delete this vacation, are you sure you want to delete it?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Return</Button>
                                            <Button onClick={(ev) => {
                                                ev.stopPropagation();
                                                setOpen(false);
                                                deleteVacation(props.vacation.vacationId);
                                            }} startIcon={<DeleteIcon />} color="error">DELETE</Button>
                                        </DialogActions>
                                    </Dialog></li>
                            </ul>
                        </div>
                    </div>
                    <div className="Data">
                        <div className="Content">
                            <h1 className="Title Strokeme">
                                {props.vacation.destination}
                            </h1>
                            <p className="Text">
                                Description: {props.vacation.description}
                                <br />
                                Price: {props.vacation.price}$
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AdminVacationCard;
