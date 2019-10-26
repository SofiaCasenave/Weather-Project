function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(url).then(displayTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#search-position");
button.addEventListener("click", getCurrentPosition);

function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;

  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = Math.round(response.data.main.pressure);
}

function getTemperature(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3a94f3778290bfeee61278505dbbe51d&units=metric`;

  axios.get(url).then(displayTemperature);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  getTemperature(searchInput.value);
}
function convertToCelsius() {
  let temperature = document.querySelector("#temperature");
  let link = document.querySelector("#celsius");
  link.classList.add("active");
  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = 25;
}
function convertToFahrenheit(response) {
  let temperature = document.querySelector("#temperature");
  let link = document.querySelector("#fahrenheit");
  link.classList.add("active");
  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.classList.remove("active");
  temperature.innerHTML = Math.round((25 * 9) / 5 + 32);
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
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  dateContainer.innerHTML = `${day}, ${date} ${month} ${currentYear} | ${hours}:${minutes} |`;
}
let searchForm = document.querySelector("#search-form");
let celsiusLink = document.querySelector("#celsius");
let fahrenheitLink = document.querySelector("#fahrenheit");

searchForm.addEventListener("submit", search);
celsiusLink.addEventListener("click", convertToCelsius);
fahrenheitLink.addEventListener("click", convertToFahrenheit);

convertToCelsius();
updateDateTime();
getTemperature("Lisbon");
