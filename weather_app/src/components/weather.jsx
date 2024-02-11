import { useState, useEffect } from 'react';
import Search from './utils/search';

export default function Weather() {
	const [search, setSearch] = useState('');
	const [weatherData, setWeatherData] = useState(null);
	const [loading, setLoading] = useState(false);

	const apiKey = import.meta.env.VITE_APP_apiKey;
	console.log(apiKey);
	async function fetchWeatherData(param) {
		setLoading(true);
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${apiKey}`,
			);

			const data = await res.json();
			if (data) {
				setWeatherData(data);
				setLoading(false);
			}
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	}

	async function handleSearch() {
		fetchWeatherData(search);
	}

	function getCurrentDate() {
		return new Date().toLocaleDateString('en-GB', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
	}

	useEffect(() => {
		fetchWeatherData('Dubai');
	}, []);

	console.log(weatherData);
	return (
		<div>
			<Search
				search={search}
				setSearch={setSearch}
				handleSearch={handleSearch}
			/>
			{loading ? (
				<div className="loading">Loading Weather data</div>
			) : (
				<>
					<div className="city-name">
						<h2>
							{weatherData?.name}, <span>{weatherData?.sys?.country}</span>
						</h2>
					</div>
					<div className="date">
						<span>{getCurrentDate()}</span>
					</div>
					<div className="temp">{weatherData?.main?.temp}</div>
					<p className="description">
						{weatherData && weatherData.weather && weatherData.weather[0]
							? weatherData.weather[0].description
							: ''}
					</p>
					<div className="weather-info">
						<div className="column">
							<div>
								<p className="wind">{weatherData?.wind?.speed}</p>
								<p>Wind Speed</p>
							</div>
						</div>
						<div className="column">
							<div>
								<p className="humidity">{weatherData?.main?.humidity}%</p>
								<p>Humidity</p>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

// example return data from https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
//     {
//  "coord": {
//    "lon": -0.13,
//    "lat": 51.51
//  },
//  "weather": [
//    {
//      "id": 300,
//      "main": "Drizzle",
//      "description": "light intensity drizzle",
//      "icon": "09d"
//    }
//  ],
//  "base": "stations",
//  "main": {
//    "temp": 280.32,
//    "pressure": 1012,
//    "humidity": 81,
//    "temp_min": 279.15,
//    "temp_max": 281.15
//  },
//  "visibility": 10000,
//  "wind": {
//    "speed": 4.1,
//    "deg": 80
//  },
//  "clouds": {
//    "all": 90
//  },
//  "dt": 1485789600,
//  "sys": {
//    "type": 1,
//    "id": 5091,
//    "message": 0.0103,
//    "country": "GB",
//    "sunrise": 1485762037,
//    "sunset": 1485794875
//  },
//  "id": 2643743,
//  "name": "London",
//  "cod": 200
//  }
