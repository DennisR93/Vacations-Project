import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import FollowersModel from "../../../Models/FollowersModel";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import followersService from "../../../Services/FollowersService";
import notifyService from "../../../Services/NotifyService";
import appConfig from "../../../Utils/Config";
import "./VacationCard.scss";


interface VacationCardProps {
    vacation: VacationModel;
    updateVacations: () => void;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [followers, setFollowers] = useState(props.vacation.followersCount);
    const [isFollowing, setIsFollowing] = useState(props.vacation.isFollowing);
    const { updateVacations } = props;

    // Function to add or delete follower
    async function isFollow() {
        try {
            const vacationId = props.vacation.vacationId;
            const userId = await authService.getUserIdFromToken();
            const follower = new FollowersModel();
            follower.vacationId = vacationId;
            follower.userId = userId;

            if (!isFollowing) {
                setIsFollowing(1)
                setFollowers(followers + 1)
                await followersService.addFollower(follower);
            } else {
                setIsFollowing(0);
                setFollowers(followers - 1);
                await followersService.deleteFollower(follower);
                updateVacations();
            }
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="VacationCard">
            <div className="Card">
                <div className="Wrapper" style={{ backgroundImage: `url(${appConfig.vacationImagesUrl + props.vacation.imageName})` }}>
                    <div className="Header">
                        <div className="Date">
                            <p className="Strokeme">Check In: {props.vacation.checkIn}</p>
                            <p className="Strokeme">Check Out: {props.vacation.checkOut}</p>
                        </div>
                        <ul className="MenuContent">
                            <li><Checkbox checked={isFollowing === 1 ? true : false}
                                onClick={() => { isFollow() }} sx={{
                                    color: 'white'
                                }} icon={<BookmarkBorderIcon fontSize="small" />}
                                checkedIcon={<BookmarkIcon sx={{ color: 'white' }} fontSize="small" />} ></Checkbox></li>
                            <li>{<FavoriteIcon fontSize="small" />}<span className="FollowersSpan">{followers}</span> </li>
                        </ul>
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

export default VacationCard;
