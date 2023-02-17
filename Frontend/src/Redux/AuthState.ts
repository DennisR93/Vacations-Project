import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";

// 1. Global State - the global data:
export class AuthState {
    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        this.token = sessionStorage.getItem("token");
        if (this.token) {
            const jwtPayload = jwtDecode(this.token);
            this.user = (jwtPayload as any).user;
        }
    }
}

// 2. Action Type - a list of operations we can perform on the data:
export enum AuthActionType {
    Register,
    Login,
    Logout
}

// 3. Action - A single object which dispatch sends to Redux for some change:
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

// 4. Reducer - a function which will be invoked when calling dispatch to perform the operation
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    // Duplicate current state
    const newState = { ...currentState };

    // Perform the needed operation:
    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.token = action.payload;
            const jwtPayload = jwtDecode(newState.token);
            newState.user = (jwtPayload as any).user;
            sessionStorage.setItem("token", newState.token);
            break;

        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            sessionStorage.removeItem("token");
            break;
    }

    // Return new state
    return newState;
}

// 5. Store - manager object from Redux library which handles the entire operation:
export const authStore = createStore(authReducer);