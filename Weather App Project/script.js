let weather = {
    api_key: "82425adc97757288c9fd02206bf84f46",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" + this.api_key
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        if (data.cod == "200") {
            getweather(data);
        }
        else if(data.cod == "400") {
            noinput(data);
        }
        else{
            citynotfound(data);
        }
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

const timeEl = document.getElementById('time');

setInterval(() => {
    const time = new Date();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'
    const tonie= "Time:"

    timeEl.innerHTML = tonie + ' ' + (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

}, 1000);

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") weather.search();
    });
weather.fetchWeather("Nigeria");

function getweather (data) {
    const { name } = data;
    const { description, icon } = data.weather[0];
    const { temp, humidity } =data.main;
    const { speed } = data.wind;

    document.querySelector(".city-location").innerHTML = "Weather in " + name;
    document.querySelector(".icon").style.backgroundImage = "url(https://openweathermap.org/img/wn/"+ icon + "@2x.png";
    document.querySelector(".temperature-degree").innerHTML = temp + "°C";
    document.querySelector(".weather-description").innerHTML = description;
    document.querySelector(".humidity").innerHTML = "Humidity: " + humidity  + "%";
    document.querySelector(".wind").innerHTML = "Wind: " + speed + "Km/hr";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')";
    document.querySelector(".temperature-degree").style.position = "relative";
    document.querySelector(".temperature-degree").style.visibility = "visible";
    document.querySelector(".humidity").style.position = "relative";
    document.querySelector(".humidity").style.visibility = "visible";
    document.querySelector(".wind").style.position = "relative";
    document.querySelector(".wind").style.visibility = "visible";
}

function noinput (data) {
    document.querySelector(".city-location").innerHTML ="Seems Something went wrong";
    document.querySelector(".temperature-degree").style.position ="absolute";
    document.querySelector(".temperature-degree").style.visibility = "hidden";
    document.querySelector(".humidity").style.position = "absolute";
    document.querySelector(".humidity").style.visibility = "hidden";
    document.querySelector(".wind").style.position = "absolute";
    document.querySelector(".wind").style.visibility = "hidden";
}

function citynotfound (data) {
    document.querySelector("city-location").innerHTML = "City not Found";
    document.querySelector(".temperature-degree").style.position = "absolute";
    document.querySelector(".temperature-degree").style.visibility = "hidden";
    document.querySelector(".humidity").style.position = "absolute";
    document.querySelector(".humidity").style.visibility = "hidden";
    document.querySelector(".wind").style.position = "absolute";
    document.querySelector(".wind").style.visibility = "visible";
}
