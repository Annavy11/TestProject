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



//search city

function getCurrentTemp (response) {
    let city = document.querySelector("#city");
    let currentTemp = document.querySelector("#temperature-current");
    let currentCityTemperature = Math.round(response.data.main.temp);
    let iconElement = document.querySelector("#weather-icon");
    let descriptionElement = document.querySelector("#description");

    city.innerHTML=response.data.name;
    currentTemp.innerHTML = currentCityTemperature;
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    descriptionElement.innerHTML = response.data.weather[0].description;    
}

function search(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getCurrentTemp);
}

function handleSubmit(event) {
    event.preventDefault();
    let searchCityInput = document.querySelector("#search-text");
    search(searchCityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

/*
function searchCity(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-text");
  
  let city = document.querySelector("#city");
  if (searchCityInput.value) {
    city.innerHTML = searchCityInput.value;
  } else {
    city.innerHTML = null;
    alert: "Please enter a city name";
  }
}
let searchForm = document.querySelector("#submit-button");
searchForm.addEventListener("click", searchCity); 
*/