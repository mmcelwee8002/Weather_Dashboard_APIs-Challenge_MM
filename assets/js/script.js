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

   console.log(cityName)
   
   // make a request to the url
   fetch(apiURL).then(function (response) {
      console.log(response)
      response.json().then(function (data) {
         displayWeather(data, cityName)
         console.log(data);
         console.log(data.coord.lat)
      

      let lattitude = data.coord.lat
      let longitude = data.coord.lon;


      let apiURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&units=imperial&appid=${MyKey2}`
      console.log(data.coord.lat);

       fetch(apiURL2).then(function (response) {
         response.json().then(function (data) {
            displayWeather(data);
         })
      });
   });

      

   });
}
   var displayWeather =  function (data, searchTerm) {




      console.log(data.coord.lat);
      console.log(data.current.uvi);



      //clear old content
      weatherContainerEl.textContent = "";
      clearOutT.textContent = "";
      clearOutW.textContent = "";
      clearOutH.textContent = "";
      citySearchTerm.textContent = searchTerm;
      // clearOutUV.textContent = "";

     


      // return [data.main.temp, data.wind.speed, data.main.humidity, data.coord.lat, data.coord.lon]
      $("#temp").append(document.createTextNode("Current temp: " + Math.round(data.main.temp) + "°F"))
      $("#wind").append(document.createTextNode("Wind speed: " + data.wind.speed + " MPH"))
      $("#humidity").append(document.createTextNode("Humidity: " + data.main.humidity + "%"));
      $("#UV-Index").append(document.createTextNode("UV-Index: " + data.current.uvi));

   }





// }).then(function (Current) {
//    function returnMultipleEl() {
//       return [Current.uvi]
//    }

//    var uvIndex = retrunMulipleElements()
//    var firstIndex = retrunMulipleElements[0]

//    $("#UV-Index").append(document.createTextNode("UV-Index: " + uvIndex[0]));
// });
// }    
//     if(responseuv.value > 0 && responseuv.value <=2){
//         cityUV.attr("class","green")
//     }
//     else if (responseuv.value > 2 && responseuv.value <= 5){
//         cityUV.attr("class","yellow")
//     }
//     else if (responseuv.value >5 && responseuv.value <= 7){
//         cityUV.attr("class","orange")
//     }
//     else if (responseuv.value >7 && responseuv.value <= 10){
//         cityUV.attr("class","red")
//     }
//     else{
//         cityUV.attr("class","purple")
//     }
// });







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
