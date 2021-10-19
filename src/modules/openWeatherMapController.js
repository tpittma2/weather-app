import Weather from './weather';
import FullWeather from './full-weather';
import { unixUTCToDate, toPercent } from './utils';
import weatherInterface from './openWeatherMapInterface';
import Alert from './alert';

export default (() => {
  function mapWeatherDescription(weatherObj, openWeatherMapObj) {
    if (openWeatherMapObj.weather.length > 0) {
      // eslint-disable-next-line no-param-reassign
      weatherObj.name = openWeatherMapObj.weather[0].main;
      // eslint-disable-next-line no-param-reassign
      weatherObj.description = openWeatherMapObj.weather[0].description;
      // eslint-disable-next-line no-param-reassign
      weatherObj.iconID = openWeatherMapObj.weather[0].icon;
    }
  }

  function mapAlert(openWeatherMapAlertObj) {
    const alertObj = new Alert();
    alertObj.senderName = openWeatherMapAlertObj.sender_name;
    alertObj.event = openWeatherMapAlertObj.event;
    alertObj.start = unixUTCToDate(openWeatherMapAlertObj.start);
    alertObj.end = unixUTCToDate(openWeatherMapAlertObj.end);
    alertObj.description = openWeatherMapAlertObj.description;
    return alertObj;
  }

  function mapWeatherObj(openWeatherObj) {
    const weatherObj = new Weather();
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
    return weatherObj;
  }

  function mapFullWeather(openWeatherMapObj) {
    const weatherObj = new FullWeather();
    weatherObj.latitude = openWeatherMapObj.lat;
    weatherObj.longitude = openWeatherMapObj.lon;

    // current weather
    weatherObj.currentWeather = mapWeatherObj(openWeatherMapObj.current);

    // hourly weather
    openWeatherMapObj.hourly.forEach((hourlyOWMObj) => {
      const hourlyWeatherObj = mapWeatherObj(hourlyOWMObj);
      weatherObj.hourlyWeather.push(hourlyWeatherObj);
    });

    // daily weather
    openWeatherMapObj.daily.forEach((owmObj) => {
      const dailyWeatherObj = mapWeatherObj(owmObj);
      weatherObj.dailyWeather.push(dailyWeatherObj);
      dailyWeatherObj.temperatureKelvin = owmObj.temp.day;
      dailyWeatherObj.highKelvin = owmObj.temp.max;
      dailyWeatherObj.lowKelvin = owmObj.temp.min;
      dailyWeatherObj.feelsLikeKelvin = owmObj.feels_like.day;
    });

    openWeatherMapObj.alerts.forEach((alert) => {
      weatherObj.alerts.push(mapAlert(alert));
    });

    return weatherObj;
  }

  function mapCurrentWeather(openWeatherMapObj) {
    const weatherObj = new Weather();
    // coords
    weatherObj.latitude = openWeatherMapObj.coord.lat;
    weatherObj.longitude = openWeatherMapObj.coord.lon;

    // weather
    mapWeatherDescription(weatherObj, openWeatherMapObj);

    // main
    weatherObj.temperatureKelvin = openWeatherMapObj.main.temp;
    weatherObj.feelsLikeKelvin = openWeatherMapObj.main.feels_like;
    weatherObj.lowKelvin = openWeatherMapObj.main.temp_min;
    weatherObj.highKelvin = openWeatherMapObj.main.temp_max;
    weatherObj.pressure = openWeatherMapObj.main.pressure;
    weatherObj.humidity = openWeatherMapObj.main.humidity;

    weatherObj.visibility = openWeatherMapObj.visibility;

    // wind
    weatherObj.windSpeed = openWeatherMapObj.wind.speed;

    weatherObj.date = unixUTCToDate(openWeatherMapObj.dt);

    weatherObj.sunrise = unixUTCToDate(openWeatherMapObj.sys.sunrise);
    weatherObj.sunset = unixUTCToDate(openWeatherMapObj.sys.sunset);

    weatherObj.location = openWeatherMapObj.name;

    return weatherObj;
  }

  async function getWeather(keywords) {
    let currentWeatherResponse = await weatherInterface.getCurrentWeather(keywords);
    if (currentWeatherResponse.cod === '404' && !keywords.replace(' ', '').toUpperCase().endsWith(',US')) {
      currentWeatherResponse = await weatherInterface.getCurrentWeather(`${keywords},US`);
    }

    const weatherObj = mapCurrentWeather(currentWeatherResponse);
    console.log(weatherObj);

    if (!weatherObj.latitude || !weatherObj.longitude) throw new Error(`Could not find city ${keywords}`);
    const fullWeatherResponse = await weatherInterface.getFullWeather(
      weatherObj.latitude, weatherObj.longitude,
    );

    console.log(fullWeatherResponse);
    console.log(weatherInterface.getWeatherIcon(weatherObj.iconID));

    const fullWeatherObj = mapFullWeather(fullWeatherResponse);
    fullWeatherObj.currentWeather = weatherObj;
    console.log(fullWeatherObj);

    return fullWeatherObj;

    // console.log(dateFormat(weatherObj.date, 'mm/dd/yyyy hh:MM:ss TT'));

    // console.log(kelvinToFahrenheit(fullWeatherObj.currentWeather.temperatureKelvin).toFixed());
  }

  return { mapCurrentWeather, mapFullWeather, getWeather };
})();
