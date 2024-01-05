const apiKey = 'ea480ff9fe7a412ab1a181744232212';
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

async function getWeatherByLocation(location) {
    const url = `${apiUrl}?key=${apiKey}&q=${encodeURIComponent(location)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Unable to fetch weather data');
        }

        const data = await response.json();
        return {data};
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return null;
    }
} 

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === 'f' && toUnit === 'c') {
        return (value - 32) * 5/9;
    } else if (fromUnit === 'c' && toUnit === 'f') {
        return (value * 9/5) + 32;
    } else {
        return value;
    }
}

function displayWeatherData(weatherData) {
    const weatherInfoElement = document.getElementById('weatherInfo');

    if(weatherData) {
        const temperatureCelsius = weatherData.data.current.temp_c;
        const temperatureFahrenheit = weatherData.data.current.temp_f;

        const convertedTemperatureCelsius = convertTemperature(
            'f',
            'c'
        );

        weatherInfoElement.innerHTML = `
        <p>Location: ${weatherData.data.location.name}</p>
        <p>Celsius: ${temperatureCelsius.toFixed(2)}°C</p>
        <p>Fahrenheit: ${temperatureFahrenheit.toFixed(2)}°F</p>
        <p>Condition: ${weatherData.data.current.condition.text}</p>
        <p>Humidity: ${weatherData.data.humidity}%</p>
        <p>Wind Speed: ${weatherData.data.current.wind_kph} km/h</p>
    `;
    } else {
        weatherInfoElement.innerHTML = 'No weather data available.';
    }
}

function getWeather() {
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value.trim();

    if (location !== '') {
        getWeatherByLocation(location)
        .then((weatherData) => displayWeatherData(weatherData, 'c'))
        .catch((error) => console.error('Error:', error.message));
    } else {
        alert('Please enter a location.');
    }
}

const button = document.getElementById('getWeatherButton');
button.addEventListener('click', getWeather);