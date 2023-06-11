let apiKey = "a45956615d08755348fb789b5fb711ed";//self-explanatory. the api key
let userFormEl = document.querySelector('#user-form'); //id of entire form element
let cityButtonsEl = document.querySelector('#cityBtns');//creates a variable for all city buttons (we'll use this later as data.items, city)
let searchBarEl = document.querySelector("#city");//input box for user to type in text
let forecastEl = document.querySelector('#forecast');// creates variable for where we will populate the forecast data
let cityNameEl = document.querySelector('#nameDisplay')
const date = new Date();
//do I need to create a variable for the city selected? maybe not yet

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
    let popCity = event.target.getAttribute('data-city');//selects the clicked on popular city

    if (popCity) {//if a popular city button is clicked
        getPopWeather(popCity);//run the getWeather function using popCity as the 'city'
        //citynamedisplayEl.textContent = '';// title element above displayed weather will have the name of the popular city selected
    }
};


function findCity(city) {//findCity function is just to retrieve lat and lon from GeoUrl
    let geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(geoUrl)
        .then(function (response) {
            // if (response.ok) {
            return response.json()
        }).then(function (data) {
            // displayWeather(data, city);
            // console.log(data.coord);
            findWeather(data);
        })
        // } else {
        //     alert('error' + response.statusText);
        // }

        .catch(function (error) {
            alert('Unable to connect')
        });
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
        cityNameEl.textContent = `${city} ${date.toLocaleDateString()}`;

        for (const i = 0; i < date.length; i++) {
            const date = date[i] //how to add +1 to day of month?
            //create span element to display the date
            const dateEl = document.createElement('span');
            dateEl.textContent = date;
            //appending the dateEl to the cityNameEl as a child element
            cityNameEl.appendChild(dateEl);
            //creating a span for the dataEl
            const dataEl = document.createElement('span');
            dataEl.classList = 'flex-row align-center';

            dataEl.innerHTML = weatherData;

            cityNameEl.appendChild(dateEl);

            cityNameEl.appendChild(weatherData);
        }
    }

}

document.querySelector(".searchBtn").addEventListener("click", searchHandler);