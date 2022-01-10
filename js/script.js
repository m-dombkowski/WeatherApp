const state = {
  cities: [],
};

const testBtn = document.querySelector(".test-btn");
const input = document.querySelector("#input");
const form = document.querySelector("#form");
const inputV = document.getElementById("input");
const containerSearch = document.querySelector(".container-search");
const addCity = document.querySelector(".add-city-button");
const addContainer = document.querySelector(".add-city");
const selectedCitiesList = document.querySelector(".selected-cities");

const MY_API_KEY = "1dd8639e06977072c7c8fcaea598d700";

const getInputValue = function () {
  let inputValue = document.getElementById("input").value;
  return inputValue;
};

// testBtn.addEventListener("click", function () {
//   apiCall(test1());
//   // console.log(test1);
// });

form.addEventListener("submit", function (event) {
  event.preventDefault();
  getDataForPrint(getInputValue());
  containerSearch.classList.add("active");
  containerSearch.innerHTML = "";
});

document.addEventListener("click", function (event) {
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

    for (let i = 0; i < children.length; i++) {
      if (children[i].classList.contains("city-name")) {
        text = children[i].textContent;
      }
    }
    const objectToClose = state.cities.find((element) => element.name == text);
    const index = state.cities.indexOf(objectToClose);
    if (objectToClose) {
      state.cities.splice(index, 1);
    }
  }
});

const removeSelectedCity = function () {};

const renderSelectedCities = function (data) {
  let html = `
  <li class='country'>
    <button id='close'>x</button>
    <h1 class="city-name">${data.name}</h1>
    <p class="date-time">${data.time}</p>
    <p class="weather-type">${data.weather}</p>
    <h2 class="temperature">${data.temperature}°C</h2>
    <div class="secondary-information">
      <p class="humidity">Humidity: ${data.humidity}%</p>
      <p class="pressure">Pressure: ${data.pressure} hPa</p>
    </div>
  </li>`;

  selectedCitiesList.insertAdjacentHTML("beforeend", html);
};

const unixToNormalTime = function (unixTimestamp) {
  let date = new Date(unixTimestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();

  let formattedTime = hours + " : 00";
  return formattedTime;
};

const unixToDate = function (unixTimestamp) {
  let miliseconds = unixTimestamp * 1000;
  let dateObject = new Date(miliseconds);

  let humanDateFormat = dateObject.toLocaleString();

  return humanDateFormat;
};

const renderSearchedCity = function (data) {
  const html = `
  <h1 class="city-name">${data.name}</h1>
  <p class="date-time">${unixToNormalTime(data.dt + data.timezone - 3600)}</p>
  <p class="weather-type">${data.weather[0].main}</p>
  <h2 class="temperature">${data.main.temp.toFixed(0)}°C</h2>
  <div class="secondary-information">
    <p class="humidity">Humidity: ${data.main.humidity}%</p>
    <p class="pressure">Pressure: ${data.main.pressure} hPa</p>
  </div>
  <div class="add-city">
      <button id="add-city-button">Add this city</button>
    </div>
  `;

  containerSearch.insertAdjacentHTML("beforeend", html);
};

const getDataForPrint = function (cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Something wrong with api call ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderSearchedCity(data);
    })
    .catch((err) => console.error(err))
    .finally(() => (containerSearch.style.opacity = 1));
};

const getDataForObject = function (cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${MY_API_KEY}`
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

const addToCityArray = function (arrayCities, data) {
  let cityObject = createCityObject(data);

  const element = arrayCities.find(
    (element) => element.name === cityObject.name
  );
  if (!element) {
    arrayCities.push(cityObject);
    addToLocalStorage(cityObject.name, cityObject);
    renderSelectedCities(getItemFromLocalStorage(cityObject.name));
  } else {
    console.log("You have already selected that city!");
  }

  console.log(arrayCities);
};

const addToLocalStorage = function (cityName, cityObject) {
  localStorage.setItem(cityName, JSON.stringify(cityObject));
};

const getItemFromLocalStorage = function (cityName) {
  return JSON.parse(localStorage.getItem(cityName));
  // if (storage) state.cities.JSON.parse(storage);
};

const removeItemFromLocalStorage = function (cityName) {
  localStorage.removeItem(cityName);
};

const getTest = function (array) {
  array.forEach((element) => {
    return element;
  });
};

const createCityObject = function (data) {
  const cityObject = data;
  // console.log(cityObject);
  return {
    name: cityObject.name,
    weather: cityObject.weather[0].main,
    time: unixToNormalTime(cityObject.dt + cityObject.timezone - 3600),
    temperature: cityObject.main.temp.toFixed(0),
    humidity: cityObject.main.humidity,
    pressure: cityObject.main.pressure,
  };
};

const getSelectedCitiesData = function (array) {
  array.forEach((element) => {
    console.log(element.name);
  });
};
