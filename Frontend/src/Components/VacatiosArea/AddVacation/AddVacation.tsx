import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        try {
            if (new Date(vacation.checkIn) > new Date(vacation.checkOut)) return notifyService.error("Check Out date can't be greater than Check In date");
            await vacationsService.addVacation(vacation);
            notifyService.success("Vacation has been successfully added");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    const [file, setFile] = useState<File>(null);
    const changeHandler = (e: any) => {
        const file1 = e.target.files[0];
        setFile(file1);
    }


    return (
        <div className="AddVacation Glass">
            <div className="Glass">
                <form onSubmit={handleSubmit(send)}>

                    <h2>Add Vacation</h2>

                    <label>Destination: </label>
                    <span className="Error">{formState.errors.destination?.message}</span>
                    <input type="text" {...register("destination", VacationModel.destinationValidation)} />


                    <label>Description: </label>
                    <span className="Error">{formState.errors.description?.message}</span>
                    <input type="text" {...register("description", VacationModel.descriptionValidation)} />

                    <label>Check In: </label>
                    <span className="Error">{formState.errors.checkIn?.message}</span>
                    <input type="date" {...register("checkIn", VacationModel.checkInValidation)} />

                    <label>Check Out: </label>
                    <span className="Error">{formState.errors.checkOut?.message}</span>
                    <input type="date" {...register("checkOut", VacationModel.checkOutValidation)} />

                    <label>Price: </label>
                    <span className="Error">{formState.errors.price?.message}</span>
                    <input type="number" {...register("price", VacationModel.priceValidation)} />

                    <label>Image: </label>
                    <span className="Error">{formState.errors.image?.message}</span>
                    <input type="file" accept="image/*" onChangeCapture={changeHandler}
                        {...register("image", VacationModel.imageValidation)} />

                    <button className="Btn41-43 Btn-43">Add</button>

                </form>

            </div>

            <div className="SelectedImage">
                {file && <img src={URL.createObjectURL(file)} />}
            </div>
        </div>
    );
}

export default AddVacation;
