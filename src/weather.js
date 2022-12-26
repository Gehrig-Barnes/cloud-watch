import { weatherKey } from "./module.js";

const currentPage = window.location.pathname;
document.querySelectorAll("nav a").forEach((link) => {
  if (link.href.includes(`${currentPage}`)) {
    link.className = "active";
  }
});
const currWeather = document.querySelector("#curr-weather");
const show = document.querySelector("#show-forecast");
const searchForm = document.querySelector("#search-form");
const pParent = document.querySelector("#hold-p");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const zipCode = e.target["search-input"].value;
  const locationByZip = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${weatherKey}`;
  getCoordinates(locationByZip);
});

function getCoordinates(requestResource) {
  fetch(requestResource)
    .then((r) => {
      if (r.ok) {
        return r.json();
      }
      throw new Error("Please add an existing zip code");
    })
    .then((data) => {
      getCurrentWeather(data.lat, data.lon, weatherKey);
      if (show.textContent === "show forecast") {
        show.addEventListener("click", () => {
          getWeatherForecast(data.lat, data.lon, weatherKey);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getCurrentWeather(lat, lon, key) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
  )
    .then((r) => r.json())
    .then((data) => {
      
      buildWeatherDiv(data, currWeather);
    });
}

function buildWeatherDiv(data, currWeather) {
  const currWeatherChildren = currWeather.children;
  const currCard = currWeatherChildren[1].children[0].children;
  const svg = currWeatherChildren[1].children[1].children[1];
  const description = currWeatherChildren[1].children[1].children[0];
  currWeatherChildren[0].textContent = data.name;
  currCard[0].textContent = `${data.main.temp}°`;
  currCard[0].style.fontSize = "40px";
  currCard[1].textContent = `feels like: ${data.main.feels_like}°`;
  currCard[2].textContent = `Humidity ${data.main.humidity}`;
  currCard[3].textContent = `High: ${data.main.temp_max}°`;
  currCard[4].textContent = `Low: ${data.main.temp_min}°`;
  svg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  description.textContent = data.weather[0].description;
  currWeather.style.opacity = 1;
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
