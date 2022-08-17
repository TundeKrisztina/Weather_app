//adding day and time to the app
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

//search engine
function updateTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  document.querySelector("#current-weather-description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "11af92cd97a626ecc5ce2d392902cc0b";
  let apiCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appId=${apiKey}`;

  axios.get(apiCityUrl).then(updateTemperature);
}

function updateCity(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchCity = document.querySelector("#search-button");
searchCity.addEventListener("click", updateCity);

search("New York");

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "11af92cd97a626ecc5ce2d392902cc0b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(updateTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
