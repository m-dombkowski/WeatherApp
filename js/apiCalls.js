import {
  MY_API_KEY,
  state,
  containerSearch,
  BASE_API_URL,
  FORECAST_API_URL,
} from "./variables";
import { addToCityArray, loopingThroughObjectFromFetch } from "./script";

import {
  renderSearchedCity,
  renderDetailsTitle,
  renderErrorMessage,
} from "./rendering.js";

export const getDataForPrint = function (cityName) {
  fetch(`${BASE_API_URL}${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          renderErrorMessage(
            "Nie znaleziono miasta o takiej nazwie, spróbuj ponownie."
          )
        );
      }
      return response.json();
    })
    .then((data) => {
      renderSearchedCity(data);
    })
    .catch((err) => console.error(err));
};

export const getDataForObject = function (cityName) {
  fetch(`${BASE_API_URL}${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          renderErrorMessage(
            `Wystąpił błąd podczas pobierania danych ${response.status}.`
          )
        );
      return response.json();
    })
    .then((data) => {
      addToCityArray(state.cities, data);
    })
    .catch((err) => console.error(err));
};

const getObcjectWithCoords = function (coords) {
  fetch(
    `${FORECAST_API_URL}lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=pl&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          renderErrorMessage(
            `Wystąpił błąd podczas pobierania danych ${response.status}.`
          )
        );
      return response.json();
    })
    .then((objectData) => {
      loopingThroughObjectFromFetch(objectData);
    });
};

// export const getDetailsAboutCity =  function (cityName) {
//   fetch(`${BASE_API_URL}${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`)
//     .then((response) => {
//       if (!response.ok)
//         throw new Error(
//           renderErrorMessage(
//             `Wystąpił błąd podczas pobierania danych ${response.status}.`
//           )
//         );
//       return response.json();
//     })
//     .then((data) => {
//       const coords = data.coord;
//       renderDetailsTitle(data.name);
//       getObcjectWithCoords(coords);
//     })
//     .catch((err) => console.error(err));
// };

export const getDetailsAboutCity = async function (cityName) {
  getJSON(cityName, "Wystąpił błąd podczas pobierania danych").then((data) => {
    const coords = data.coord;
    renderDetailsTitle(data.name);
    getObcjectWithCoords(coords);
  });
};

const getJSON = function (cityName, errorMsg) {
  return fetch(
    `${BASE_API_URL}${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`
  ).then((response) => {
    if (!response.ok) throw new Error(`${renderErrorMessage(errorMsg)}`);
    return response.json();
  });
};

// const fetchAPI = function (cityName) {
//   return fetch(
//     `${BASE_API_URL}${cityName}&units=metric&lang=pl&appid=${MY_API_KEY}`
//   );
// };
