let apiKey = "2ce216751bf820d8d58c4c2066228621";
let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  let formattedDate = document.querySelector("#current-date-time"); 
  formattedDate.innerHTML = `${currentDay} ${hours}:${minutes}`;
  return formattedDate;
}
formatDate(now);

//gps
function getGpsCoords(showCoords) {
  let latitude = showCoords.coords.latitude;
  let longitude = showCoords.coords.longitude;
  
  let apiGpsUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
  function getCurrentGpsTemp(response) {
    let currentTemp = document.querySelector("#temperature-current");
    console.log(Math.round(response.data.main.temp));
    let currentCityTemperature = Math.round(response.data.main.temp);
    currentTemp.innerHTML = currentCityTemperature;
    console.log(response.data.name);
    let currentGpsCity = document.querySelector("#city");
    currentGpsCity.innerHTML = response.data.name;
    
    let iconElement = document.querySelector("#weather-icon");
    let descriptionElement = document.querySelector("#description");
    
    
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    descriptionElement.innerHTML = response.data.weather[0].description;
    
    
  }
  axios.get(apiGpsUrl).then(getCurrentGpsTemp)
  
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getGpsCoords);
}

let gpsButton = document.querySelector("#gps-button");
gpsButton.addEventListener("click", getCurrentPosition);

//Matt
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature-current");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let weatherIconElement = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  descriptionElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "2ce216751bf820d8d58c4c2066228621";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text");
  search(cityInputElement.value);
  cityInputElement.value = ``;
}


function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-current");

  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-current");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitUnit = document.querySelector("#unit-fahrenheit");
fahrenheitUnit.addEventListener("click", displayFahrenheitTemperature);

let celsiusUnit = document.querySelector("#unit-celsius");
celsiusUnit.addEventListener("click", displayCelsiusTemperature);

search("New York");