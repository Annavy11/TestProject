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

//forecast

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastInfo = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML ="";

  forecastInfo.forEach(function(forecastDay, index) {
    if (index < 5) {
    forecastHTML = forecastHTML + ` 
    <div class="weather-forecast" id="forecast">
    <span class="weather-forecast-day"> ${formatForecastDay(forecastDay.dt)} </span>
    <span class="weather-forecast-icon"> <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"</span>
    <span class="weather-forecast-temparature-min">${Math.round(forecastDay.temp.min)}°</span>
    <span class="weather-forecast-temparature-max">${Math.round(forecastDay.temp.max)}°</span>
    </div>
    ` 
    ;
    }
  })

  forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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


  getForecast(response.data.coord);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");