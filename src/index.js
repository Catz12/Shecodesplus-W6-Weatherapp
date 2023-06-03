function currentDate() {
  let todayTime = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friaday",
    "Saturday",
  ];
  let currentDay = days[todayTime.getDay()];
  let currentHour = todayTime.getHours();
  let currentMinute = todayTime.getMinutes();

  let today = document.querySelector("#current-date");
  today.innerHTML = `${currentDay} ${currentHour}:${currentMinute}, cloudy`;
}

currentDate();

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let unit = "metric";
  let Key = "b2d9fa1f2b35557e4615dd5fab218834";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Key}&units=${unit} `;
  axios.get(url).then(displayWeather);
}

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;

  searchCity(city);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enterCity);

let currentCityButton = document.querySelector("#current-city");
currentCityButton.addEventListener("click", getCurrentPosition);

searchCity("Zürich");
