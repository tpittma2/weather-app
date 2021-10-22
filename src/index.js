/* eslint-disable no-console */
import dateFormat from "dateformat";
import weatherInterface from "./modules/openWeatherMapInterface";
import weatherController from "./modules/openWeatherMapController";
import { kelvinToFahrenheit } from "./modules/utils";

async function test() {
  const city = "carrollton,ga";
  try {
    const weatherObj = await weatherController.getWeather(city);
    console.log(weatherObj);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

test();
