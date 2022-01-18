import {
  getDataForObject,
  getDataForPrint,
  getInputValue,
  getDetailsAboutCity,
  fetch,
} from "./apiCalls";
import {
  containerSearch,
  state,
  inputV,
  containerSelected,
  details,
  titleDetailsContainer,
  detailsFlexContainer,
  chartContainer,
  searchContainer,
  startSearchButton,
  formContainer,
} from "./variables";
import { removeItemFromLocalStorage } from "./localStorage";
import { getInputValue } from "./script";
import { labelsArray, data2, data1 } from "./chart";

export const startSearch = function (event) {
  event.preventDefault();
  searchContainer.classList.remove("hide");
  startSearchButton.classList.add("hide");
  formContainer.classList.toggle("hide");
};

export const formHandler = function (event) {
  event.preventDefault();
  getDataForPrint(getInputValue());

  containerSearch.innerHTML = "";
};

export const documentHandler = function (event) {
  if (event.target.id === "add-city-button") {
    getDataForObject(getInputValue());
    containerSearch.innerHTML = "";
    containerSearch.classList.remove("active");
    inputV.value = "";
    formContainer.classList.add("hide");
    startSearchButton.classList.toggle("hide");
  }

  if (event.target.id === "go-back") {
    containerSearch.classList.toggle("hide");
    containerSelected.classList.toggle("hide");
    detailsFlexContainer.classList.add("hide");
    chartContainer.classList.add("hide");
    details.classList.add("hide");
    searchContainer.classList.remove("hide");

    details.textContent = "";
    titleDetailsContainer.innerHTML = "";

    labelsArray.splice(0, labelsArray.length);
    data2.data = [];
    data1.data = [];
  }

  if (event.target.classList.contains("check-details")) {
    const target = event.target;
    const parent = target.parentElement;
    const children = parent.children;
    let cityName;

    for (let i = 0; i < children.length; i++) {
      if (children[i].classList.contains("city-name")) {
        cityName = children[i].textContent;
      }
    }

    containerSearch.classList.toggle("hide");
    containerSelected.classList.toggle("hide");
    detailsFlexContainer.classList.remove("hide");
    chartContainer.classList.remove("hide");
    details.classList.remove("hide");
    searchContainer.classList.add("hide");

    getDetailsAboutCity(cityName);
  }

  if (event.target.classList.contains("close")) {
    const target = event.target;
    const parent = target.parentElement;

    const children = parent.children;
    let text;
    let city;

    for (let i = 0; i < children.length; i++) {
      if (children[i].classList.contains("city-name")) {
        text = children[i].textContent;
      }
    }
    parent.parentNode.removeChild(parent);
    const objectToClose = state.cities.find((element) => element.name == text);
    const index = state.cities.indexOf(objectToClose);
    if (objectToClose) {
      state.cities.splice(index, 1);

      for (let i = 0; i < localStorage.length; i++) {
        if (objectToClose.name === localStorage.key([i])) {
          city = localStorage.key([i]);
          removeItemFromLocalStorage(city);
        }
      }
      // renderSelectedCities(getItemFromLocalStorage(city));
    }
  }
};
