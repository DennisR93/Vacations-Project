import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back!");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <div className="Glass">
                <form onSubmit={handleSubmit(send)}>

                    <h2>Login</h2>

                    <label>Username: </label>
                    <span className="Error">{formState.errors.username?.message}</span>
                    <input type="text" {...register("username", CredentialsModel.usernameValidation)} autoFocus />

                    <label>Password: </label>
                    <span className="Error">{formState.errors.password?.message}</span>
                    <input type="password" {...register("password", CredentialsModel.passwordValidation)} />

                    <button className="Btn41-43 Btn-43">Login</button>

                    <p>Admin user: <br />DennisR93 <br />password: Iwant100</p>
                    <p>User:<br /> King100 <br /> password: Please100 </p>
                </form>
            </div>

            <div className="Users Glass">
                <p>Password for users: 1234</p>
                <p>User: MariaDB</p>
                <p>User: myFunction</p>
                <p>User: TheKlodet</p>
                <p>User: DoNotShareScreen</p>
                <p>User: AssafQuestionPlease</p>
                <p>User: TheCougher</p>
            </div>

        </div>
    );
}

export default Login;
