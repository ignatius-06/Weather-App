const apiKey = "bf0e192628527d84a7c9ea2fdd63c6e2"; // Replace with your OpenWeatherMap API key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const weatherCard = document.getElementById("weatherCard");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => showWeather(data))
    .catch(err => {
      weatherInfo.innerHTML = `<p>City not found.</p>`;
    });
});

function showWeather(data) {
  if (data.cod !== 200) {
    weatherInfo.innerHTML = `<p>City not found.</p>`;
    return;
  }

  // Thunder effect only for stormy weather
  const weatherMain = data.weather[0].main.toLowerCase();
  if(weatherMain.includes("thunder") || weatherMain.includes("storm") || weatherMain.includes("rain")) {
    weatherCard.classList.add("thunder");
  } else {
    weatherCard.classList.remove("thunder");
  }

  weatherInfo.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
}
