import "./Spinner.css";
import imageSource from "../../../Assets/Images/loader.gif";

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
            <img src={imageSource} />
        </div>
    );
}

export default Spinner;
