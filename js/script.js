const testBtn = document.querySelector(".test-btn");
const input = document.querySelector("#input");
const form = document.querySelector("#form");
const inputV = document.getElementById("input");

const test1 = function () {
  let inputValue = document.getElementById("input").value;
  return inputValue;
};

testBtn.addEventListener("click", function () {
  apiCall(test1());
  // console.log(test1);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  apiCall(test1());
  inputV.value = "";
});

// input.addEventListener("submit", function (event) {});

const unixToNormalTime = function (unixTimestamp) {
  let date = new Date(unixTimestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();

  let formattedTime =
    hours + ":" + minutes.substring(-2) + ":" + seconds.substring(-2);
  return formattedTime;
};

const unixToDate = function (unixTimestamp) {
  let miliseconds = unixTimestamp * 1000;
  let dateObject = new Date(miliseconds);

  let humanDateFormat = dateObject.toLocaleString();

  return humanDateFormat;
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

function getValue() {
  const inputValue = document.getElementsByClassName("myInput").value;
  return inputValue;
}
