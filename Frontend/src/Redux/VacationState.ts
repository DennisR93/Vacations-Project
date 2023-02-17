// Global State for all Vacations

import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. Global State - the global data:
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Action Type - a list of operations we can perform on the data:
export enum VacationActionType {
    FetchVacations = "FetchVacation",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    EmptyVacations = "EmptyVacations"
}

// 3. Action - A single object which dispatch sends to Redux for some change:
export interface VacationsAction {
    type: VacationActionType;
    payload: any;
}

// 4. Reducer - a function which will be invoked when calling dispatch to perform the operation
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    // Duplicate current state
    const newState = { ...currentState };

    switch (action.type) {

        case VacationActionType.FetchVacations: // Here the payload is a list of vacations (VacationModel[])
            newState.vacations = action.payload;
            break;

        case VacationActionType.AddVacation: // Here the payload is a vacation to add (VacationModel)
            newState.vacations.push(action.payload);
            break;

        case VacationActionType.UpdateVacation: // Here the payload is a vacation to update (VacationModel)
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case VacationActionType.DeleteVacation: // Here the payload is the id of the vacation to delete (number)
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;

        // Empty the state to trigger rerender on component
        case VacationActionType.EmptyVacations:
            newState.vacations = [];
            break;
    }

    // Return new state
    return newState;
}

// 5. Store - manager object from Redux library which handles the entire operation:
export const vacationsStore = createStore(vacationsReducer);

