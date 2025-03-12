const apiKey = 'b516329a87d70acc2ab25ac9e8da3249';

async function getWeather() {
  const city = document.getElementById('city').value;
  if (!city) {
    alert('Please enter a city name');
    return;
  }
  fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

async function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    }, () => {
      alert('Unable to retrieve your location');
    });
  } else {
    alert('Geolocation is not supported by this browser');
  }
}

async function fetchWeatherData(apiUrl) {
  const weatherInfo = document.getElementById('weather-info');
  const cityNameElement = document.getElementById('city-name');
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');
  const humidityElement = document.createElement('p');
  const windElement = document.createElement('p');
  const iconElement = document.createElement('img'); // New element for weather icon

  // Clear previous data
  weatherInfo.style.display = 'none';
  weatherInfo.innerHTML = ''; 

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('City not found or unable to retrieve location');
    }

    const data = await response.json();
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const iconCode = data.weather[0].icon; // Get icon code

    // Update the DOM with weather data
    cityNameElement.textContent = `Weather in ${data.name}`;
    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    descriptionElement.textContent = `Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}`;

    humidityElement.textContent = `Humidity: ${humidity}%`;
    windElement.textContent = `Wind Speed: ${windSpeed} m/s`;

    // Set the weather icon (use OpenWeatherMap icon URL format)
    iconElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconElement.alt = description;
    iconElement.style.width = '100px'; // Adjust icon size as needed

    // Append weather data to the DOM
    weatherInfo.appendChild(cityNameElement);
    weatherInfo.appendChild(temperatureElement);
    weatherInfo.appendChild(descriptionElement);
    weatherInfo.appendChild(humidityElement);
    weatherInfo.appendChild(windElement);
    weatherInfo.appendChild(iconElement); // Append the icon

    weatherInfo.style.display = 'block';
  } catch (error) {
    alert(error.message);
  }
}