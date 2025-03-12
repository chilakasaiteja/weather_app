const apiKey = 'b516329a87d70acc2ab25ac9e8da3249';

async function getWeather() {
  const city = document.getElementById('city').value;
  if (!city) {
    alert('Please enter a city name');
    return;
  }
  fetchWeatherData(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
}

async function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherData(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    }, () => {
      alert('Unable to retrieve your location');
    });
  } else {
    alert('Geolocation is not supported by this browser');
  }
}

async function fetchWeatherData(apiUrl) {
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = ''; // Clear previous data

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('City not found or unable to retrieve location');
    }

    const data = await response.json();
    const city = data.city.name;
    const forecastList = data.list;

    // Display 5-day forecast (one forecast per day at 12:00 PM)
    for (let i = 0; i < forecastList.length; i += 8) {
      const forecast = forecastList[i]; // Data for one day (every 8th element corresponds to a new day)
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      const temperature = forecast.main.temp;
      const description = forecast.weather[0].description;
      const iconCode = forecast.weather[0].icon;

      // Create elements for each day's forecast
      const forecastElement = document.createElement('div');
      forecastElement.classList.add('forecast-day');

      const dateElement = document.createElement('p');
      dateElement.textContent = `Date: ${date}`;
      
      const tempElement = document.createElement('p');
      tempElement.textContent = `Temp: ${temperature}°C`;

      const descElement = document.createElement('p');
      descElement.textContent = `Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}`;

      const iconElement = document.createElement('img');
      iconElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      iconElement.alt = description;
      iconElement.style.width = '50px'; // Adjust icon size

      // Append elements to the forecast div
      forecastElement.appendChild(dateElement);
      forecastElement.appendChild(tempElement);
      forecastElement.appendChild(descElement);
      forecastElement.appendChild(iconElement);

      // Append the forecast to the weatherInfo div
      weatherInfo.appendChild(forecastElement);
    }
  } catch (error) {
    alert(error.message);
  }
}