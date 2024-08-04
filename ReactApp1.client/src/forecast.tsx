import { useEffect, useState } from 'react';
import './App.css';

interface IForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function Forecast() {
    const [forecast, setForecasts] = useState<IForecast>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecast === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>

                <tr key={forecast.date}>
                    <td>{forecast.date}</td>
                    <td>{forecast.temperatureC}</td>
                    <td>{forecast.temperatureF}</td>
                    <td>{forecast.summary}</td>
                </tr>

            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('weather/1');
        const data = await response.json();
        setForecasts(data);
    }
}

export default Forecast;