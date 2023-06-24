let apiKey = "a45956615d08755348fb789b5fb711ed";//self-explanatory. the api key
let userFormEl = document.querySelector('#user-form'); //id of entire form element
let cityButtonsEl = document.querySelector('#cityBtns');//creates a variable for all city buttons (we'll use this later as data.items, city)
let searchBarEl = document.querySelector("#city");//input box for user to type in text
let forecastEl = document.querySelector('#forecast');// creates variable for where we will populate the forecast data
let todayEl = document.querySelector('#today')
const date = new Date();

let searchHandler = function (event) {
    event.preventDefault();//keeps page from refreshing when submit button is clicked
    let city = searchBarEl.value;
    console.log(city);//works fine
    if (city) {//if the typed text is a city
        findCity(city); //run function to find the city latitutde and longitude

        // cityNameEl.textContent = city;
        //only works here, not in displayWeather function
        // //.innerHTML and .textContent shows the city name for about half a second then says [object HTMLInput Element]
        // //element containing the city name above the forecast will populate with the appropriate city name
    }
    else {
        alert('Please make sure you put in a properly spelled city name')
        //modal for error
    }
}

let citySelectHandler = function (event) {
    let city = event.target.getAttribute('data-city');//selects the clicked on popular city

    if (city) {//if a popular city button is clicked
        findCity(city);//run the getWeather function using popCity as the 'city'
        //citynamedisplayEl.textContent = '';// title element above displayed weather will have the name of the popular city selected
    }
};


function findCity(city) {//findCity function is just to retrieve lat and lon from GeoUrl
    let geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    fetch(geoUrl)
        .then(function (response) {
            // if (response.ok) {
            return response.json()
        }).then(function (data) {
            // displayWeather(data, city);
            console.log(data);
            findWeather(data);

        })
    // } else {
    //     alert('error' + response.statusText);
    // }

    // .catch(function (error) {
    //     alert('Unable to connect')
    // });
};

let findWeather = function (data) {//?
    lat = data.coord.lat;
    lon = data.coord.lon;
    let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    //note the '$units=imperial' in the url above is what the weatherApi website provides but we still only get our units in kelvins.
    console.log(lat, lon)
    fetch(weatherUrl)
        .then(function (response) {
            return response.json()//if you do not have the () you will get an empty json object
        })
        .then(function (fiveDayData) {

            foreCast(fiveDayData)
        })

    displayWeather(data);

}
let displayWeather = function (data) {
    const temp = data.main.temp;
    const wind = data.wind.speed;
    const humidity = data.main.humidity
    const weatherData = [temp, wind, humidity]
    console.log(weatherData)
    if (!city) {
        forecastEl.textContent = 'Weather not found for this city, try again.'
    } else {
        // cityNameEl.innerHTML = data.name;

        //current day data
        const currentDate = document.createElement('h2');
        currentDate.innerHTML = `${data.name} ${date.toLocaleDateString()}`;
        //appending the currentDate to the cityNameEl as a child element
        todayEl.appendChild(currentDate);
        //creating a span for the currentWeather data
        const currentTemp = document.createElement('li');
        const currentWind = document.createElement('li');
        const currentHumidity = document.createElement('li');

        currentTemp.classList = 'flex-row align-center';
        currentWind.classList = 'flex-row align-center';
        currentHumidity.classList = 'flex-row align-center';

        currentTemp.innerHTML = `Temperature: ${temp}`;
        currentWind.innerHTML = `Wind Speed: ${wind}`;
        currentHumidity.innerHTML = `Humidity: ${humidity}%`;

        todayEl.appendChild(currentTemp);
        todayEl.appendChild(currentWind);
        todayEl.appendChild(currentHumidity);

    }
}

const foreCast = (fiveDayData) => {


    console.log(fiveDayData)
    if (fiveDayData) {
        for (let i = 0; i < fiveDayData.list.length; i += 8) {
            days = fiveDayData.list[i];
            console.log(days)
            const temp = days.temp;
            const wind = days.speed;
            const humidity = days.humidity
            //the loop should create five different boxes with their own respective data
            const fiveDayEl = document.createElement('p');
            fiveDayEl.innerHTML = `${days}`;
            //appending the fiveDayEl to the forecast as a child element
            forecastEl.appendChild(fiveDayEl);
            //creating a p element for each item
            const fiveDayTemp = document.createElement('li');
            const fiveDayWind = document.createElement('li');
            const fiveDayHumidity = document.createElement('li');

            fiveDayTemp.classList = 'flex-row align-center';
            fiveDayWind.classList = 'flex-row align-center';
            fiveDayHumidity.classList = 'flex-row align-center';

            fiveDayTemp.innerHTML = `Temperature: ${days.temp}`;
            fiveDayWind.innerHTML = `Wind Speed: ${days.wind}`;
            fiveDayHumidity.innerHTML = `Humidity: ${days.humidity}%`;

            fiveDayEl.appendChild(fiveDayTemp);
            fiveDayEl.appendChild(fiveDayWind);
            fiveDayEl.appendChild(fiveDayHumidity);
        }
    } else {
        forecastEl.textContent = 'Weather not found for this city, try again.'
    }
}

document.querySelector(".searchBtn").addEventListener("click", searchHandler);
document.querySelector(".btn").addEventListener("click", citySelectHandler);