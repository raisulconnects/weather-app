"use strict";

const searchBtn = document.querySelector(".searchBtn");
const darkModeBtn = document.querySelector(".modeBtn");

const apiKey = "d7f9500548ed60f909a95764b227f559";
let inputBOXofCityNname = document.querySelector(".citynamebox");

searchBtn.addEventListener("click", function () {
  inputBOXofCityNname = document.querySelector(".citynamebox");
  CheckWeather(inputBOXofCityNname.value);
});

document.addEventListener("keypress", function (e) {
  inputBOXofCityNname = document.querySelector(".citynamebox");
  if (e.key == "Enter") CheckWeather(inputBOXofCityNname.value);
});

async function CheckWeather(cityname) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=` +
      apiKey
  );

  if (response.status === 404) {
    document.querySelector(".city").textContent = "Invalid City Name";
    document.querySelector(".temp").textContent = `°c`;
    document.querySelector(".humidity").textContent = ``;
    document.querySelector(".wind").textContent = ``;
    document.querySelector(".feelslike").textContent = `Feels Like`;
  } else {
    inputBOXofCityNname.value = "";
    inputBOXofCityNname.blur();

    let data = await response.json();
    console.log(data);

    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;

    const weatherCondition = data.weather[0].main;

    const weatherIcon = document.querySelector(".weathericon");
    weatherIcon.src = `images/${weatherCondition}.png`;

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = `${Math.round(temp)}°c`;
    document.querySelector(".humidity").textContent = `${humidity}%`;
    document.querySelector(".wind").textContent = `${speed}km/h`;
    document.querySelector(".feelslike").textContent = `Feels Like ${Math.round(
      feels_like
    )}°c`;
  }
}

// For Dark Mode
let darkmode = 0;
darkModeBtn.addEventListener("click", function () {
  if (!darkmode) {
    document.body.style.backgroundColor = "#2e2b2b";
    darkmode = 1;
    darkModeBtn.textContent = "White Mode";
  } else {
    document.body.style.backgroundColor = "#e4d9d9";
    darkmode = 0;
    darkModeBtn.textContent = "Dark Mode";
  }
});
