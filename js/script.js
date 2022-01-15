import { firstCapital } from "./rendering";
import { unixToNormalTime } from "./unixConvertions";
import { state } from "./variables";
import { renderSelectedCities, cityNotFoundMsg } from "./rendering";
import { formHandler, documentHandler } from "./eventHandlers";
import { addToLocalStorage, getItemFromLocalStorage } from "./localStorage";

form.addEventListener("submit", function (event) {
  formHandler(event);
});

document.addEventListener("click", function (event) {
  documentHandler(event);
});

export const getInputValue = function () {
  let inputValue = document.getElementById("input").value;
  return inputValue;
};

export const createCityObject = function (data) {
  const cityObject = data;
  // console.log(cityObject);
  return {
    name: cityObject.name,
    weather: firstCapital(cityObject.weather[0].description),
    time: unixToNormalTime(cityObject.dt + cityObject.timezone - 3600),
    temperature: cityObject.main.temp.toFixed(0),
    humidity: cityObject.main.humidity,
    pressure: cityObject.main.pressure,
  };
};

export const addToCityArray = function (arrayCities, data) {
  let cityObject = createCityObject(data);

  const element = arrayCities.find(
    (element) => element.name === cityObject.name
  );
  if (!element) {
    arrayCities.push(cityObject);
    addToLocalStorage(cityObject.name, cityObject);
    renderSelectedCities(getItemFromLocalStorage(cityObject.name));
  } else {
    cityNotFoundMsg("You have already selected that city!");
  }

  console.log(arrayCities);
};

const innit = function () {
  for (let i = 0; i < localStorage.length; i++) {
    renderSelectedCities(getItemFromLocalStorage(localStorage.key([i])));
    state.cities.push(getItemFromLocalStorage(localStorage.key([i])));
  }
};

innit();
