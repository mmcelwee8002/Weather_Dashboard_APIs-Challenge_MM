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

   let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + MyKey;


   // make a request to the url
   fetch(apiURL).then(function (response) {
      console.log(response)
      response.json().then(function (data) {
         displayWeather(data, cityName)
         console.log(data);
      });
   });


   var displayWeather = function (weather, searchTerm) {
      function retrunMulipleElements() {
         return [weather.main.temp, weather.wind.speed, weather.main.humidity]

      }

      //clear old content
      weatherContainerEl.textContent = "";
      clearOutT.textContent = "";
      clearOutW.textContent = "";
      clearOutH.textContent = "";
      citySearchTerm.textContent = searchTerm;
      clearOutUV.textContent = "";

      // format weather attribute
      var cityTemp = retrunMulipleElements();



      var firstValue = retrunMulipleElements[0]
      var secondValue = retrunMulipleElements[1];
      var thridValue = retrunMulipleElements[2]
      var forthValue = retrunMulipleElements[3]

      $("#temp").append(document.createTextNode("Current temp: " + Math.round(cityTemp[0]) + "°F"))
      $("#wind").append(document.createTextNode("Wind speed: " + cityTemp[1] + " MPH"))
      $("#humidity").append(document.createTextNode("Humidity: " + cityTemp[2] + "%"));
      $("#UV-Index").append(document.createTextNode("UV-Index: " + cityTemp[3]));
   }
}

//Api to get UV index
let getUVI = function (lat, lon) {
   var apiURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + MyKey2;


   fetch(apiURL2).then(function (response) {
      response.json().then(function (data) {
         displayUVI(data, lat, lon);
         console.log(data);

      })
   })
}

// })
// if (typeof loc === "object") {
//    cityName = `lat=${loc.latitude}&lon=${loc.longitude}`;
//  } else {
//    cityName = `q=${loc}`;
//  }


// }
// var displayUVI = function (current, searchTerm) {
//    function retrunMulipleElements() {
//       return [current.uvi]
//    }}






//UV colors
// if (responseuv.value > 0 && responseuv.value <= 2) {
//    cityUV.attr("class", "green")
// }
// else if (responseuv.value > 2 && responseuv.value <= 5) {
//    cityUV.attr("class", "yellow")
// }
// else if (responseuv.value > 5 && responseuv.value <= 7) {
//    cityUV.attr("class", "orange")
// }
// else if (responseuv.value > 7 && responseuv.value <= 10) {
//    cityUV.attr("class", "red")
// }
// else {
//    cityUV.attr("class", "purple")
// }










searchFormEl.addEventListener("submit", formSubmitHandler);




// console.log(response.weather);
// console.log(response.name);