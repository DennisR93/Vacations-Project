import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import useVerifyAdminNoNotyf from "../../../Utils/useVerifyAdminNoNotyf";
import useVerifyLoggedInNoNotyf from "../../../Utils/useVerifyLoggedInNoNotyf";
import UndoIcon from '@mui/icons-material/Undo';
import "./VacationsChart.css";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function VacationsChart(): JSX.Element {

    useVerifyLoggedInNoNotyf();
    useVerifyAdminNoNotyf();

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                display: false,
            },
            title: {
                display: true,
                text: "Vacation Followers Chart",
                color: "white"
            }
        },
        scales: {
            y: {
                ticks: {
                    color: "white",
                    stepSize: 1,
                    beginAtZero: true
                }
            },
            x: {
                ticks: {
                    color: "white",
                    stepSize: 1,
                    beginAtZero: true
                }
            }
        }
    };

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        vacationsService
            .getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch((err) => notifyService.error(err));
    }, [])

    // Chart data to show by Destination and show amount on each Destination
    const data = {
        labels: vacations.map(v => v.destination),
        datasets: [
            {
                label: "Followers",
                data: vacations.map((v: VacationModel) => v.followersCount),
                backgroundColor: "white",
            }
        ],
    };



    return (
        <div className="VacationsChart">
            <NavLink to="/vacations"><UndoIcon /></NavLink>;

            <Bar options={options} data={data} />
        </div>

    );
}

export default VacationsChart;
