let apiKey = "a45956615d08755348fb789b5fb711ed";//self-explanatory. the api key
let userFormEl = document.querySelector('#user-form'); //id of entire form element
let cityButtonsEl = document.querySelector('#cityBtns');//creates a variable for all city buttons (we'll use this later as data.items, city)
let searchBarEl = document.querySelector("#city");//input box for user to type in text
let forecastEl = document.querySelector('#forecast');// creates variable for where we will populate the forecast data
//do I need to create a variable for the city selected? maybe not yet

let eventHandler = function (event) {
    event.preventDefault();
    let city = searchBarEl.value;
         if (city === 'city')
            window.prompt('Search box must not be empty')
        //modal for error
        city = '';
    }

    function findCity() {
        let city = searchBarEl.value;
        let geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=a45956615d08755348fb789b5fb711ed";

        fetch(geoUrl)
            .then(function (response) {
                console.log(response);
                return response.json;
            })
            .then(function (data) {
                console.log(data);

            });
       

        let lat = geoUrl.data.lat;
        let lon = geoUrl.data.lon;
        let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=a45956615d08755348fb789b5fb711ed";

        fetch(weatherUrl);

        fetch(weatherUrl)
            .then(function (response) {
                console.log(response);
                return response.json;

            })
            .then(function (data) {
                console.log(data);
                // let docArray = data.response.docs;
                // //create a for loop to go trhough each object in the array
                // for (let i = 0; i < docArray.length; i++) {
                //     const listItem = document.createElement("li");

                // }
            });
    };

document.querySelector(".searchBtn").addEventListener("click", eventHandler);