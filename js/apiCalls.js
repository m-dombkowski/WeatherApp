import { MY_API_KEY, state, containerSearch, form } from "./variables";
import { addToCityArray } from "./script";

import { renderSearchedCity, cityNotFoundMsg } from "./rendering.js";

export const getInputValue = function () {
  let inputValue = document.getElementById("input").value;
  return inputValue;
};

export const getDataForPrint = function (cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok) throw new Error(cityNotFoundMsg("Invalid city name!"));
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderSearchedCity(data);
    })
    .catch((err) => console.error(err))
    .finally(() => (containerSearch.style.opacity = 1));
};

export const getDataForObject = function (cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Something wrong with api call ${response.status}`);
      return response.json();
    })
    .then((data) => {
      addToCityArray(state.cities, data);
    })
    .catch((err) => console.error(err))
    .finally(() => (containerSearch.style.opacity = 1));
};
