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

    #getTemp(kelvin, unit) {
        switch(unit) {
            case unit.startsWith('C'):
                return kelvinToCelsius(kelvin);
            case unit.startsWith('F'):
                return kelvinToFahrenheit(kelvin);
            default:
                return kelvin;
        }
    }

    getTemperature(unit) {
        return this.#getTemp(this.temperatureKelvin, unit);
    }

    getTemperatureCelcius() {
        return this.#getTemp(this.temperatureKelvin, 'C');
    }

    getTemperatureFahrenheit() {
        return this.#getTemp(this.temperatureKelvin, 'F');
    }

    getFeelsLike(unit) {
        return this.#getTemp(this.feelsLikeKelvin, unit);
    }

    getFeelsLikeCelcius() {
        return this.#getTemp(this.feelsLikeKelvin, 'C');
    }

    getFeelsLikeFahrenheit() {
        return this.#getTemp(this.feelsLikeKelvin, 'F');
    }

    getHigh(unit) {
        return this.#getTemp(this.highKelvin, unit);
    }

    getHighCelcius() {
        return this.#getTemp(this.highKelvin, 'C');
    }

    getHighFahrenheit() {
        return this.#getTemp(this.highKelvin, 'F');
    }

    getLow(unit) {
        return this.#getTemp(this.lowKelvin, unit);
    }

    getLowCelcius() {
        return this.#getTemp(this.lowKelvin, 'C');
    }

    getLowFahrenheit() {
        return this.#getTemp(this.lowKelvin, 'F');
    }
}