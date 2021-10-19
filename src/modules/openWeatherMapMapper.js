import Weather from './weather';
import FullWeather from './full-weather';
import { unixUTCToDate, toPercent } from './utils';

export default (() => {


    function mapFullWeather(openWeatherMapObj) {
        const weatherObj = new FullWeather();
        weatherObj.latitude = openWeatherMapObj.lat;
        weatherObj.longitude = openWeatherMapObj.lon;

        //current weather
        weatherObj.currentWeather = new Weather();
        mapWeatherObj(weatherObj.currentWeather, openWeatherMapObj.current);     
        

        //hourly weather
        openWeatherMapObj.hourly.forEach(hourlyOWMObj => {
            let hourlyWeatherObj = new Weather();
            weatherObj.hourlyWeather.push(hourlyWeatherObj);
            mapWeatherObj(hourlyWeatherObj, hourlyOWMObj);
        });

        //daily weather
        openWeatherMapObj.daily.forEach(owmObj => {
            let dailyWeatherObj = new Weather();
            weatherObj.dailyWeather.push(dailyWeatherObj);
            mapWeatherObj(dailyWeatherObj, owmObj);
            dailyWeatherObj.temperatureKelvin = owmObj.temp.day;
            dailyWeatherObj.highKelvin = owmObj.temp.max;
            dailyWeatherObj.lowKelvin = owmObj.temp.min;
            dailyWeatherObj.feelsLikeKelvin = owmObj.feels_like.day;

        })
        
        return weatherObj;
    }

    function mapWeatherObj(weatherObj, openWeatherObj) {
        weatherObj.date = unixUTCToDate(openWeatherObj.dt);
        weatherObj.sunrise = unixUTCToDate(openWeatherObj.sunrise);
        weatherObj.sunset = unixUTCToDate(openWeatherObj.sunset);
        weatherObj.temperatureKelvin = openWeatherObj.temp;
        weatherObj.feelsLikeKelvin = openWeatherObj.feels_like;
        weatherObj.pressure = openWeatherObj.pressure;
        weatherObj.humidity = openWeatherObj.humidity;
        weatherObj.visibility = openWeatherObj.visibility;
        weatherObj.windSpeed = openWeatherObj.wind_speed;
        weatherObj.windDeg = openWeatherObj.wind_deg;
        mapWeatherDescription(weatherObj, openWeatherObj);
        weatherObj.rainChance = toPercent(openWeatherObj.pop);       
    }
     

    function mapCurrentWeather(openWeatherMapObj) {
        const weatherObj = new Weather();
        //coords
        weatherObj.latitude = openWeatherMapObj.coord.lat;
        weatherObj.longitude = openWeatherMapObj.coord.lon;

        //weather
        mapWeatherDescription(weatherObj, openWeatherMapObj) 

        //main
        weatherObj.temperatureKelvin = openWeatherMapObj.main.temp;
        weatherObj.feelsLikeKelvin = openWeatherMapObj.main.feels_like;
        weatherObj.lowKelvin = openWeatherMapObj.main.temp_min;
        weatherObj.highKelvin = openWeatherMapObj.main.temp_max;
        weatherObj.pressure = openWeatherMapObj.main.pressure;
        weatherObj.humidity = openWeatherMapObj.main.humidity;

        weatherObj.visibility = openWeatherMapObj.visibility;

        //wind
        weatherObj.windSpeed = openWeatherMapObj.wind.speed;

        weatherObj.date = unixUTCToDate(openWeatherMapObj.dt);

        weatherObj.sunrise = unixUTCToDate(openWeatherMapObj.sys.sunrise);
        weatherObj.sunset = unixUTCToDate(openWeatherMapObj.sys.sunset);

        weatherObj.location = openWeatherMapObj.name;

        return weatherObj;
    }



    function mapWeatherDescription(weatherObj, openWeatherMapObj) {
        if (openWeatherMapObj.weather.length > 0) {
            weatherObj.name = openWeatherMapObj.weather[0].main;
            weatherObj.description = openWeatherMapObj.weather[0].description;
            weatherObj.iconID = openWeatherMapObj.weather[0].icon;
        }
    }

    return { mapCurrentWeather, mapFullWeather }
})();