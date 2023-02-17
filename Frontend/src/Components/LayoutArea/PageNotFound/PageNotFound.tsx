import "./PageNotFound.css";
import notFoundImage from "../../../Assets/Images/404.png";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <h2>Oh oh, Your vacation has 404!</h2>
            <h3>Well, it seems you went to the wrong place... We hope this won't happen:</h3>
            <img src={notFoundImage} />
        </div>
    );
}

export default PageNotFound;
