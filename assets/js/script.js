let submit = document.querySelector("#submit-button");
let MyKey = '7f3ebf71d1f7628ae2b6e804de9ef527';
var searchFormEl = document.querySelector("#search-form");
var citySearchEl = document.querySelector("#city-search");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");


var formSubmitHandler = function (event) {
   event.preventDefault();
   let citySearch = citySearchEl.value.trim();
   if (citySearch) {
      getWeather(citySearch);
      citySearchEl.value = "";
   } else {
      alert("please enter a city");
   }
}
var getWeather = function (cityName) {
   //formating the weather API

   let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + MyKey

   // make a request to the url
   fetch(apiURL).then(function (response) {
      console.log(response)
      response.json().then(function (data) {
         displayWeather(data, cityName)
         console.log(data);
      });
   });
}

var displayWeather = function(weather, searchTerm){
function retrunMulipleElements(){
   return[weather.main.temp, weather.wind.speed, weather.main.humidity]

}

//clear old content
weatherContainerEl.textContent = "";
citySearchTerm.textContent = searchTerm;


// format weather attribute
// var cityTemp = weather.main.temp
var cityTemp = retrunMulipleElements();

   var firstValue = retrunMulipleElements[0]
   var secondValue = retrunMulipleElements[1];
   var thridValue = retrunMulipleElements[2]
   $("p").append( document.createTextNode(cityTemp[0]) )
   // $("p").append( document.createTextNode(cityTemp[1]) )
// row for each attribute
// var weatherEl = document.createElement("div");
// weatherEl.classList = "list-item flex-row justify-space-between align-center";

  // create a span element to hold repository name
//   var weatherAttribute = document.createElement("span");
//   weatherAttribute.textContent = cityTemp;
 


//  append to container
//  weatherEl.appendChild(weatherAttribute);

 // append container to the dom
//  weatherContainerEl.appendChild(weatherEl);
}

searchFormEl.addEventListener("submit", formSubmitHandler);




// console.log(response.weather);
// console.log(response.name);