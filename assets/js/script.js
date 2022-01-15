let submit = document.querySelector("#submit-button");
let clear = document.querySelector("#clear");
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
var clearOutDailycontainer = document.querySelector("#displayfivedayforcastContainer")
let todaysDate = document.querySelector("#dateandTime")
let weatherIcon = document.querySelector("#weatherIcon")
let UVDisplay = document.querySelector("#UV-Index")


const ul = document.querySelector('ul')
let cityDisplay = document.getElementById('city');
let cityArray = []



// Psudo code
// AP to display 5 day forcast
// Clear out local storage
// figure out UV index display 
// click on search history and brings back weather


//this is the first call to pull from the city box
submit.addEventListener('click', function (findWeather) {

   event.preventDefault();
   console.log(cityArray);
   citySearchEl.textContent = "";
   cityArray.push(citySearchEl.value);

   localStorage.setItem('city-search', JSON.stringify(cityArray));


   let x = document.createElement('li');
   var t = document.createTextNode(citySearchEl.value);

   x.appendChild(t);
   document.getElementById('city').appendChild(x)
   // append.createTextNode(alsoToday)



   let citySearch = citySearchEl.value.trim();
   if (citySearch) {
      getWeather(citySearch);
      citySearchEl.value = "";
   } else {
      alert("please enter a city");
   }

})


//this pulls from local storage and puts in left side box
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
window.onload = function () {
   document.getElementById('city-search').value = "";

}

var displayWeather = function (data, searchTerm) {

   //clear old content
   weatherContainerEl.textContent = "";
   clearOutT.textContent = "";
   clearOutW.textContent = "";
   clearOutH.textContent = "";
   citySearchTerm.textContent = searchTerm;
   todaysDate.textContent = moment().format("dddd MMM D, YYYY")
   clearOutUV.textContent = "";
   clearOutDailycontainer.textContent = "";


   // format weather attribute
   let cityLat = data.coord.lat
   let cityLon = data.coord.lon;

   let apiURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=hourly,minutely,alerts&appid=${MyKey}`
   //call second API
   fetch(apiURL2)
      .then(function (response) {
         if (response.ok) {

            response.json().then(function (data) {

               $("#UV-Index").append(document.createTextNode("UV-Index: " + data.current.uvi));

               let uv = data.current.uvi
               let uvBox = $("#UV-Index")
               uvBox.text(`UV Index: ${uv}`)
               uvBox.removeClass("w3-green w3-red w3-yellow")

               if (uv < 4) {
                  uvBox.addClass("w3-green")
               } else if (uv > 7) {
                  uvBox.addClass("w3-red")
               } else {
                  uvBox.addClass("w3-yellow")
               }


               //5 day start
               let iconURL = 'http://openweathermap.org/img/wn/'

               for (let i = 1; i < 6; i++) {
                  // const element = array[index];
                  let fiveDayTemp = data.daily[i].temp.day;
                  let fiveDayHumidity = data.daily[i].humidity;
                  let fiveDayWindSpeed = data.daily[i].wind_speed;
                  let fiveDayForcastDates = moment.unix(data.daily[i].dt).format('L');
                  let dailyIcon = data.daily[i].weather[0].icon



                  const div = document.createElement('div');
                  div.classList.add("w3-col", "w3-indigo","w3-mobile", "w3-container", 'fivedayforcastcontainers')
                  let fiveDayRound = Math.round(fiveDayTemp)
                  let windSpeedRound = Math.round(fiveDayWindSpeed)
                  let fiveDay = `${fiveDayForcastDates} <p>Temp: ${fiveDayRound} °F</p>`
                  let humidityDisplay = `<p> Humidity: ${fiveDayHumidity} %</p>`
                  let windSpeedDisplay = `<p> Wind Speed:  ${windSpeedRound} MPH</p>`
                  let iconDisplay = `<img src=${iconURL + dailyIcon + ".png"}>`


                  div.innerHTML = fiveDay + iconDisplay + humidityDisplay + windSpeedDisplay


                  // div.append(fiveDay);
                  const container = document.getElementById('displayfivedayforcastContainer');
                  container.append(div);


               }


            })
         }
      })
   //this displays daily temp on the right side



   $("#temp").append(document.createTextNode("Current temp: " + Math.round(data.main.temp) + "°F"))
   $("#wind").append(document.createTextNode("Wind speed: " + data.wind.speed + " MPH"))
   $("#humidity").append(document.createTextNode("Humidity: " + data.main.humidity + "%"));


}
//this pulls from local storage and displays under the search box
for (let i = 0; i < cityRedisplay.length; i++) {
   let x = document.createElement('li');
   var t = document.createTextNode(cityRedisplay[i]);
   x.appendChild(t);
   document.getElementById('city').appendChild(x)
}
















// $("#daily-temp").append(document.createTextNode(fiveDayForcastDates + fiveDayTemp[1]))
// $("#daily-wind").append(document.createTextNode("day x: " + data.daily[0].wind_speed + "MPH"))
// $("#daily-humidity").append(document.createTextNode("day x: " + data.daily[0].humidity + "%"))












citySearchEl.value = JSON.parse(localStorage.getItem('city-search'));

// clear storage and list called in HTML
function clearStorage() {
   localStorage.clear()
}











