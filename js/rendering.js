import { unixToNormalTime } from "./unixConvertions";
import { containerSearch, selectedCitiesList } from "./variables";

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
</li>
`;
  selectedCitiesList.insertAdjacentHTML("beforeend", html);
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
