import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import useVerifyAdminNoNotyf from "../../../Utils/useVerifyAdminNoNotyf";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    useVerifyLoggedIn();
    useVerifyAdminNoNotyf();

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const id = +params.vacationId; // Same name as router parameter.
        vacationsService.getOneVacation(id)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("checkIn", new Date(vacation.checkIn).toISOString().split('T')[0]);
                setValue("checkOut", new Date(vacation.checkOut).toISOString().split('T')[0]);
                setValue("price", vacation.price);
                setValue("image", vacation.image);

            })
            .catch(err => notifyService.error(err));
    }, []);

    async function send(vacation: VacationModel) {
        try {
            if (new Date(vacation.checkIn) > new Date(vacation.checkOut)) return notifyService.error("Check Out date can't be greater than Check In date");
            await vacationsService.updateVacation(vacation);
            notifyService.success("Vacation has been successfully updated");
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
        <div className="EditVacation">
            <div className="Glass">
                <form onSubmit={handleSubmit(send)}>

                    <h2>Edit Vacation</h2>

                    <label>Destination: </label>
                    <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                    <span className="Error">{formState.errors.destination?.message}</span>

                    <label>Description: </label>
                    <input type="text" {...register("description", VacationModel.descriptionValidation)} />
                    <span className="Error">{formState.errors.description?.message}</span>

                    <label>Check In: </label>
                    <input type="date" {...register("checkIn", VacationModel.checkInValidation)} />
                    <span className="Error">{formState.errors.checkIn?.message}</span>

                    <label>Check Out: </label>
                    <input type="date" {...register("checkOut", VacationModel.checkOutValidation)} />
                    <span className="Error">{formState.errors.checkOut?.message}</span>

                    <label>Price: </label>
                    <input type="number" {...register("price", VacationModel.priceValidation)} />
                    <span className="Error">{formState.errors.price?.message}</span>

                    <label>Image: </label>
                    <input type="file" accept="image/*" onChangeCapture={changeHandler}{...register("image", VacationModel.imageValidation)} />
                    <span className="Error">{formState.errors.image?.message}</span>


                    <button className="Btn41-43 Btn-43">Update</button>

                </form>
            </div>
            <div className="SelectedImage">
                {file && <img src={URL.createObjectURL(file)} />}
            </div>

        </div>
    );
}

export default EditVacation;
