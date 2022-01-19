import { MY_API_KEY, state, BASE_API_URL, FORECAST_API_URL } from "./variables";
import { addToCityArray, loopingThroughObjectFromFetch } from "./script";

import { renderSearchedCity, renderErrorMessage } from "./rendering.js";
import { URLSearchParams } from "core-js/modules/web.url-search-params";

const resolveParams = function (params) {
  params.appid = MY_API_KEY;
  params.units = "metric";
  params.lang = "pl";
  return new URLSearchParams(params).toString();
};

const apiRequest = async function (url, params) {
  try {
    const paramsAsString = resolveParams(params);
    const response = await fetch(url + paramsAsString);
    return await response.json();
  } catch (error) {
    renderErrorMessage(error);
  }
};

const getDetailsAboutCityRequest = async function (cityName) {
  const params = {
    q: cityName,
  };
  return await apiRequest(BASE_API_URL, params);
};

const getForeCastRequest = async function (lat, lon) {
  const params = {
    lat: lat,
    lon: lon,
  };
  return await apiRequest(FORECAST_API_URL, params);
};

export const getDataForArray = async function (cityName) {
  const city = await getDetailsAboutCityRequest(cityName);
  addToCityArray(state.cities, city);
};

export const getDataForPrint = async function (cityName) {
  const city = await getDetailsAboutCityRequest(cityName);
  renderSearchedCity(city);
};

export const getDataForForecast = async function (cityName) {
  const city = await getDetailsAboutCityRequest(cityName);
  const { lat, lon } = city.coord;
  const forecast = await getForeCastRequest(lat, lon);

  loopingThroughObjectFromFetch(forecast);
};
