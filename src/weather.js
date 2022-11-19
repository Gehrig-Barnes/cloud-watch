import { weatherKey } from "./module.js";

const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  if (link.href.includes(`${currentPage}`)) {
    link.className = "active";
  }
});
const show = document.querySelector("#show-forecast");
const searchForm = document.querySelector("#search-form");
const pParent = document.querySelector("#hold-p");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const zipCode = e.target["search-input"].value;
  const getWeather = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${weatherKey}`;
  fetch(getWeather)
    .then((r) => r.json())
    .then((data) => {
      getCurrentWeather(data.lat, data.lon, weatherKey);

      if (show.textContent === "show forecast") {
        show.addEventListener("click", () => {
          getWeatherForecast(data.lat, data.lon, key);
        });
      }
    });
});

function getCurrentWeather(lat, lon, key) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
  )
    .then((r) => r.json())
    .then((data) => console.log(data));
}

function getWeatherForecast(lat, lon, key) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
  )
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      pParent.removeChild(show);
      console.log(pParent);
    });
}
