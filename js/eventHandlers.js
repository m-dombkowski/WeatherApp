import {
  getDataForObject,
  getDataForPrint,
  getInputValue,
  getDetailsAboutCity,
} from "./apiCalls";
import {
  containerSearch,
  state,
  inputV,
  goBackButton,
  containerSelected,
  details,
  form,
  titleDetailsContainer,
} from "./variables";
import { removeItemFromLocalStorage } from "./localStorage";
import { getInputValue } from "./script";

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

  if (event.target.id === "go-back") {
    goBackButton.classList.toggle("hide");
    containerSearch.classList.toggle("hide");
    containerSelected.classList.toggle("hide");

    titleDetailsContainer.classList.add("hide");
    details.classList.add("hide");
    form.classList.remove("hide");
    details.textContent = "";
    titleDetailsContainer.innerHTML = "";
  }

  if (event.target.id === "check-details") {
    const target = event.target;
    const parent = target.parentElement;
    const children = parent.children;
    let text;

    for (let i = 0; i < children.length; i++) {
      if (children[i].classList.contains("city-name")) {
        text = children[i].textContent;
      }
    }
    goBackButton.classList.toggle("hide");
    containerSearch.classList.toggle("hide");
    containerSelected.classList.toggle("hide");

    titleDetailsContainer.classList.remove("hide");
    details.classList.remove("hide");
    form.classList.add("hide");
    console.log(text);
    getDetailsAboutCity(text);
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
