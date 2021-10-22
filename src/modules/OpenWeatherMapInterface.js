export default (() => {
  const API_KEY = "2a45c82fb563af52c2ba810d9d8d59b9";
  const URL = "https://api.openweathermap.org/data/2.5";
  const WEATHER_TAG = "weather";
  const ONE_CALL_TAG = "onecall";

  const ICON_URL = "https://openweathermap.org/img/wn/";

  async function getResponse(url, params = { mode: "cors" }) {
    const response = await fetch(url, params);
    return response.json();
  }

  /**
   *
   * @param {string} keyWords
   * @returns {Promise}
   */
  async function getCurrentWeather(keyWords) {
    const apiURL = `${URL}/${WEATHER_TAG}?q=${keyWords}&appid=${API_KEY}`;
    return getResponse(apiURL);
  }

  async function getFullWeather(latitude, longitude) {
    const apiURL = `${URL}/${ONE_CALL_TAG}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    return getResponse(apiURL);
  }

  function getWeatherIcon(iconID, iconSize = 4) {
    const apiURL = `${ICON_URL}${iconID}@${iconSize}x.png`;
    return apiURL;
  }

  return { getCurrentWeather, getFullWeather, getWeatherIcon };
})();
