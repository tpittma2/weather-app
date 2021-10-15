export default (() => {
        const API_KEY = '2a45c82fb563af52c2ba810d9d8d59b9';
    const URL = 'https://api.openweathermap.org/data/2.5';
    const WEATHER_TAG = 'weather';
    const ONE_CALL_TAG = 'onecall';

    const ICON_URL = 'https://openweathermap.org/img/wn/';
    
    async function getWeatherResponse(keyWords) {
        const apiURL = `${URL}/${WEATHER_TAG}?q=${keyWords}&appid=${API_KEY}`;
        return await getResponse(apiURL);
    }
    
    async function getOneCallResponse(latitude, longitude) {
        throw new Error('test');
        const apiURL = `${URL}/${ONE_CALL_TAG}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
        return getResponse(apiURL);
    }
       
    function getWeatherIcon(iconID, iconSize = 4) {
        const apiURL = `${ICON_URL}${iconID}@${iconSize}x.png`;
        return apiURL;
    }

    async function getResponse(url, params = {mode: 'cors'}) {
        const response = await fetch(url, params);
        return await response.json();
    }

    

    return {getWeatherResponse, getOneCallResponse, getWeatherIcon}
})()



