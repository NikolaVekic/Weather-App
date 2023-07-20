const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const currentURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&'
const apiKey = '7dfc47d8ef02b633706a073a30b764e8';

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-btn");
const currentBtn = document.querySelector(".current-btn");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city){
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    var data = await response.json();

    if(data.cod === "404"){
        document.querySelector(".city").innerHTML = data.message;
    } else {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        weatherIcon.src = "images/" + data.weather[0].main.toLowerCase() + ".png";
        document.querySelector(".weather").style.display = "block";
    }

}

async function currentWeather(latitude, longgitude){
    const response = await fetch(currentURL + `lat=${latitude}&lon=${longgitude}&appid=` + apiKey);
    var data = await response.json();

    if(data.cod === "404"){
        document.querySelector(".city").innerHTML = data.message;
    } else {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".input").value = data.name;

        weatherIcon.src = "images/" + data.weather[0].main.toLowerCase() + ".png";
        document.querySelector(".weather").style.display = "block";
    }

}

currentBtn.addEventListener("click", function() {
    navigator.geolocation.getCurrentPosition(position => {
        // getting latitude & longitude from position obj
        const {latitude, longitude} = position.coords;
        // getting location of passed coordinates using geocoding API
        currentWeather(latitude, longitude);

    })
  });

searchBtn.addEventListener("click", function(){
    checkWeather(searchBox.value);
})
