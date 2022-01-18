import { unixToNormalTime, unixToDate } from "./unixConvertions";
import {
  containerSearch,
  selectedCitiesList,
  details,
  titleDetailsContainer,
  errorWindow,
  errorMessage,
} from "./variables";

export const renderSearchedCity = function (data) {
  const html = `
  <li class="searched-city">
    <h1 class="city-name">${data.name}</h1>
    <p class="date-time">${unixToNormalTime(data.dt + data.timezone - 3600)}</p>
    <p class="weather-type">${firstCapital(data.weather[0].description)}</p>
    <h2 class="temperature">${Math.round(data.main.temp)}°C</h2>
    <div class="secondary-information">
      <p class="humidity">Wilgotność:</br> ${data.main.humidity}%</p>
      <p class="pressure">Ciśnienie:</br> ${data.main.pressure} hPa</p>
    </div>
    <div class="add-city">
      <button id="add-city-button">Dodaj miasto do śledzonych</button>
    </div>
  </li>
`;

  containerSearch.insertAdjacentHTML("beforeend", html);
};

export const renderSelectedCities = function (data) {
  let html = `
  <li class="country">
    <button class="close" title="Usuń ze śledzonych">x</button>
    <h1 class="city-name">${data.name}</h1>
    <p class="date-time">${data.time}</p>
    <p class="weather-type">${data.weather}</p>
    <h2 class="temperature">${Math.round(data.temperature)}°C</h2>
    <div class="secondary-information">
      <p class="humidity">Wilgotność:</br> ${data.humidity}%</p>
      <p class="pressure">Ciśnienie:</br> ${data.pressure} hPa</p>
    </div>
    <button class='check-details'>Sprawdź pogodę na 12 godzin!</button>
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
    <p class="details-temp">Temperatura: ${data.hourly[index].temp.toFixed(
      1
    )}°C</p>
    <p class="details-feels-like">Odczuwalna: ${data.hourly[
      index
    ].feels_like.toFixed(1)}°C</p>
    <p class="details-wind">Wiatr: ${(
      data.hourly[index].wind_speed * 3.6
    ).toFixed(1)} km/h</p>
  </li>`;

  details.insertAdjacentHTML("beforeend", html);
};

export const renderDetailsTitle = function (data) {
  let html = `
  <h1 class="details-city">${data}</h1>
  `;
  titleDetailsContainer.insertAdjacentHTML("afterbegin", html);
};

export const firstCapital = function (string) {
  let word = string.split(" ");
  const sentence = word[0].charAt(0).toUpperCase() + string.slice(1);

  return sentence;
};

export const renderErrorMessage = function (message) {
  let html = `<p>${message}</p>`;
  errorWindow.style.display = "block";
  errorMessage.insertAdjacentHTML("afterbegin", html);
};
