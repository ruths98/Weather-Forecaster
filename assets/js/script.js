let apiKey = "a45956615d08755348fb789b5fb711ed";//self-explanatory. the api key
let userFormEl = document.querySelector('#user-form'); //id of entire form element
let cityButtonsEl = document.querySelector('#cityBtns');//creates a variable for all city buttons (we'll use this later as data.items, city)
let searchBarEl = document.querySelector("#city");//input box for user to type in text
let forecastEl = document.querySelector('#forecast');// creates variable for where we will populate the forecast data
//do I need to create a variable for the city selected? maybe not yet

let searchHandler = function (event) {
    event.preventDefault();//keeps page from refreshing when submit button is clicked
    let city = searchBarEl.value;
    console.log(city);//works fine
    if (city) {//if the typed text is a city
        findCity(city); //run function to find the city latitutde and longitude

        //citynamedisplayEl.textContent = '';//element containing the city name above the forecast will populate with the appropriate city name
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

findCity;
function findCity() {
    city = searchBarEl.value;
    let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    fetch(geoUrl)
        .then(function (response) {
            if (response.ok) {
                 return response.json()
                 .then(function(data){
                    displayWeather(data, city);
                    console.log(data);
                 });
                } else {
                alert('error' + response.statusText);
            } 
        })
                   .catch(function (error) {
            alert('Unable to connect')
        });



};

let findWeather = function (data,city) {//?
    let lat = geoUrl.data.lat;
    let lon = geoUrl.data.lon;
    let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=a45956615d08755348fb789b5fb711ed";

    fetch(weatherUrl)
        .then(function (response) {
            return response.json;

        })
        .then(function (data) {
            console.log(city);
            // let docArray = data.response.docs;
            // //create a for loop to go trhough each object in the array
            // for (let i = 0; i < docArray.length; i++) {
            //     const listItem = document.createElement("li");

            // }
        });
}

let displayWeather = function(data,city){

}

document.querySelector(".searchBtn").addEventListener("click", searchHandler);