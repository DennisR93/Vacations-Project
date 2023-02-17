import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { authStore } from "../Redux/AuthState";
import { VacationActionType, vacationsStore } from "../Redux/VacationState";
import appConfig from "../Utils/Config";

class VacationsService {

    // Get all vacations for Admin
    public async getAllVacations(): Promise<VacationModel[]> {

        // Get vacations state
        let vacations = vacationsStore.getState().vacations;

        // Check if the vacations length is 0 (no vacations)
        if (vacations.length === 0) {

            // Send request to server
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

            // Get response
            vacations = response.data;

            // Redux dispatch
            vacationsStore.dispatch({ type: VacationActionType.FetchVacations, payload: vacations });
        }

        return vacations;
    }

    // Get one vacation from all vacations
    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        // Checking vacations state
        let vacations = vacationsStore.getState().vacations;

        // Going trough array finding the needed vacation by ID
        let vacation = vacations.find(v => v.vacationId === vacationId);

        // If there is no vacation in global state, we send request to server
        if (!vacation) {
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);
            vacation = response.data;
        }

        return vacation;
    }

    // Add vacation
    public async addVacation(vacation: VacationModel): Promise<void> {

        // Using form data to send a form with file
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("checkIn", vacation.checkIn);
        myFormData.append("checkOut", vacation.checkOut);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image[0]);

        // Sending request to server
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData);

        // Getting the response
        const addedVacation = response.data;

        // Redux dispatch
        vacationsStore.dispatch({ type: VacationActionType.AddVacation, payload: addedVacation });
    }

    // Update vacation
    public async updateVacation(vacation: VacationModel): Promise<void> {

        // Using form data to send a form with file
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("checkIn", vacation.checkIn);
        myFormData.append("checkOut", vacation.checkOut);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image[0]);

        // Sending request to server
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, myFormData);

        // Getting the response
        const updatedVacation = response.data;

        // Redux dispatch
        vacationsStore.dispatch({ type: VacationActionType.UpdateVacation, payload: updatedVacation });
    }

    // Delete vacation
    public async deleteVacation(vacationId: number): Promise<void> {
        // Sending request to server
        await axios.delete<void>(appConfig.vacationsUrl + vacationId);

        // Redux dispatch 
        vacationsStore.dispatch({ type: VacationActionType.DeleteVacation, payload: vacationId });
    }

    // Get all vacations for user by userId
    public async getVacationsForUsers(userId: number): Promise<VacationModel[]> {

        // Get vacations state
        let vacations = vacationsStore.getState().vacations;

        // If there are no vacations in global state, sending request to the server
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl + userId);
            vacations = response.data;
            vacationsStore.dispatch({ type: VacationActionType.FetchVacations, payload: vacations });
        }
        return vacations;
    }
}

const vacationsService = new VacationsService();

export default vacationsService;