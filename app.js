// app.js
const apiKey = 'b516329a87d70acc2ab25ac9e8da3249'; // Your API key

function getWeather() {
  const city = document.getElementById('city').value;
  
  if (city === '') {
    alert('Please enter a city name');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      alert(error.message);
    });
}

function displayWeather(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;

  document.getElementById('city-name').textContent = `Weather in ${cityName}`;
  document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
  document.getElementById('description').textContent = `Description: ${description}`;

  document.getElementById('weather-info').style.display = 'block';
}