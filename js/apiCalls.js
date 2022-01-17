import { MY_API_KEY, state, containerSearch } from "./variables";
import { addToCityArray } from "./script";

import {
  renderSearchedCity,
  cityNotFoundMsg,
  renderDetailsAboutCity,
  renderDetailsTitle,
} from "./rendering.js";

import { config, data1, data2, labelsArray, myChart } from "./chart";
import { unixToNormalTime } from "./unixConvertions";

export const getDataForPrint = async function (cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        containerSearch.style.border = "none";
        throw new Error(cityNotFoundMsg("Invalid city name!"));
      }
      return response.json();
    })
    .then((data) => {
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
      addToCityArray(state.cities, data);
    })
    .catch((err) => console.error(err))
    .finally(() => (containerSearch.style.opacity = 1));
};

export const getCityName = async function (lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=pl&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Something wrong with api call ${response.status}`);
      return response.json();
    })
    .then((data) => {
      renderDetailsTitle(data.city.name);
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
        .then((objectData) => {
          getCityName(objectData.lat, objectData.lon);

          let timeForGraph;
          let feelLikeTempForGraph;
          let realTempForGraph;
          objectData.hourly.forEach((obj) => {
            let index = objectData.hourly.indexOf(obj);
            if (index < 12) {
              console.log(obj);
              timeForGraph = unixToNormalTime(
                obj.dt + objectData.timezone_offset - 3600
              );
              labelsArray.push(timeForGraph);

              realTempForGraph = obj.temp;
              data1.data.push(realTempForGraph);

              feelLikeTempForGraph = obj.feels_like;
              data2.data.push(feelLikeTempForGraph);

              renderDetailsAboutCity(objectData, index);
              myChart.update(config);
            }
            myChart;
          });
        });
    });
};

// obj.temp obj.pressure obj.humidity
