const state = {
  bookmarks: [],
};

const testBtn = document.querySelector(".test-btn");
const input = document.querySelector("#input");
const form = document.querySelector("#form");
const inputV = document.getElementById("input");
const searchContainer = document.querySelector(".container-search");
const addCity = document.querySelector(".add-city-button");
const addContainer = document.querySelector(".add-city");

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
  searchContainer.classList.add("active");
  searchContainer.innerHTML = "";
});

document.addEventListener("click", function (event) {
  if (event.target.id === "add-city-button") {
    getDataForObject(getInputValue());
    searchContainer.innerHTML = "";
    searchContainer.classList.remove("active");
    inputV.value = "";
  }
});

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

const renderCityCard = function (data) {
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

  searchContainer.insertAdjacentHTML("beforeend", html);
};

const getDataForPrint = function (city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Something wrong with api call ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderCityCard(data);
    })
    .catch((err) => console.error(err))
    .finally(() => (searchContainer.style.opacity = 1));
};

const getDataForObject = function (city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Something wrong with api call ${response.status}`);
      return response.json();
    })
    .then((data) => {
      addToCityArray(state.bookmarks, data);
    })
    .catch((err) => console.error(err))
    .finally(() => (searchContainer.style.opacity = 1));
};

const addToCityArray = function (array, data) {
  let city = createCityObject(data);

  const element = array.find((element) => element.name === city.name);
  if (!element) {
    array.push(city);
    addToLocalStorage(array);
  }

  console.log(array);
};

const addToLocalStorage = function (array) {
  localStorage.setItem("cities", JSON.stringify(array));
};

const createCityObject = function (data) {
  const city = data;
  // console.log(city);
  return {
    name: city.name,
    weather: city.weather[0].main,
    time: unixToNormalTime(city.dt + city.timezone - 3600),
    temperature: city.main.temp.toFixed(0),
    humidity: city.main.humidity,
    pressure: city.main.pressure,
  };
};
