let submit = document.querySelector("#submit-button");
let MyKey = '7f3ebf71d1f7628ae2b6e804de9ef527';
let MyKey2 = 'fca3d78fd5aeb1786803352e7b7472dc'
var searchFormEl = document.querySelector("#search-form");
var citySearchEl = document.querySelector("#city-search");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");
var clearOutT = document.querySelector("#temp")
var clearOutW = document.querySelector("#wind")
var clearOutH = document.querySelector("#humidity")
var clearOutUV = document.querySelector("#UV-Index")
const ul = document.querySelector('ul')
let cityDisplay = document.getElementById('city');
let cityArray = []
// Psudo code
// AP to display 5 day forcast
// Clear out local storage
// figure out UV index display 
// click on search history and brings back weather


// var formSubmitHandler = function (event) {
 submit.addEventListener('click', function(){ 
   console.log("the button was clicked") 
   event.preventDefault();
  console.log(cityArray);
   citySearchEl.textContent = "";
   cityArray.push(citySearchEl.value);

   localStorage.setItem('city-search', JSON.stringify(cityArray));

   let x = document.createElement('li');
   var t = document.createTextNode(citySearchEl.value);
   x.appendChild(t);
   document.getElementById('city').appendChild(x)


   let citySearch = citySearchEl.value.trim();
   if (citySearch) {
      getWeather(citySearch);
      citySearchEl.value = "";
   } else {
      alert("please enter a city");
   }
})

let cityRedisplay = JSON.parse(localStorage.getItem('city-search'));
console.log(JSON.parse(localStorage.getItem('city-search')))



var getWeather = function (cityName) {
   //formating the weather API

   let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + MyKey;

   console.log(cityName)

   // make a request to the url
   fetch(apiURL).then(function (response) {
      console.log(response)
      response.json().then(function (data) {
         displayWeather(data, cityName)
      })
   })
}

// clears search field on reload
window.onload = function(){
   document.getElementById('city-search').value= "";
}

var displayWeather = function (data, searchTerm) {

   console.log(data.main.temp);

   //clear old content
   weatherContainerEl.textContent = "";
   clearOutT.textContent = "";
   clearOutW.textContent = "";
   clearOutH.textContent = "";
   citySearchTerm.textContent = searchTerm;
   

   // format weather attribute


   $("#temp").append(document.createTextNode("Current temp: " + Math.round(data.main.temp) + "°F"))
   $("#wind").append(document.createTextNode("Wind speed: " + data.wind.speed + " MPH"))
   $("#humidity").append(document.createTextNode("Humidity: " + data.main.humidity + "%"));
   // $("#UV-Index").append(document.createTextNode("UV-Index: " + data.current.uvi));

}

for (let i = 0; i < cityRedisplay.length; i++) {
   let x = document.createElement('li');
   var t = document.createTextNode(cityRedisplay[i]);
   x.appendChild(t);
   document.getElementById('city').appendChild(x)
   
}

//need to load the local storage
// cityArray with the data

//save city in search

citySearchEl.value = JSON.parse(localStorage.getItem('city-search'));









searchFormEl.addEventListener("submit", formSubmitHandler);