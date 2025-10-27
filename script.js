const apiKey = "bf0e192628527d84a7c9ea2fdd63c6e2"; // Replace with your OpenWeatherMap API key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(err => {
      weatherInfo.innerHTML = `<p>City not found.</p>`;
    });
});

function displayWeather(data) {
  if (data.cod !== 200) {
    weatherInfo.innerHTML = `<p>City not found.</p>`;
    return;
  }

  weatherInfo.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
}
