import weatherInterface from './modules/openWeatherMapInterface';
import weatherMapper from './modules/openWeatherMapMapper';
import dateFormat, { masks } from 'dateformat';

async function test() {

   try{
        let currentWeatherResponse = weatherInterface.getCurrentWeather('carrollton,ga,us');
    let fullWeatherResponse = weatherInterface.getFullWeather(33.7212,-85.1455);

    let responses = await Promise.all([currentWeatherResponse, fullWeatherResponse]);
    console.log(responses[0]);
    console.log(responses[1]);
    console.log(weatherInterface.getWeatherIcon('03d'));

    const weatherObj = weatherMapper.mapCurrentWeather(responses[0]);
    console.log(weatherObj);

    const fullWeatherObj = weatherMapper.mapFullWeather(responses[1]);
    console.log(fullWeatherObj);

    console.log(dateFormat(weatherObj.date, 'mm/dd/yyyy hh:MM:ss TT'));
   }
   catch(error) {
       console.log('Error: ' + error);
   }

}

test();