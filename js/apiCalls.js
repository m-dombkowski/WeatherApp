import {
  MY_API_KEY,
  state,
  containerSearch,
  API_URL,
  BASE_API_URL,
  COORDS_API_URL,
  FORECAST_API_URL,
  GET_CITY_NAME_URL,
} from "./variables";
import { addToCityArray } from "./script";

import {
  renderSearchedCity,
  renderDetailsAboutCity,
  renderDetailsTitle,
  renderErrorMessage,
} from "./rendering.js";

import { config, data1, data2, labelsArray, myChart } from "./chart";
import { unixToNormalTime } from "./unixConvertions";

export const getDataForPrint = function (cityName) {
  fetch(`${BASE_API_URL}${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        containerSearch.style.border = "none";
        throw new Error(
          renderErrorMessage(
            "Nie znaleziono miasta o takiej nazwie, spróbuj ponownie"
          )
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderSearchedCity(data);
      containerSearch.classList.add("active");
    })
    .catch((err) => console.error(err))
    .finally(() => (containerSearch.style.opacity = 1));
};

export const getDataForObject = function (cityName) {
  fetch(`${BASE_API_URL}${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          renderErrorMessage(
            `Wystąpił błąd podczas pobierania danych ${response.status}`
          )
        );
      return response.json();
    })
    .then((data) => {
      addToCityArray(state.cities, data);
    })
    .catch((err) => console.error(err))
    .finally(() => (containerSearch.style.opacity = 1));
};

export const getCityName = function (lat, lon) {
  fetch(`${GET_CITY_NAME_URL}lat=${lat}&lon=${lon}&lang=pl&appid=${MY_API_KEY}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          renderErrorMessage(
            `Wystąpił błąd podczas pobierania danych ${response.status}`
          )
        );
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderDetailsTitle(data.city.name);
    });
};

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

export const getDetailsAboutCity = function (cityName) {
  fetch(`${BASE_API_URL}${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          renderErrorMessage(
            `Wystąpił błąd podczas pobierania danych ${response.status}`
          )
        );
      return response.json();
    })
    .then((data) => {
      return fetch(
        `${FORECAST_API_URL}lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&lang=pl&appid=${MY_API_KEY}`
      )
        .then((response) => {
          if (!response.ok)
            throw new Error(
              renderErrorMessage(
                `Wystąpił błąd podczas pobierania danych ${response.status}`
              )
            );
          return response.json();
        })
        .then((objectData) => {
          console.log(objectData);
          getCityName(objectData.lat, objectData.lon);

          let timeForGraph;
          let feelLikeTempForGraph;
          let realTempForGraph;
          objectData.hourly.forEach((object) => {
            let index = objectData.hourly.indexOf(object);
            if (index < 12) {
              timeForGraph = unixToNormalTime(
                object.dt + objectData.timezone_offset - 3600
              );
              labelsArray.push(timeForGraph);

              realTempForGraph = object.temp;
              data1.data.push(realTempForGraph);

              feelLikeTempForGraph = object.feels_like;
              data2.data.push(feelLikeTempForGraph);

              renderDetailsAboutCity(objectData, index);
              myChart.update(config);
            }
          });
        });
    });
};

// export const sialalal = function (objectData) {
//   // getCityName(objectData.lat, objectData.lon);

//   let timeForGraph;
//   let feelLikeTempForGraph;
//   let realTempForGraph;
//   objectData.hourly.forEach((object) => {
//     let index = objectData.hourly.indexOf(object);
//     if (index < 12) {
//       timeForGraph = unixToNormalTime(
//         object.dt + objectData.timezone_offset - 3600
//       );
//       labelsArray.push(timeForGraph);

//       realTempForGraph = object.temp;
//       data1.data.push(realTempForGraph);

//       feelLikeTempForGraph = object.feels_like;
//       data2.data.push(feelLikeTempForGraph);

//       renderDetailsAboutCity(objectData, index);
//       myChart.update(config);
//     }
//     myChart;
//   });
// };

// obj.temp obj.pressure obj.humidity

// getCityName(objectData.lat, objectData.lon);

// let timeForGraph;
// let feelLikeTempForGraph;
// let realTempForGraph;
// objectData.hourly.forEach((object) => {
//   let index = objectData.hourly.indexOf(object);
//   if (index < 12) {
//     timeForGraph = unixToNormalTime(
//       object.dt + objectData.timezone_offset - 3600
//     );
//     labelsArray.push(timeForGraph);

//     realTempForGraph = object.temp;
//     data1.data.push(realTempForGraph);

//     feelLikeTempForGraph = object.feels_like;
//     data2.data.push(feelLikeTempForGraph);

//     renderDetailsAboutCity(objectData, index);
//     myChart.update(config);
//   }
//   myChart;
// });
