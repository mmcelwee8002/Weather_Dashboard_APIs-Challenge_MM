let submit = document.querySelector("#submit-button");
let MyKey = '7f3ebf71d1f7628ae2b6e804de9ef527';


var getWeather = function(name){
    
    //formating the weather API

    let apiURL = "https://api.openweathermap.org/data/2.5/weather/?q=+cityName+&appid=7f3ebf71d1f7628ae2b6e804de9ef527";
    
    // make a request to the url
    fetch(apiURL).then(function(response){
        console.log(response)
     response.json().then(function(data){
        console.log(data);
     });   

});  


  
}
getWeather();



// console.log(response.weather);
// console.log(response.name);