import {kelvinToCelsius, kelvinToFahrenheit} from 'temperature';

export default class Weather {
    date;
    name;
    description;
    iconURL;
    temperatureKelvin;
    feelsLikeKelvin;
    highKelvin;
    lowKelvin;
    sunrise;
    sunset;
    rainChance;
    humidity;
    wind;
    pressure;
    visibility;
    uvIndex;
}