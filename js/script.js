import { firstCapital, renderErrorMessage } from "./rendering";
import { unixToNormalTime } from "./unixConvertions";
import {
  state,
  form,
  startSearchButton,
  selectedCitiesList,
  errorWindow,
  errorMessage,
  closeErrorWindow,
} from "./variables";
import { renderSelectedCities, renderErrorMessage } from "./rendering";
import { formHandler, documentHandler, startSearch } from "./eventHandlers";
import { addToLocalStorage, getItemFromLocalStorage } from "./localStorage";

startSearchButton.addEventListener("click", function (event) {
  startSearch(event);
});

form.addEventListener("submit", function (event) {
  formHandler(event);
});

document.addEventListener("click", function (event) {
  documentHandler(event);
});

window.addEventListener("click", function (event) {
  if (event.target == errorWindow) {
    errorMessage.textContent = "";
    errorWindow.style.display = "none";
  }
});

closeErrorWindow.addEventListener("click", function (event) {
  errorMessage.textContent = "";
  errorWindow.style.display = "none";
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
    renderErrorMessage("Już śledzisz to miasto!");
  }

  console.log(arrayCities);
};

export const test = function () {
  if (state.cities.length > 0) {
    let html = `<h1 class="selected-title">Twoje ulubione miasta</h1>`;
    selectedCitiesList.insertAdjacentHTML("afterbegin", html);
  } else {
    let html = `<h1 class="selected-title">Nie śledzisz jeszcze żadnego miasta</h1>`;
    selectedCitiesList.insertAdjacentHTML("afterbegin", html);
  }
};

const innit = function () {
  for (let i = 0; i < localStorage.length; i++) {
    renderSelectedCities(getItemFromLocalStorage(localStorage.key([i])));
    state.cities.push(getItemFromLocalStorage(localStorage.key([i])));
  }
};

innit();
