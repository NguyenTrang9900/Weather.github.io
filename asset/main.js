const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const nameOutput = document.querySelector('.name');
const countryOutput = document.querySelector('.country');
const timeOutput = document.querySelector('.time');
const dateOutput = document.querySelector('.date');
const conditionOutput = document.querySelector('.condition');
const icon = document.querySelector('.icon');
const cloudyOutput = document.querySelector('.cloudy');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const rainOutput = document.querySelector('.rain');
const form = document.getElementById('location-input')
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cityOutput = document.querySelectorAll('.city');


//defaut city when the page loads
let cityInput = "LonDon"

//add click event t each city in the panel
cityOutput.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "1 ";
    });
})

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name')
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "1";
    }
    e.preventDefault();
});

function dayOfTheWeek(year, month, Day) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wesnesay",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(`${Day}/${month}/${year}`).getDay()];
};

function fetchWeatherData() {
    let url = `http://api.weatherapi.com/v1/current.json?key=e79ad1cf622f42bcbb2150402222004&q=${cityInput}&aqi=no`

    fetch(url).then(res => res.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;
            nameOutput.innerHTML = data.location.name
            countryOutput.innerHTML = data.location.country
            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const timer = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d},${m} ${y}`;
            timeOutput.innerHTML = timer;

            const iconId = data.current.condition.icon.substr(
                "//cdn.weatherapi.com/weather.64x64/".length);
            icon.src = "./icon/" + iconId;


            cloudyOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";

        })
}


fetchWeatherData();

app.style.opacity = "1";