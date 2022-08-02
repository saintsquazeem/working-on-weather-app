const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemEl =document.getElementById("current-weather-items");
const timeZone = document.getElementById("time-zone");
const countryEl =document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");


const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const API_KEY = "d3a23a6a7475f614747480aff5e140af";


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HFormat = hour >= 13 ? hour %12:hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ?"PM" : "AM"

    timeEl.innerHTML = hoursIn12HFormat + ":" + minutes+ " " + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ", " + date+ "  " + months[month]
    

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);

        })

    }) 
        
}
    
function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
    
    
    timeZone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + "N " + data.lon+"E"

    currentWeatherItemEl.innerHTML =
    `<div class="weather-item">
         <div>Humidity</div>
         <div>${humidity}%</div>
    </div>
                    
     <div class="weather-item">
        <div>Pressure</div>
         <div>${pressure}</div>
     </div>

    <div class="weather-item">
         <div>${wind-speed}</div>
         <div>222</div>
    </div>

        
    <div class="weather-item">
         <div>Sunrise</div>
         <div>${window.moment(sunrise * 1000).format("HH:mm a")}</div>
     </div>
        
    <div class="weather-item">
        <div>sunset</div>
        <div>${window.moment(sunset * 1000).format("HH:mm a")}</div>
    </div>
        
        ` ;

    let otherDayforcast = ""
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML =`
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@6x.png" alt="weather-icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
            <div class="temp">night - ${day.temp.night}&#176; c</div>
            <div class="temp">day - ${day.temp.day}&#176; c</div>

            </div>
            
            `

        }else{
            otherDayforcast += `
            <div class="weather-forecast-item">
            <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}10d@2x.png" alt="weather-icon" class="w-icon">
            <div class="temp">night - ${day.temp.night}25.6&#176; c</div>
            <div class="temp">day - ${day.temp.day}&#176; c</div>

        </div>

            
            `
        }
        
    });

    weatherForecastEl.innerHTML = otherDayforcast;
}


