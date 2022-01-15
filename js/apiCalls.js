import { MY_API_KEY, state, containerSearch } from "./variables";
import { addToCityArray } from "./script";

import {
  renderSearchedCity,
  cityNotFoundMsg,
  renderDetailsAboutCity,
  renderDetailsTitle,
} from "./rendering.js";

export const getDataForPrint = async function (cityName) {
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

export const getDataForObject = async function (cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Something wrong with api call ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      addToCityArray(state.cities, data);
    })
    .catch((err) => console.error(err))
    .finally(() => (containerSearch.style.opacity = 1));
};

export const getCityName = async function (lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Something wrong with api call ${response.status}`);
      return response.json();
    })
    .then((data) => {
      renderDetailsTitle(data.city.name);
      // console.log(data);
      // const cityName = data.city.name;
      // console.log(cityName.typeOf);
      // details.innerHTML = cityName;
    });
};

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

export const getDetailsAboutCity = async function (cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Something wrong with api call ${response.status}`);
      return response.json();
    })
    .then((data) => {
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&lang=pl&appid=${MY_API_KEY}`
      )
        .then((response) => {
          if (!response.ok)
            throw new Error(`Something wrong with api call ${response.status}`);
          return response.json();
        })
        .then((data) => {
          getCityName(data.lat, data.lon);
          console.log(data);
          data.hourly.forEach((obj) => {
            const index = data.hourly.indexOf(obj) + 1;
            if (index <= 12) {
              renderDetailsAboutCity(data, index);
            }
          });
        });
    });
};

// obj.temp obj.pressure obj.humidity
