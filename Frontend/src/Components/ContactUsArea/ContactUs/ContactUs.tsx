import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import "./ContactUs.css";

function ContactUs(): JSX.Element {
    useVerifyLoggedIn();
    return (
        <div className="ContactUs">
            <h3 className="Strokeme">Contact us</h3>
            <p className="Strokeme">We offer several ways to contact us:</p>
            <div className="Glass">
                <a href="https://www.facebook.com/dennis.rabinovitch/" target="_blank"><FacebookIcon fontSize="large" /></a>
                <a href="https://www.instagram.com/dennis_rabinovitch/?igshid=YmMyMTA2M2Y%3D" target="_blank"><InstagramIcon fontSize="large" /></a>
                <a href="https://www.linkedin.com/in/dennis-rabinovitch/" target="_blank"><LinkedInIcon fontSize="large" /></a>
                <a href="https://github.com/DennisR93" target="_blank"><GitHubIcon fontSize="large" /></a>
            </div>

            <p className="Strokeme">We usually answer within 24Hours. Will try to answer any question asked</p>
        </div>
    );
}

export default ContactUs;
