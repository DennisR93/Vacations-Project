import axios from "axios";
import jwtDecode from "jwt-decode";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import { VacationActionType, vacationsStore } from "../Redux/VacationState";
import appConfig from "../Utils/Config";

class AuthService {

    // Registering a new user: 
    public async register(user: UserModel): Promise<void> {

        // Send to backend the new user: 
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Backend returns token: 
        const token = response.data;

        // Send token to Redux: 
        authStore.dispatch({ type: AuthActionType.Register, payload: token });
    }

    // Login existing user: 
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send to backend the credentials: 
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Backend returns token: 
        const token = response.data;

        // Send token to Redux:
        authStore.dispatch({ type: AuthActionType.Login, payload: token });
    }

    // Logout existing user:
    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout });
        vacationsStore.dispatch({ type: VacationActionType.EmptyVacations, payload: [] })
    }

    // Get token from state
    public async getUserIdFromToken(): Promise<number> {
        const token = authStore.getState().token;
        if (!token) { return 0 };
        const decodedToken = await jwtDecode(token);
        const userId = Promise.resolve((decodedToken as any).user.userId);
        return userId;
    }

}

const authService = new AuthService();

export default authService;
