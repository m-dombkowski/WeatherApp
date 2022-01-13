import { getDataForObject, getDataForPrint, getInputValue } from "./apiCalls";
import { containerSearch, state, inputV } from "./variables";
import { removeItemFromLocalStorage } from "./localStorage";

export const formHandler = function (event) {
  event.preventDefault();
  getDataForPrint(getInputValue());
  containerSearch.classList.add("active");
  containerSearch.innerHTML = "";
};

export const documentHandler = function (event) {
  if (event.target.id === "add-city-button") {
    getDataForObject(getInputValue());
    containerSearch.innerHTML = "";
    containerSearch.classList.remove("active");
    inputV.value = "";
  }
  if (event.target.id === "close") {
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
    parent.innerHTML = "";
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
