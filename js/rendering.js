import { unixToNormalTime, unixToDate } from "./unixConvertions";
import {
  containerSearch,
  selectedCitiesList,
  details,
  titleDetailsContainer,
} from "./variables";

export const renderSearchedCity = function (data) {
  const html = `
<h1 class="city-name">${data.name}</h1>
<p class="date-time">${unixToNormalTime(data.dt + data.timezone - 3600)}</p>
<p class="weather-type">${firstCapital(data.weather[0].description)}</p>
<h2 class="temperature">${data.main.temp.toFixed(0)}°C</h2>
<div class="secondary-information">
  <p class="humidity">Wilgotność: ${data.main.humidity}%</p>
  <p class="pressure">Ciśnienie: ${data.main.pressure} hPa</p>
</div>
<div class="add-city">
  <button id="add-city-button">Add this city</button>
</div>
`;
  containerSearch.insertAdjacentHTML("beforeend", html);
};

export const renderSelectedCities = function (data) {
  let html = `
<li class="country">
  <button id="close">x</button>
  <h1 class="city-name">${data.name}</h1>
  <p class="date-time">${data.time}</p>
  <p class="weather-type">${data.weather}</p>
  <h2 class="temperature">${data.temperature}°C</h2>
  <div class="secondary-information">
    <p class="humidity">Wilgotność: ${data.humidity}%</p>
    <p class="pressure">Ciśnienie: ${data.pressure} hPa</p>
  </div>
  <button id='check-details'>Check 12 hours forecast!</button>
</li>
`;
  selectedCitiesList.insertAdjacentHTML("beforeend", html);
};

export const renderDetailsAboutCity = function (data, index) {
  let html = `
  
  <li class="details">
    <p class="details-time">${unixToDate(
      data.hourly[index].dt + data.timezone_offset - 3600
    )}</p>
    <p class="details-temp">Temperatura: ${Math.round(
      data.hourly[index].temp
    )}°C</p>
    <p class="details-feels-like">Odczuwalna: ${Math.round(
      data.hourly[index].feels_like
    )}°C</p>
    <p class="details-wind">Wiatr: ${(
      data.hourly[index].wind_speed * 3.6
    ).toFixed(1)} km/h</p>
  </li>`;

  details.insertAdjacentHTML("beforeend", html);
};

export const renderDetailsTitle = function (data) {
  // const lat = data.lat;
  // const lon = data.lon;
  // console.log(lat, lon);
  console.log(data);
  let html = `
  <h1 class="details-city">${data}</h1>
  `;
  titleDetailsContainer.insertAdjacentHTML("afterbegin", html);
};

export const firstCapital = function (string) {
  let word = string.split(" ");
  const sentence = word[0].charAt(0).toUpperCase() + string.slice(1);
  // console.log(sentence);
  return sentence;
};

export const cityNotFoundMsg = function (message) {
  alert(message);
};
