const testBtn = document.querySelector(".test-btn");
const input = document.querySelector("#input");
const form = document.querySelector("#form");
const inputV = document.getElementById("input");
const searchContainer = document.querySelector(".container-search");
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
  getCityName(getInputValue());
  getData(getInputValue());
  inputV.value = "";
});

// input.addEventListener("submit", function (event) {});

const unixToNormalTime = function (unixTimestamp) {
  let date = new Date(unixTimestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();

  let formattedTime = hours + ":" + minutes.substring(-2) + ":";
  return formattedTime;
};

const unixToDate = function (unixTimestamp) {
  let miliseconds = unixTimestamp * 1000;
  let dateObject = new Date(miliseconds);

  let humanDateFormat = dateObject.toLocaleString();

  return humanDateFormat;
};

const renderCity = function (data) {
  const html = `
  <h1 class="city-name">${data.name}</h1>
  `;
  searchContainer.insertAdjacentHTML("afterbegin", html);
};

const renderSearchResult = function (data) {
  const html = `
  
  <p class="date-time">${unixToDate(
    data.current.dt + data.timezone_offset - 3600
  )}</p>
  <p class="weather-type">${data.current.weather[0].main}</p>
  <h2 class="temperature">${(data.current.temp - 273).toFixed(0)}°C</h2>
  <div class="secondary-information">
    <p class="humidity">Humidity: ${data.current.humidity}%</p>
    <p class="pressure">Pressure: ${data.current.pressure} hPa</p>
  </div>
  `;
  searchContainer.insertAdjacentHTML("beforeend", html);
};

const getData = function (city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Something wrong with first api call ${response.status}`
        );
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${MY_API_KEY}`
      );
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Something wrong with second api call ${response.status}`
        );
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderSearchResult(data);
    })
    .catch((err) => console.error(err))
    .finally(() => (searchContainer.style.opacity = 1));
};

const getCityName = function (city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MY_API_KEY}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Something wrong with api call ${response.status}`);
      return response.json();
    })
    .then((data) => {
      renderCity(data);
    });
};

const apiCall = async function (city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1dd8639e06977072c7c8fcaea598d700`
    );

    const response = await data.json();
    console.log(response);

    const forecast = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=1dd8639e06977072c7c8fcaea598d700`
    );

    const forecastData = await forecast.json();
    console.log(forecastData);
    let hourly = forecastData.hourly;
    // let localTime = forecastData.current.dt;

    hourly.forEach((element) => {
      return console.log(
        unixToDate(element.dt + forecastData.timezone_offset) +
          " temp: " +
          (element.temp - 273).toFixed(1) +
          "°C"
      );
    });
  } catch (err) {
    console.error("Error: ", err);
  }
};

const getLocationCurrentTime = async function (city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MY_API_KEY}`
    );

    const response = await data.json();
    console.log(response);

    const forecast = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${MY_API_KEY}`
    );

    const forecastData = await forecast.json();
    console.log(forecastData);

    const currentDateAndTime = unixToDate(
      forecastData.current.dt + forecastData.timezone_offset - 3600
    );

    return currentDateAndTime;
  } catch (err) {
    console.error("Error: ", err);
  }
};

// apiCall("moscow");
// apiCall("Washington");

// input.addEventListener("keydown", function (event) {
//   if (event.code === "Enter") {
//     event.preventDefault();
//     console.log(inputValue);
//   }
// });

// apiCall();
// const apiCall = function () {
//   fetch(
//     "https://api.openweathermap.org/data/2.5/weather?q=London&appid=1dd8639e06977072c7c8fcaea598d700"
//   )
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// };

// apiCall();

// const btn = document.getElementsByClassName(".btn");

// const input = document.querySelector(".myInput");

{
  /* <p class="date-time">${getLocationCurrentTime(getInputValue())}</p>
<p class="weather-type">${getWeatherType(getInputValue())}.</p>
<h2 class="temperature">${getTemperature(getInputValue())}°C</h2>
<div class="secondary-information">
  <p class="humidity">${getHumidity(getInputValue())}%</p>
  <p class="pressure">${getPressure(getInputValue())}hPa</p>
</div> */
}
