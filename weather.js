"use strict";
const weatherDiv = document.querySelector("[data-weather]");
const cityForm = document.querySelector("#cityForm");

const formButton = cityForm.querySelector("button");

formButton.addEventListener("click", function(e) {
    e.preventDefault();
    const cityInfo = cityForm.querySelector('input').value;
    getWeather(cityInfo);
    console.log("form has been submitted : ", cityInfo);
});



function addLocationName(name) {
    const locationName = document.createElement("p");
    locationName.innerHTML =`Location : ${name}`;
    weatherDiv.append(locationName);
}

function addTemp(temp) {
    const temperature = document.createElement("p");
    temperature.innerHTML=`Temperature : ${temp}`;
    weatherDiv.append(temperature);
}

function addConditions(conditions) {
    console.log(conditions);
    const iconUrl = document.createElement("img");
    const iconCode = conditions[0].icon;
    console.log(iconCode);
    iconUrl.src = `http://openweathermap.org/img/w/${iconCode}.png`;
    iconUrl.innerHTML=iconUrl;
    weatherDiv.append(iconUrl);
}

function addWind(windSpeed) {
    const windspeed = document.createElement("p");
    windspeed.innerHTML = `Wind Speed : ${windSpeed}`;
    weatherDiv.append(windspeed);
}

function addMap(lat, lon) {
    const iframe = document.createElement("iframe");
    const mapUrl = `http://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    iframe.setAttribute("src",mapUrl);
    //iframe.height = "200px";

    iframe.setAttribute("width","400");
    iframe.setAttribute("height","200");
    iframe.setAttribute("frameborder","0");

    weatherDiv.append(iframe);
    // add an <iframe> element with the src = mapURL
}

function addSunInfo(sunrise, sunset) {
    const rise = document.createElement("p");
    rise.innerHTML = `sunrise : ${readableDate(sunrise)}`;
    weatherDiv.append(rise);
    console.log(rise);
    const set = document.createElement("p");
    set.innerHTML = `sunset : ${readableDate(sunset)}`;
    weatherDiv.append(set);
    console.log(set);

    
}

function readableDate(unixDate) {
    // Use moment.js to convert Unix Date to readable Date
    
    const sunriseu = moment.unix(unixDate).format('dddd, MMMM Do, YYYY h:mm:ss ');
    const sunsetu = moment.unix(unixDate).format('dddd, MMMM Do, YYYY h:mm:ss ');
    return sunriseu, sunsetu;
}

function getWeather(location) {
    const URL = get(`https://api.openweathermap.org/data/2.5/weather?q=${location},US&appid=2f4580c1da2a1471787ee4c356181fd1&units=imperial`);
    URL.then(function(response){
        addConditions(response.weather);
        addLocationName(response.name);
        addTemp(response.main.temp);
        addWind(response.wind.speed);
        addMap(response.coord.lat, response.coord.lon);
        addSunInfo(response.sys.sunrise, response.sys.sunset);
        
        
});
}

getWeather("Atlanta");