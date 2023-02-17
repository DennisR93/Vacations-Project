// Global State for all Followers

import { createStore } from "redux";
import FollowersModel from "../Models/FollowersModel";

// 1. Global State - the global data:
export class FollowerState {
    public followers: FollowersModel[] = [];
}

// 2. Action Type - a list of operations we can perform on the data:
export enum FollowerActionType {
    AddFollower = "AddFollower",
    DeleteFollower = "DeleteFollower"
}

// 3. Action - A single object which dispatch sends to Redux for some change:
export interface FollowersAction {
    type: FollowerActionType;
    payload: any;
}

// 4. Reducer - a function which will be invoked when calling dispatch to perform the operation
export function followersReducer(currentState = new FollowerState(), action: FollowersAction): FollowerState {

    // Duplicate current state
    const newState = { ...currentState };

    // Perform the needed operation:
    switch (action.type) {
        case FollowerActionType.AddFollower:
            newState.followers.push(action.payload);
            break;

        case FollowerActionType.DeleteFollower:
            const indexToDelete = newState.followers.findIndex(f => f.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.followers.splice(indexToDelete, 1);
            }
            break;
    }

    // Return new state
    return newState;
}

// 5. Store - manager object from Redux library which handles the entire operation:
export const followersStore = createStore(followersReducer);

