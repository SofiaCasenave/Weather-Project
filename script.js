function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(url).then(displayTemperature);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#search-position");
button.addEventListener("click", getCurrentPosition);

function searchCity1(london) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=London&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(url).then(displayTemperature);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=London&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
let suggestedCity1 = document.querySelector("#suggested-city1");
suggestedCity1.addEventListener("click", searchCity1);

function searchCity2(venice) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=Venice,it&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(url).then(displayTemperature);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Venice,it&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
let suggestedCity2 = document.querySelector("#suggested-city2");
suggestedCity2.addEventListener("click", searchCity2);

function searchCity3(newYork) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=New York&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(url).then(displayTemperature);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=New York&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
let suggestedCity3 = document.querySelector("#suggested-city3");
suggestedCity3.addEventListener("click", searchCity3);

function searchCity4(toronto) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=Toronto&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(url).then(displayTemperature);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Toronto&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
let suggestedCity4 = document.querySelector("#suggested-city4");
suggestedCity4.addEventListener("click", searchCity4);

function searchCity5(sydney) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(url).then(displayTemperature);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Sydney&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
let suggestedCity5 = document.querySelector("#suggested-city5");
suggestedCity5.addEventListener("click", searchCity5);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);

  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = response.data.main.pressure;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
      ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
      src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png"/>
      <div class="weather-forecast-temperature">${Math.round(
        forecast.main.temp
      )} ºC</div>
      </div>
    </div>
  `;
  }
}
function getTemperature(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(url).then(displayTemperature);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  getTemperature(searchInput.value);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}
function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
function updateDateTime() {
  let dateContainer = document.querySelector("#current-date-time");
  let currentTime = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentTime.getDay()];
  let date = currentTime.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[currentTime.getMonth()];
  let currentYear = currentTime.getFullYear();
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  dateContainer.innerHTML = `${day}, ${date} ${month} ${currentYear} | ${hours}:${minutes} |`;
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

updateDateTime();

getTemperature("Lisbon");
