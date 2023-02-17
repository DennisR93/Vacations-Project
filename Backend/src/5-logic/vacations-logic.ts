import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { OkPacket } from "mysql";

// Get all vacations for Admin
async function getAllVacations(): Promise<VacationModel[]> {

    // SQL Query
    const sql = `
    SELECT DISTINCT
            V.vacationId, destination, description, DATE_FORMAT(checkIn, '%Y-%m-%d') AS checkIn, DATE_FORMAT(checkOut, '%Y-%m-%d') AS checkOut, price, imageName,
            EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId) AS 	isFollowing,
            COUNT(F.userId) AS followersCount
        FROM vacations AS V LEFT JOIN followers AS F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY V.checkIn DESC;
    `;

    // Execute
    const vacations = await dal.execute(sql);

    return vacations;
}

// Get all vacations for users
async function getVacationsForUser(userId: number) {

    // Query: 
    const sql = `
        SELECT DISTINCT
            V.vacationId, destination, description, DATE_FORMAT(checkIn, '%Y-%m-%d') AS checkIn, DATE_FORMAT(checkOut, '%Y-%m-%d') AS checkOut, price, imageName,
            EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS 	isFollowing,
            COUNT(F.userId) AS followersCount
        FROM vacations AS V LEFT JOIN followers AS F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY V.checkIn DESC
    `;

    // Execute:
    const vacations = await dal.execute(sql, [userId]);

    // Return all vacations:
    return vacations;

}

// Get one vacation
async function getOneVacation(vacationId: number): Promise<VacationModel> {

    // Query
    const sql = `SELECT * from vacations WHERE vacationId = ?`;

    // Execute
    const vacations = await dal.execute(sql, [vacationId]);

    // Get the first element from the array
    const vacation = vacations[0];

    // Return error if no vacation found
    if (!vacation) throw new ResourceNotFoundErrorModel(vacationId);

    return vacation;


}

// Add new vacation: 
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    //Validation:
    const error = vacation.validate();
    if (error) throw new ValidationErrorModel(error);

    // Save image to disk if exist:
    if (vacation.image) {

        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;

    }

    // Query:
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;

    // Execute:
    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.checkIn, vacation.checkOut, vacation.price, vacation.imageName]);

    // Insert vacations id
    vacation.vacationId = info.insertId;

    return vacation;

}

// Update vacation
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    // Validate if there is a vacation and return error
    const error = vacation.validate();
    if (error) throw new ValidationErrorModel(error);

    // Check for image
    if (vacation.image) {
        if (fs.existsSync("./src/1-assets/images/" + vacation.imageName)) {
            fs.unlinkSync("./src/1-assets/images/" + vacation.imageName);
        }
        // Substring the vacations name until .
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        // Add UUID (Unique image name) + format after .
        vacation.imageName = uuid() + extension;
        // Move saved image
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        // Delete vacation image
        delete vacation.image;
    }

    // SQL Query
    const sql = "UPDATE vacations SET destination = ?, description = ?, checkIn = ?, checkOut = ?, price = ?, imageName = ? WHERE vacationId = ?";

    // Execute:
    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.checkIn, vacation.checkOut, vacation.price, vacation.imageName, vacation.vacationId]);

    // If there is no vacation to update will throw error
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId);
    return vacation;
}

// Delete vacation
async function deleteVacation(vacationId: number): Promise<void> {
    // Query:
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;
    // Execute
    const info: OkPacket = await dal.execute(sql, [vacationId]);
    // If no vacation to delete return error
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationId);
}





export default {
    getAllVacations,
    getVacationsForUser,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation
};
