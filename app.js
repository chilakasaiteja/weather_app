const apiKey = 'b516329a87d70acc2ab25ac9e8da3249';

async function getWeather() {
  const city = document.getElementById('city').value;
  const weatherInfo = document.getElementById('weather-info');
  const cityNameElement = document.getElementById('city-name');
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');

  // Clear previous error or weather data
  weatherInfo.style.display = 'none';
  cityNameElement.textContent = '';
  temperatureElement.textContent = '';
  descriptionElement.textContent = '';

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

    // Update the DOM with weather data
    cityNameElement.textContent = `Weather in ${data.name}`;
    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    descriptionElement.textContent = `Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}`;
    weatherInfo.style.display = 'block';
  } catch (error) {
    alert(error.message);
  }
}