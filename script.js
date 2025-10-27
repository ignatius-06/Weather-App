const apiKey = "bf0e192628527d84a7c9ea2fdd63c6e2"; // Replace with your OpenWeatherMap key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    showWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p class="error">${error.message}</p>`;
    weatherInfo.classList.add("show");
  }
}

function showWeather(data) {
  const { name, main, weather } = data;
  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
    <p>${weather[0].main} - ${weather[0].description}</p>
    <p>🌡️ ${main.temp}°C</p>
    <p>💧 Humidity: ${main.humidity}%</p>
  `;
  weatherInfo.classList.add("show");
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});
