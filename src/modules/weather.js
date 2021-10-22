import { kelvinToCelsius, kelvinToFahrenheit } from "./utils";

export default class Weather {
  constructor() {
    this.date = null;
    this.location = null;
    this.name = null;
    this.description = null;
    this.iconID = null;
    this.temperatureKelvin = null;
    this.feelsLikeKelvin = null;
    this.highKelvin = null;
    this.lowKelvin = null;
    this.sunrise = null;
    this.sunset = null;
    this.rainChance = null;
    this.humidity = null;
    this.windSpeed = null;
    this.windDeg = null;
    this.pressure = null;
    this.visibility = null;
    this.uvIndex = null;
    this.latitude = null;
    this.longitude = null;
  }

  // eslint-disable-next-line class-methods-use-this
  getTemp(kelvin, unit) {
    switch (unit) {
      case unit.startsWith("C"):
        return kelvinToCelsius(kelvin);
      case unit.startsWith("F"):
        return kelvinToFahrenheit(kelvin);
      default:
        return kelvin;
    }
  }

  getTemperature(unit) {
    return this.getTemp(this.temperatureKelvin, unit);
  }

  getTemperatureCelcius() {
    return this.getTemp(this.temperatureKelvin, "C");
  }

  getTemperatureFahrenheit() {
    return this.getTemp(this.temperatureKelvin, "F");
  }

  getFeelsLike(unit) {
    return this.getTemp(this.feelsLikeKelvin, unit);
  }

  getFeelsLikeCelcius() {
    return this.getTemp(this.feelsLikeKelvin, "C");
  }

  getFeelsLikeFahrenheit() {
    return this.getTemp(this.feelsLikeKelvin, "F");
  }

  getHigh(unit) {
    return this.getTemp(this.highKelvin, unit);
  }

  getHighCelcius() {
    return this.getTemp(this.highKelvin, "C");
  }

  getHighFahrenheit() {
    return this.getTemp(this.highKelvin, "F");
  }

  getLow(unit) {
    return this.getTemp(this.lowKelvin, unit);
  }

  getLowCelcius() {
    return this.getTemp(this.lowKelvin, "C");
  }

  getLowFahrenheit() {
    return this.getTemp(this.lowKelvin, "F");
  }
}
