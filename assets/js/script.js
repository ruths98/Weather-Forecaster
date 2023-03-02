let requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}";
let apiKey = "a45956615d08755348fb789b5fb711ed"
let inputCity = ""
let queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=" + apiKey;
fetch(queryUrl)
.then(function(response){
    //convert to a json object
    return response.json();
})
// .then(function(data) {
//     console.log(data);//just to see if it shows
// let docArray = data.response.docs;
// //for loop to go through each item
// for (let i = 0; i < docArray.length; i++) {
//     const listItem = document.createElement("li");
//     listItem.textContent = docArray.description;
//     listEl.appendchild(listItem);
// }
// })

// .catch(function(error){
//     console.log(error);

// });