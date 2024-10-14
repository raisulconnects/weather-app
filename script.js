"use strict";

const searchBtn = document.querySelector(".searchBtn");
const darkModeBtn = document.querySelector(".modeBtn");
const noteLabel = document.querySelector(".note");
const lastUpdateLabel = document.querySelector(".lastUpdate");
let forAutoUpdate;

const apiKey = "d7f9500548ed60f909a95764b227f559";
let inputBOXofCityNname = document.querySelector(".citynamebox");

searchBtn.addEventListener("click", function () {
  inputBOXofCityNname = document.querySelector(".citynamebox");
  CheckWeather(inputBOXofCityNname.value);
});

document.addEventListener("keypress", function (e) {
  inputBOXofCityNname = document.querySelector(".citynamebox");
  if (e.key == "Enter") CheckWeather(inputBOXofCityNname.value);
  forAutoUpdate = inputBOXofCityNname.value;
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

    // Extract sunrise and sunset timestamps from the API response
    const sunriseTimestamp = data.sys.sunrise;
    const sunsetTimestamp = data.sys.sunset;

    // Convert Unix timestamp to Date object
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);

    // Format time to hours and minutes (HH:MM)
    const sunriseTime = sunriseDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const sunsetTime = sunsetDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

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
    document.querySelector(".weatherDescription").textContent =
      data.weather[0].description[0].toUpperCase() +
      data.weather[0].description.slice(1);

    lastUpdateLabel.textContent = `Last Updated: ${
      new Date().getHours() % 12 || 12
    }:${new Date().getMinutes().toString().padStart(2, "0")} ${
      new Date().getHours() >= 12 ? "PM" : "AM"
    }`;
    document.querySelector(".sunrise").textContent = `${sunriseTime}`;
    document.querySelector(".sunset").textContent = `${sunsetTime}`;

    // AutoUpdates Stats Which Updates all the stats after every 2 Minutes (Old Way)
    // const autoUpdateStats = setInterval(function () {
    //   CheckWeather(forAutoUpdate);
    //   clearInterval(autoUpdateStats);
    // }, 120000);
  }
}

// AutoUpdates Stats Which Updates all the stats after every 2 Minutes
const autoUpdateStats = setInterval(function () {
  CheckWeather(forAutoUpdate);
}, 120000);

// For Dark Mode
let darkmode = 0;
darkModeBtn.addEventListener("click", function () {
  if (!darkmode) {
    document.body.style.backgroundColor = "#2e2b2b";
    darkmode = 1;
    darkModeBtn.textContent = "White Mode";
    lastUpdateLabel.style.color = "white";
    noteLabel.style.color = "white";
  } else {
    document.body.style.backgroundColor = "#e4d9d9";
    darkmode = 0;
    darkModeBtn.textContent = "Dark Mode";
    lastUpdateLabel.style.color = "black";
    noteLabel.style.color = "black";
  }
});
