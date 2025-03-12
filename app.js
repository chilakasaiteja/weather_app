const apiKey = 'b516329a87d70acc2ab25ac9e8da3249';

async function getWeather() {
  const city = document.getElementById('city').value;
  const weatherInfo = document.getElementById('weather-info');
  const cityNameElement = document.getElementById('city-name');
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');
  const humidityElement = document.createElement('p'); // New element for humidity
  const windElement = document.createElement('p'); // New element for wind speed

  // Clear previous data
  weatherInfo.style.display = 'none';
  cityNameElement.textContent = '';
  temperatureElement.textContent = '';
  descriptionElement.textContent = '';
  weatherInfo.innerHTML = ''; // Clear previous elements inside the weather info div

  if (city === '') {
    alert('Please enter a city name');
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity; // Humidity data
    const windSpeed = data.wind.speed;   // Wind speed data

    // Update the DOM with weather data
    cityNameElement.textContent = `Weather in ${data.name}`;
    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    descriptionElement.textContent = `Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}`;

    // Add new data for humidity and wind speed
    humidityElement.textContent = `Humidity: ${humidity}%`;
    windElement.textContent = `Wind Speed: ${windSpeed} m/s`;

    // Append humidity and wind elements to weather info
    weatherInfo.appendChild(cityNameElement);
    weatherInfo.appendChild(temperatureElement);
    weatherInfo.appendChild(descriptionElement);
    weatherInfo.appendChild(humidityElement);
    weatherInfo.appendChild(windElement);

    weatherInfo.style.display = 'block';
  } catch (error) {
    alert(error.message);
  }
}