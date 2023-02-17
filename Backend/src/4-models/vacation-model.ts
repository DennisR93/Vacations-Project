import { UploadedFile } from "express-fileupload";
import Joi from "joi";

// Vacation Model
class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public checkIn: string;
    public checkOut: string;
    public price: number;
    public imageName: string;
    public image: UploadedFile;


    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.checkIn = vacation.checkIn;
        this.checkOut = vacation.checkOut;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(70),
        description: Joi.string().required().min(10).max(500),
        checkIn: Joi.string().required().min(2).max(20),
        checkOut: Joi.string().required().min(2).max(20),
        price: Joi.number().required().min(100).max(10000),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),
    });

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    }
}


export default VacationModel;