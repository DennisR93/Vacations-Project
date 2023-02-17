import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }
    return (
        <div className="Register">

            <div className="Glass">
                <form onSubmit={handleSubmit(send)}>

                    <h2>Register</h2>

                    <label>First name: </label>
                    <span className="Error">{formState.errors.firstName?.message}</span>
                    <input type="text" {...register("firstName", UserModel.firstNameValidation)} />

                    <label>Last name: </label>
                    <span className="Error">{formState.errors.lastName?.message}</span>
                    <input type="text" {...register("lastName", UserModel.lastNameValidation)} />

                    <label>Username: </label>
                    <span className="Error">{formState.errors.username?.message}</span>
                    <input type="text" {...register("username", UserModel.usernameValidation)} />

                    <label>Password: </label>
                    <span className="Error">{formState.errors.password?.message}</span>
                    <input type="password" {...register("password", UserModel.passwordValidation)} />

                    <button className="Btn41-43 Btn-43">Register</button>

                </form>
            </div>

        </div>
    );
}

export default Register;
