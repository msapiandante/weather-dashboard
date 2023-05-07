const apiKey = '733b95829a33c6d5f7357c456d173759';

// Get references to HTML elements
const searchForm = document.querySelector('#search-form');
const cityInput = document.querySelector('#city-input');
const searchHistory = document.querySelector('#search-history');
const currentWeather = document.querySelector('#current-weather');
const forecast = document.querySelector('#forecast');

// Function to get weather data for a given city
async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to display current weather data for a given city
function showCurrentWeather(data) {
  currentWeather.innerHTML = `
    <h2>${data.name}</h2>
    <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
    <p>Temperature: ${data.main.temp}&deg;C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} km/h</p>
  `;
}

// Function to get forecast data for a given city
async function getForecastData(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to display forecast data for a given city
function showForecast(data) {
  let html = '';
  data.list.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
    const time = date.toLocaleString('default', { hour: 'numeric', hour12: true });
    html += `
      <div class="forecast-item">
        <p>${dayOfWeek} ${time}</p>
        <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
        <p>Temperature: ${forecast.main.temp}&deg;C</p>
        <p>Humidity: ${forecast.main.humidity}%</p>
        <p>Wind Speed: ${forecast.wind.speed} km/h</p>
      </div>
    `;
  });
  forecast.innerHTML = html;
}

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    // Get current weather data and display it
    const currentData = await getWeatherData(city);
    showCurrentWeather(currentData);

    // Get forecast data and display it
    const forecastData = await getForecastData(city);
    showForecast(forecastData);

    // Add city to search history
    const listItem = document.createElement('li');
    listItem.textContent = city;
    searchHistory.appendChild(listItem);

    // Clear input field
    cityInput.value = '';
  }
}

// Event listener for form submission
searchForm.addEventListener('submit', handleFormSubmit);