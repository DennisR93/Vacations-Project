import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import "./About.css";

function About(): JSX.Element {

    // Check if user is logged in
    useVerifyLoggedIn();

    return (
        <div className="About">

            <h2 className="Strokeme">About me</h2>
            <h3 className="Strokeme">Hello!</h3>

            <p>My name is Dennis, I'm a Full Stack WEB developer graduate from John Bryce college,</p>

            <p> former disciplinary NCO at the IADF Anti Air Batteries.</p>

            <p>This project is a learning project, that will continue to develop and evolve as I will
                keep learning more technologies and services that will be help me to improve this
                project.</p>

            <p>This project is at my GitHub library (Link at the footer).<br />

                Keep checking on to see how this site evolves.</p>



        </div >
    );
}

export default About;
