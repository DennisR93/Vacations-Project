import axios from "axios";
import FollowersModel from "../Models/FollowersModel";
import { FollowerActionType, followersStore } from "../Redux/FollowerState";
import appConfig from "../Utils/Config";

class FollowersService {

    public async addFollower(follower: FollowersModel): Promise<void> {

        // Add follower
        const response = await axios.post<FollowersModel>(appConfig.followersUrl, follower);

        // Response
        const addedFollower = response.data;

        // Redux dispatch
        followersStore.dispatch({ type: FollowerActionType.AddFollower, payload: addedFollower });
    }

    public async deleteFollower(follower: FollowersModel): Promise<void> {

        // Delete follower
        await axios.delete<void>(appConfig.followersUrl + follower.vacationId + "/" + follower.userId);

        // Redux dispatch
        followersStore.dispatch({ type: FollowerActionType.DeleteFollower, payload: follower });
    }
}

const followersService = new FollowersService();

export default followersService;