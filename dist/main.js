/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/alert.js":
/*!******************************!*\
  !*** ./src/modules/alert.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Alert)
/* harmony export */ });
class Alert {
  constructor() {
    this.senderName = null;
    this.event = null;
    this.start = null;
    this.end = null;
    this.description = null;
  }
}


/***/ }),

/***/ "./src/modules/full-weather.js":
/*!*************************************!*\
  !*** ./src/modules/full-weather.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FullWeather)
/* harmony export */ });
class FullWeather {
  constructor() {
    this.currentWeather = null;
    this.hourlyWeather = [];
    this.dailyWeather = [];
  }
}


/***/ }),

/***/ "./src/modules/openWeatherMapController.js":
/*!*************************************************!*\
  !*** ./src/modules/openWeatherMapController.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather */ "./src/modules/weather.js");
/* harmony import */ var _full_weather__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./full-weather */ "./src/modules/full-weather.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/modules/utils.js");
/* harmony import */ var _openWeatherMapInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./openWeatherMapInterface */ "./src/modules/openWeatherMapInterface.js");
/* harmony import */ var _alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./alert */ "./src/modules/alert.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {
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
    const alertObj = new _alert__WEBPACK_IMPORTED_MODULE_4__["default"]();
    alertObj.senderName = openWeatherMapAlertObj.sender_name;
    alertObj.event = openWeatherMapAlertObj.event;
    alertObj.start = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.unixUTCToDate)(openWeatherMapAlertObj.start);
    alertObj.end = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.unixUTCToDate)(openWeatherMapAlertObj.end);
    alertObj.description = openWeatherMapAlertObj.description;
    return alertObj;
  }

  function mapWeatherObj(openWeatherObj) {
    const weatherObj = new _weather__WEBPACK_IMPORTED_MODULE_0__["default"]();
    weatherObj.date = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.unixUTCToDate)(openWeatherObj.dt);
    weatherObj.sunrise = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.unixUTCToDate)(openWeatherObj.sunrise);
    weatherObj.sunset = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.unixUTCToDate)(openWeatherObj.sunset);
    weatherObj.temperatureKelvin = openWeatherObj.temp;
    weatherObj.feelsLikeKelvin = openWeatherObj.feels_like;
    weatherObj.pressure = openWeatherObj.pressure;
    weatherObj.humidity = openWeatherObj.humidity;
    weatherObj.visibility = openWeatherObj.visibility;
    weatherObj.windSpeed = openWeatherObj.wind_speed;
    weatherObj.windDeg = openWeatherObj.wind_deg;
    mapWeatherDescription(weatherObj, openWeatherObj);
    weatherObj.rainChance = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.toPercent)(openWeatherObj.pop);
    return weatherObj;
  }

  function mapFullWeather(openWeatherMapObj) {
    const weatherObj = new _full_weather__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
    const weatherObj = new _weather__WEBPACK_IMPORTED_MODULE_0__["default"]();
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

    weatherObj.date = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.unixUTCToDate)(openWeatherMapObj.dt);

    weatherObj.sunrise = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.unixUTCToDate)(openWeatherMapObj.sys.sunrise);
    weatherObj.sunset = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.unixUTCToDate)(openWeatherMapObj.sys.sunset);

    weatherObj.location = openWeatherMapObj.name;

    return weatherObj;
  }

  async function getWeather(keywords) {
    let currentWeatherResponse = await _openWeatherMapInterface__WEBPACK_IMPORTED_MODULE_3__["default"].getCurrentWeather(keywords);
    if (currentWeatherResponse.cod === '404' && !keywords.replace(' ', '').toUpperCase().endsWith(',US')) {
      currentWeatherResponse = await _openWeatherMapInterface__WEBPACK_IMPORTED_MODULE_3__["default"].getCurrentWeather(`${keywords},US`);
    }

    const weatherObj = mapCurrentWeather(currentWeatherResponse);
    console.log(weatherObj);

    if (!weatherObj.latitude || !weatherObj.longitude) throw new Error(`Could not find city ${keywords}`);
    const fullWeatherResponse = await _openWeatherMapInterface__WEBPACK_IMPORTED_MODULE_3__["default"].getFullWeather(
      weatherObj.latitude, weatherObj.longitude,
    );

    console.log(fullWeatherResponse);
    console.log(_openWeatherMapInterface__WEBPACK_IMPORTED_MODULE_3__["default"].getWeatherIcon(weatherObj.iconID));

    const fullWeatherObj = mapFullWeather(fullWeatherResponse);
    fullWeatherObj.currentWeather = weatherObj;
    console.log(fullWeatherObj);

    return fullWeatherObj;

    // console.log(dateFormat(weatherObj.date, 'mm/dd/yyyy hh:MM:ss TT'));

    // console.log(kelvinToFahrenheit(fullWeatherObj.currentWeather.temperatureKelvin).toFixed());
  }

  return { mapCurrentWeather, mapFullWeather, getWeather };
})());


/***/ }),

/***/ "./src/modules/openWeatherMapInterface.js":
/*!************************************************!*\
  !*** ./src/modules/openWeatherMapInterface.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {
  const API_KEY = '2a45c82fb563af52c2ba810d9d8d59b9';
  const URL = 'https://api.openweathermap.org/data/2.5';
  const WEATHER_TAG = 'weather';
  const ONE_CALL_TAG = 'onecall';

  const ICON_URL = 'https://openweathermap.org/img/wn/';

  async function getResponse(url, params = { mode: 'cors' }) {
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
})());


/***/ }),

/***/ "./src/modules/utils.js":
/*!******************************!*\
  !*** ./src/modules/utils.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unixUTCToDate": () => (/* binding */ unixUTCToDate),
/* harmony export */   "toPercent": () => (/* binding */ toPercent),
/* harmony export */   "celsiusToFahrenheit": () => (/* binding */ celsiusToFahrenheit),
/* harmony export */   "celsiusToKelvin": () => (/* binding */ celsiusToKelvin),
/* harmony export */   "fahrenheitToCelsius": () => (/* binding */ fahrenheitToCelsius),
/* harmony export */   "fahrenheitToKelvin": () => (/* binding */ fahrenheitToKelvin),
/* harmony export */   "kelvinToCelsius": () => (/* binding */ kelvinToCelsius),
/* harmony export */   "kelvinToFahrenheit": () => (/* binding */ kelvinToFahrenheit)
/* harmony export */ });
/**
 * Converts a Unix UTC number to a Date
 *
 * @param {number} unixNo
 * @returns {Date}
 */
function unixUTCToDate(unixNo) {
  if (!unixNo) return null;
  return new Date(unixNo * 1000);
}

function toPercent(decimal, fixedPercent = true) {
  if (!decimal || Number.isNaN(decimal)) return 0;
  const percent = decimal * 100;
  return fixedPercent ? percent.toFixed() : percent;
}

/**
 * Convert Celcius to Fahrenheit
 *
 * @param celcius number
 * @returns {number}
 */
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert Celsius to Kelvin
 *
 * @param celsius number
 * @returns {*}
 */
function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}

/**
 * Convert Fahrenheit to Celsius
 *
 * @param fahrenheit number
 * @returns {number}
 */
function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Convert Fahrenheit to Kelvin
 *
 * @param fahrenheit number
 * @returns {number}
 */
function fahrenheitToKelvin(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9 + 273.15;
}

/**
 * Convert Kelvin to Celsius
 *
 * @param kelvin number
 * @returns {number}
 */
function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

/**
 * Convert Kelvin to Fahrenheit
 *
 * @param kelvin number
 * @returns {number}
 */
function kelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9) / 5 + 32;
}


/***/ }),

/***/ "./src/modules/weather.js":
/*!********************************!*\
  !*** ./src/modules/weather.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Weather)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/modules/utils.js");


class Weather {
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
      case unit.startsWith('C'):
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.kelvinToCelsius)(kelvin);
      case unit.startsWith('F'):
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.kelvinToFahrenheit)(kelvin);
      default:
        return kelvin;
    }
  }

  getTemperature(unit) {
    return this.getTemp(this.temperatureKelvin, unit);
  }

  getTemperatureCelcius() {
    return this.getTemp(this.temperatureKelvin, 'C');
  }

  getTemperatureFahrenheit() {
    return this.getTemp(this.temperatureKelvin, 'F');
  }

  getFeelsLike(unit) {
    return this.getTemp(this.feelsLikeKelvin, unit);
  }

  getFeelsLikeCelcius() {
    return this.getTemp(this.feelsLikeKelvin, 'C');
  }

  getFeelsLikeFahrenheit() {
    return this.getTemp(this.feelsLikeKelvin, 'F');
  }

  getHigh(unit) {
    return this.getTemp(this.highKelvin, unit);
  }

  getHighCelcius() {
    return this.getTemp(this.highKelvin, 'C');
  }

  getHighFahrenheit() {
    return this.getTemp(this.highKelvin, 'F');
  }

  getLow(unit) {
    return this.getTemp(this.lowKelvin, unit);
  }

  getLowCelcius() {
    return this.getTemp(this.lowKelvin, 'C');
  }

  getLowFahrenheit() {
    return this.getTemp(this.lowKelvin, 'F');
  }
}


/***/ }),

/***/ "./node_modules/dateformat/lib/dateformat.js":
/*!***************************************************!*\
  !*** ./node_modules/dateformat/lib/dateformat.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dateFormat),
/* harmony export */   "masks": () => (/* binding */ masks),
/* harmony export */   "i18n": () => (/* binding */ i18n),
/* harmony export */   "formatTimezone": () => (/* binding */ formatTimezone)
/* harmony export */ });
var token=/d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;var timezone=/\b(?:[A-Z]{1,3}[A-Z][TC])(?:[-+]\d{4})?|((?:Australian )?(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time)\b/g;var timezoneClip=/[^-+\dA-Z]/g;function dateFormat(date,mask,utc,gmt){if(arguments.length===1&&typeof date==="string"&&!/\d/.test(date)){mask=date;date=undefined}date=date||date===0?date:new Date;if(!(date instanceof Date)){date=new Date(date)}if(isNaN(date)){throw TypeError("Invalid date")}mask=String(masks[mask]||mask||masks["default"]);var maskSlice=mask.slice(0,4);if(maskSlice==="UTC:"||maskSlice==="GMT:"){mask=mask.slice(4);utc=true;if(maskSlice==="GMT:"){gmt=true}}var _=function _(){return utc?"getUTC":"get"};var _d=function d(){return date[_()+"Date"]()};var D=function D(){return date[_()+"Day"]()};var _m=function m(){return date[_()+"Month"]()};var y=function y(){return date[_()+"FullYear"]()};var _H=function H(){return date[_()+"Hours"]()};var _M=function M(){return date[_()+"Minutes"]()};var _s=function s(){return date[_()+"Seconds"]()};var _L=function L(){return date[_()+"Milliseconds"]()};var _o=function o(){return utc?0:date.getTimezoneOffset()};var _W=function W(){return getWeek(date)};var _N=function N(){return getDayOfWeek(date)};var flags={d:function d(){return _d()},dd:function dd(){return pad(_d())},ddd:function ddd(){return i18n.dayNames[D()]},DDD:function DDD(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:i18n.dayNames[D()],short:true})},dddd:function dddd(){return i18n.dayNames[D()+7]},DDDD:function DDDD(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:i18n.dayNames[D()+7]})},m:function m(){return _m()+1},mm:function mm(){return pad(_m()+1)},mmm:function mmm(){return i18n.monthNames[_m()]},mmmm:function mmmm(){return i18n.monthNames[_m()+12]},yy:function yy(){return String(y()).slice(2)},yyyy:function yyyy(){return pad(y(),4)},h:function h(){return _H()%12||12},hh:function hh(){return pad(_H()%12||12)},H:function H(){return _H()},HH:function HH(){return pad(_H())},M:function M(){return _M()},MM:function MM(){return pad(_M())},s:function s(){return _s()},ss:function ss(){return pad(_s())},l:function l(){return pad(_L(),3)},L:function L(){return pad(Math.floor(_L()/10))},t:function t(){return _H()<12?i18n.timeNames[0]:i18n.timeNames[1]},tt:function tt(){return _H()<12?i18n.timeNames[2]:i18n.timeNames[3]},T:function T(){return _H()<12?i18n.timeNames[4]:i18n.timeNames[5]},TT:function TT(){return _H()<12?i18n.timeNames[6]:i18n.timeNames[7]},Z:function Z(){return gmt?"GMT":utc?"UTC":formatTimezone(date)},o:function o(){return(_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60)*100+Math.abs(_o())%60,4)},p:function p(){return(_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60),2)+":"+pad(Math.floor(Math.abs(_o())%60),2)},S:function S(){return["th","st","nd","rd"][_d()%10>3?0:(_d()%100-_d()%10!=10)*_d()%10]},W:function W(){return _W()},WW:function WW(){return pad(_W())},N:function N(){return _N()}};return mask.replace(token,function(match){if(match in flags){return flags[match]()}return match.slice(1,match.length-1)})}var masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",paddedShortDate:"mm/dd/yyyy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"};var i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]};var pad=function pad(val){var len=arguments.length>1&&arguments[1]!==undefined?arguments[1]:2;return String(val).padStart(len,"0")};var getDayName=function getDayName(_ref){var y=_ref.y,m=_ref.m,d=_ref.d,_=_ref._,dayName=_ref.dayName,_ref$short=_ref["short"],_short=_ref$short===void 0?false:_ref$short;var today=new Date;var yesterday=new Date;yesterday.setDate(yesterday[_+"Date"]()-1);var tomorrow=new Date;tomorrow.setDate(tomorrow[_+"Date"]()+1);var today_d=function today_d(){return today[_+"Date"]()};var today_m=function today_m(){return today[_+"Month"]()};var today_y=function today_y(){return today[_+"FullYear"]()};var yesterday_d=function yesterday_d(){return yesterday[_+"Date"]()};var yesterday_m=function yesterday_m(){return yesterday[_+"Month"]()};var yesterday_y=function yesterday_y(){return yesterday[_+"FullYear"]()};var tomorrow_d=function tomorrow_d(){return tomorrow[_+"Date"]()};var tomorrow_m=function tomorrow_m(){return tomorrow[_+"Month"]()};var tomorrow_y=function tomorrow_y(){return tomorrow[_+"FullYear"]()};if(today_y()===y&&today_m()===m&&today_d()===d){return _short?"Tdy":"Today"}else if(yesterday_y()===y&&yesterday_m()===m&&yesterday_d()===d){return _short?"Ysd":"Yesterday"}else if(tomorrow_y()===y&&tomorrow_m()===m&&tomorrow_d()===d){return _short?"Tmw":"Tomorrow"}return dayName};var getWeek=function getWeek(date){var targetThursday=new Date(date.getFullYear(),date.getMonth(),date.getDate());targetThursday.setDate(targetThursday.getDate()-(targetThursday.getDay()+6)%7+3);var firstThursday=new Date(targetThursday.getFullYear(),0,4);firstThursday.setDate(firstThursday.getDate()-(firstThursday.getDay()+6)%7+3);var ds=targetThursday.getTimezoneOffset()-firstThursday.getTimezoneOffset();targetThursday.setHours(targetThursday.getHours()-ds);var weekDiff=(targetThursday-firstThursday)/(864e5*7);return 1+Math.floor(weekDiff)};var getDayOfWeek=function getDayOfWeek(date){var dow=date.getDay();if(dow===0){dow=7}return dow};var formatTimezone=function formatTimezone(date){return(String(date).match(timezone)||[""]).pop().replace(timezoneClip,"").replace(/GMT\+0000/g,"UTC")};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");
/* harmony import */ var _modules_openWeatherMapInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/openWeatherMapInterface */ "./src/modules/openWeatherMapInterface.js");
/* harmony import */ var _modules_openWeatherMapController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/openWeatherMapController */ "./src/modules/openWeatherMapController.js");
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/utils */ "./src/modules/utils.js");
/* eslint-disable no-console */





async function test() {
  const city = 'carrollton,ga';
  try {
    const weatherObj = await _modules_openWeatherMapController__WEBPACK_IMPORTED_MODULE_2__["default"].getWeather(city);
    console.log(weatherObj);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

test();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWdDLDhEQUE4RCwrQkFBK0IsZ0JBQWdCLG1DQUFtQywrRUFBK0UsaUZBQWlGLDZEQUE2RCw4RUFBOEUsNEVBQTRFLHNEQUFzRCxzREFBc0QsK0JBQStCLDZDQUE2QyxzQkFBc0IsWUFBWSxNQUFNLFlBQW1CLGlEQUFpRDs7Ozs7O1VDQXgyTDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDb0M7QUFDNkI7QUFDRTtBQUNkO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG9GQUE0QjtBQUN6RDtBQUNBLElBQUk7QUFDSiwwQkFBMEIsTUFBTTtBQUNoQztBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvYWxlcnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9mdWxsLXdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9vcGVuV2VhdGhlck1hcENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9vcGVuV2VhdGhlck1hcEludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL3V0aWxzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvd2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlZm9ybWF0L2xpYi9kYXRlZm9ybWF0LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxlcnQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zZW5kZXJOYW1lID0gbnVsbDtcclxuICAgIHRoaXMuZXZlbnQgPSBudWxsO1xyXG4gICAgdGhpcy5zdGFydCA9IG51bGw7XHJcbiAgICB0aGlzLmVuZCA9IG51bGw7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gbnVsbDtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnVsbFdlYXRoZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5jdXJyZW50V2VhdGhlciA9IG51bGw7XHJcbiAgICB0aGlzLmhvdXJseVdlYXRoZXIgPSBbXTtcclxuICAgIHRoaXMuZGFpbHlXZWF0aGVyID0gW107XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBXZWF0aGVyIGZyb20gJy4vd2VhdGhlcic7XHJcbmltcG9ydCBGdWxsV2VhdGhlciBmcm9tICcuL2Z1bGwtd2VhdGhlcic7XHJcbmltcG9ydCB7IHVuaXhVVENUb0RhdGUsIHRvUGVyY2VudCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgd2VhdGhlckludGVyZmFjZSBmcm9tICcuL29wZW5XZWF0aGVyTWFwSW50ZXJmYWNlJztcclxuaW1wb3J0IEFsZXJ0IGZyb20gJy4vYWxlcnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCgpID0+IHtcclxuICBmdW5jdGlvbiBtYXBXZWF0aGVyRGVzY3JpcHRpb24od2VhdGhlck9iaiwgb3BlbldlYXRoZXJNYXBPYmopIHtcclxuICAgIGlmIChvcGVuV2VhdGhlck1hcE9iai53ZWF0aGVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgIHdlYXRoZXJPYmoubmFtZSA9IG9wZW5XZWF0aGVyTWFwT2JqLndlYXRoZXJbMF0ubWFpbjtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgIHdlYXRoZXJPYmouZGVzY3JpcHRpb24gPSBvcGVuV2VhdGhlck1hcE9iai53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgd2VhdGhlck9iai5pY29uSUQgPSBvcGVuV2VhdGhlck1hcE9iai53ZWF0aGVyWzBdLmljb247XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBtYXBBbGVydChvcGVuV2VhdGhlck1hcEFsZXJ0T2JqKSB7XHJcbiAgICBjb25zdCBhbGVydE9iaiA9IG5ldyBBbGVydCgpO1xyXG4gICAgYWxlcnRPYmouc2VuZGVyTmFtZSA9IG9wZW5XZWF0aGVyTWFwQWxlcnRPYmouc2VuZGVyX25hbWU7XHJcbiAgICBhbGVydE9iai5ldmVudCA9IG9wZW5XZWF0aGVyTWFwQWxlcnRPYmouZXZlbnQ7XHJcbiAgICBhbGVydE9iai5zdGFydCA9IHVuaXhVVENUb0RhdGUob3BlbldlYXRoZXJNYXBBbGVydE9iai5zdGFydCk7XHJcbiAgICBhbGVydE9iai5lbmQgPSB1bml4VVRDVG9EYXRlKG9wZW5XZWF0aGVyTWFwQWxlcnRPYmouZW5kKTtcclxuICAgIGFsZXJ0T2JqLmRlc2NyaXB0aW9uID0gb3BlbldlYXRoZXJNYXBBbGVydE9iai5kZXNjcmlwdGlvbjtcclxuICAgIHJldHVybiBhbGVydE9iajtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG1hcFdlYXRoZXJPYmoob3BlbldlYXRoZXJPYmopIHtcclxuICAgIGNvbnN0IHdlYXRoZXJPYmogPSBuZXcgV2VhdGhlcigpO1xyXG4gICAgd2VhdGhlck9iai5kYXRlID0gdW5peFVUQ1RvRGF0ZShvcGVuV2VhdGhlck9iai5kdCk7XHJcbiAgICB3ZWF0aGVyT2JqLnN1bnJpc2UgPSB1bml4VVRDVG9EYXRlKG9wZW5XZWF0aGVyT2JqLnN1bnJpc2UpO1xyXG4gICAgd2VhdGhlck9iai5zdW5zZXQgPSB1bml4VVRDVG9EYXRlKG9wZW5XZWF0aGVyT2JqLnN1bnNldCk7XHJcbiAgICB3ZWF0aGVyT2JqLnRlbXBlcmF0dXJlS2VsdmluID0gb3BlbldlYXRoZXJPYmoudGVtcDtcclxuICAgIHdlYXRoZXJPYmouZmVlbHNMaWtlS2VsdmluID0gb3BlbldlYXRoZXJPYmouZmVlbHNfbGlrZTtcclxuICAgIHdlYXRoZXJPYmoucHJlc3N1cmUgPSBvcGVuV2VhdGhlck9iai5wcmVzc3VyZTtcclxuICAgIHdlYXRoZXJPYmouaHVtaWRpdHkgPSBvcGVuV2VhdGhlck9iai5odW1pZGl0eTtcclxuICAgIHdlYXRoZXJPYmoudmlzaWJpbGl0eSA9IG9wZW5XZWF0aGVyT2JqLnZpc2liaWxpdHk7XHJcbiAgICB3ZWF0aGVyT2JqLndpbmRTcGVlZCA9IG9wZW5XZWF0aGVyT2JqLndpbmRfc3BlZWQ7XHJcbiAgICB3ZWF0aGVyT2JqLndpbmREZWcgPSBvcGVuV2VhdGhlck9iai53aW5kX2RlZztcclxuICAgIG1hcFdlYXRoZXJEZXNjcmlwdGlvbih3ZWF0aGVyT2JqLCBvcGVuV2VhdGhlck9iaik7XHJcbiAgICB3ZWF0aGVyT2JqLnJhaW5DaGFuY2UgPSB0b1BlcmNlbnQob3BlbldlYXRoZXJPYmoucG9wKTtcclxuICAgIHJldHVybiB3ZWF0aGVyT2JqO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbWFwRnVsbFdlYXRoZXIob3BlbldlYXRoZXJNYXBPYmopIHtcclxuICAgIGNvbnN0IHdlYXRoZXJPYmogPSBuZXcgRnVsbFdlYXRoZXIoKTtcclxuICAgIHdlYXRoZXJPYmoubGF0aXR1ZGUgPSBvcGVuV2VhdGhlck1hcE9iai5sYXQ7XHJcbiAgICB3ZWF0aGVyT2JqLmxvbmdpdHVkZSA9IG9wZW5XZWF0aGVyTWFwT2JqLmxvbjtcclxuXHJcbiAgICAvLyBjdXJyZW50IHdlYXRoZXJcclxuICAgIHdlYXRoZXJPYmouY3VycmVudFdlYXRoZXIgPSBtYXBXZWF0aGVyT2JqKG9wZW5XZWF0aGVyTWFwT2JqLmN1cnJlbnQpO1xyXG5cclxuICAgIC8vIGhvdXJseSB3ZWF0aGVyXHJcbiAgICBvcGVuV2VhdGhlck1hcE9iai5ob3VybHkuZm9yRWFjaCgoaG91cmx5T1dNT2JqKSA9PiB7XHJcbiAgICAgIGNvbnN0IGhvdXJseVdlYXRoZXJPYmogPSBtYXBXZWF0aGVyT2JqKGhvdXJseU9XTU9iaik7XHJcbiAgICAgIHdlYXRoZXJPYmouaG91cmx5V2VhdGhlci5wdXNoKGhvdXJseVdlYXRoZXJPYmopO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZGFpbHkgd2VhdGhlclxyXG4gICAgb3BlbldlYXRoZXJNYXBPYmouZGFpbHkuZm9yRWFjaCgob3dtT2JqKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRhaWx5V2VhdGhlck9iaiA9IG1hcFdlYXRoZXJPYmoob3dtT2JqKTtcclxuICAgICAgd2VhdGhlck9iai5kYWlseVdlYXRoZXIucHVzaChkYWlseVdlYXRoZXJPYmopO1xyXG4gICAgICBkYWlseVdlYXRoZXJPYmoudGVtcGVyYXR1cmVLZWx2aW4gPSBvd21PYmoudGVtcC5kYXk7XHJcbiAgICAgIGRhaWx5V2VhdGhlck9iai5oaWdoS2VsdmluID0gb3dtT2JqLnRlbXAubWF4O1xyXG4gICAgICBkYWlseVdlYXRoZXJPYmoubG93S2VsdmluID0gb3dtT2JqLnRlbXAubWluO1xyXG4gICAgICBkYWlseVdlYXRoZXJPYmouZmVlbHNMaWtlS2VsdmluID0gb3dtT2JqLmZlZWxzX2xpa2UuZGF5O1xyXG4gICAgfSk7XHJcblxyXG4gICAgb3BlbldlYXRoZXJNYXBPYmouYWxlcnRzLmZvckVhY2goKGFsZXJ0KSA9PiB7XHJcbiAgICAgIHdlYXRoZXJPYmouYWxlcnRzLnB1c2gobWFwQWxlcnQoYWxlcnQpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB3ZWF0aGVyT2JqO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbWFwQ3VycmVudFdlYXRoZXIob3BlbldlYXRoZXJNYXBPYmopIHtcclxuICAgIGNvbnN0IHdlYXRoZXJPYmogPSBuZXcgV2VhdGhlcigpO1xyXG4gICAgLy8gY29vcmRzXHJcbiAgICB3ZWF0aGVyT2JqLmxhdGl0dWRlID0gb3BlbldlYXRoZXJNYXBPYmouY29vcmQubGF0O1xyXG4gICAgd2VhdGhlck9iai5sb25naXR1ZGUgPSBvcGVuV2VhdGhlck1hcE9iai5jb29yZC5sb247XHJcblxyXG4gICAgLy8gd2VhdGhlclxyXG4gICAgbWFwV2VhdGhlckRlc2NyaXB0aW9uKHdlYXRoZXJPYmosIG9wZW5XZWF0aGVyTWFwT2JqKTtcclxuXHJcbiAgICAvLyBtYWluXHJcbiAgICB3ZWF0aGVyT2JqLnRlbXBlcmF0dXJlS2VsdmluID0gb3BlbldlYXRoZXJNYXBPYmoubWFpbi50ZW1wO1xyXG4gICAgd2VhdGhlck9iai5mZWVsc0xpa2VLZWx2aW4gPSBvcGVuV2VhdGhlck1hcE9iai5tYWluLmZlZWxzX2xpa2U7XHJcbiAgICB3ZWF0aGVyT2JqLmxvd0tlbHZpbiA9IG9wZW5XZWF0aGVyTWFwT2JqLm1haW4udGVtcF9taW47XHJcbiAgICB3ZWF0aGVyT2JqLmhpZ2hLZWx2aW4gPSBvcGVuV2VhdGhlck1hcE9iai5tYWluLnRlbXBfbWF4O1xyXG4gICAgd2VhdGhlck9iai5wcmVzc3VyZSA9IG9wZW5XZWF0aGVyTWFwT2JqLm1haW4ucHJlc3N1cmU7XHJcbiAgICB3ZWF0aGVyT2JqLmh1bWlkaXR5ID0gb3BlbldlYXRoZXJNYXBPYmoubWFpbi5odW1pZGl0eTtcclxuXHJcbiAgICB3ZWF0aGVyT2JqLnZpc2liaWxpdHkgPSBvcGVuV2VhdGhlck1hcE9iai52aXNpYmlsaXR5O1xyXG5cclxuICAgIC8vIHdpbmRcclxuICAgIHdlYXRoZXJPYmoud2luZFNwZWVkID0gb3BlbldlYXRoZXJNYXBPYmoud2luZC5zcGVlZDtcclxuXHJcbiAgICB3ZWF0aGVyT2JqLmRhdGUgPSB1bml4VVRDVG9EYXRlKG9wZW5XZWF0aGVyTWFwT2JqLmR0KTtcclxuXHJcbiAgICB3ZWF0aGVyT2JqLnN1bnJpc2UgPSB1bml4VVRDVG9EYXRlKG9wZW5XZWF0aGVyTWFwT2JqLnN5cy5zdW5yaXNlKTtcclxuICAgIHdlYXRoZXJPYmouc3Vuc2V0ID0gdW5peFVUQ1RvRGF0ZShvcGVuV2VhdGhlck1hcE9iai5zeXMuc3Vuc2V0KTtcclxuXHJcbiAgICB3ZWF0aGVyT2JqLmxvY2F0aW9uID0gb3BlbldlYXRoZXJNYXBPYmoubmFtZTtcclxuXHJcbiAgICByZXR1cm4gd2VhdGhlck9iajtcclxuICB9XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIoa2V5d29yZHMpIHtcclxuICAgIGxldCBjdXJyZW50V2VhdGhlclJlc3BvbnNlID0gYXdhaXQgd2VhdGhlckludGVyZmFjZS5nZXRDdXJyZW50V2VhdGhlcihrZXl3b3Jkcyk7XHJcbiAgICBpZiAoY3VycmVudFdlYXRoZXJSZXNwb25zZS5jb2QgPT09ICc0MDQnICYmICFrZXl3b3Jkcy5yZXBsYWNlKCcgJywgJycpLnRvVXBwZXJDYXNlKCkuZW5kc1dpdGgoJyxVUycpKSB7XHJcbiAgICAgIGN1cnJlbnRXZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCB3ZWF0aGVySW50ZXJmYWNlLmdldEN1cnJlbnRXZWF0aGVyKGAke2tleXdvcmRzfSxVU2ApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHdlYXRoZXJPYmogPSBtYXBDdXJyZW50V2VhdGhlcihjdXJyZW50V2VhdGhlclJlc3BvbnNlKTtcclxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJPYmopO1xyXG5cclxuICAgIGlmICghd2VhdGhlck9iai5sYXRpdHVkZSB8fCAhd2VhdGhlck9iai5sb25naXR1ZGUpIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgY2l0eSAke2tleXdvcmRzfWApO1xyXG4gICAgY29uc3QgZnVsbFdlYXRoZXJSZXNwb25zZSA9IGF3YWl0IHdlYXRoZXJJbnRlcmZhY2UuZ2V0RnVsbFdlYXRoZXIoXHJcbiAgICAgIHdlYXRoZXJPYmoubGF0aXR1ZGUsIHdlYXRoZXJPYmoubG9uZ2l0dWRlLFxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhmdWxsV2VhdGhlclJlc3BvbnNlKTtcclxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJJbnRlcmZhY2UuZ2V0V2VhdGhlckljb24od2VhdGhlck9iai5pY29uSUQpKTtcclxuXHJcbiAgICBjb25zdCBmdWxsV2VhdGhlck9iaiA9IG1hcEZ1bGxXZWF0aGVyKGZ1bGxXZWF0aGVyUmVzcG9uc2UpO1xyXG4gICAgZnVsbFdlYXRoZXJPYmouY3VycmVudFdlYXRoZXIgPSB3ZWF0aGVyT2JqO1xyXG4gICAgY29uc29sZS5sb2coZnVsbFdlYXRoZXJPYmopO1xyXG5cclxuICAgIHJldHVybiBmdWxsV2VhdGhlck9iajtcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhkYXRlRm9ybWF0KHdlYXRoZXJPYmouZGF0ZSwgJ21tL2RkL3l5eXkgaGg6TU06c3MgVFQnKSk7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coa2VsdmluVG9GYWhyZW5oZWl0KGZ1bGxXZWF0aGVyT2JqLmN1cnJlbnRXZWF0aGVyLnRlbXBlcmF0dXJlS2VsdmluKS50b0ZpeGVkKCkpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHsgbWFwQ3VycmVudFdlYXRoZXIsIG1hcEZ1bGxXZWF0aGVyLCBnZXRXZWF0aGVyIH07XHJcbn0pKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0ICgoKSA9PiB7XHJcbiAgY29uc3QgQVBJX0tFWSA9ICcyYTQ1YzgyZmI1NjNhZjUyYzJiYTgxMGQ5ZDhkNTliOSc7XHJcbiAgY29uc3QgVVJMID0gJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNSc7XHJcbiAgY29uc3QgV0VBVEhFUl9UQUcgPSAnd2VhdGhlcic7XHJcbiAgY29uc3QgT05FX0NBTExfVEFHID0gJ29uZWNhbGwnO1xyXG5cclxuICBjb25zdCBJQ09OX1VSTCA9ICdodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJztcclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gZ2V0UmVzcG9uc2UodXJsLCBwYXJhbXMgPSB7IG1vZGU6ICdjb3JzJyB9KSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgcGFyYW1zKTtcclxuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5V29yZHNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxyXG4gICAgICovXHJcbiAgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFdlYXRoZXIoa2V5V29yZHMpIHtcclxuICAgIGNvbnN0IGFwaVVSTCA9IGAke1VSTH0vJHtXRUFUSEVSX1RBR30/cT0ke2tleVdvcmRzfSZhcHBpZD0ke0FQSV9LRVl9YDtcclxuICAgIHJldHVybiBnZXRSZXNwb25zZShhcGlVUkwpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gZ2V0RnVsbFdlYXRoZXIobGF0aXR1ZGUsIGxvbmdpdHVkZSkge1xyXG4gICAgY29uc3QgYXBpVVJMID0gYCR7VVJMfS8ke09ORV9DQUxMX1RBR30/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mYXBwaWQ9JHtBUElfS0VZfWA7XHJcbiAgICByZXR1cm4gZ2V0UmVzcG9uc2UoYXBpVVJMKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFdlYXRoZXJJY29uKGljb25JRCwgaWNvblNpemUgPSA0KSB7XHJcbiAgICBjb25zdCBhcGlVUkwgPSBgJHtJQ09OX1VSTH0ke2ljb25JRH1AJHtpY29uU2l6ZX14LnBuZ2A7XHJcbiAgICByZXR1cm4gYXBpVVJMO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHsgZ2V0Q3VycmVudFdlYXRoZXIsIGdldEZ1bGxXZWF0aGVyLCBnZXRXZWF0aGVySWNvbiB9O1xyXG59KSgpO1xyXG4iLCIvKipcclxuICogQ29udmVydHMgYSBVbml4IFVUQyBudW1iZXIgdG8gYSBEYXRlXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB1bml4Tm9cclxuICogQHJldHVybnMge0RhdGV9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdW5peFVUQ1RvRGF0ZSh1bml4Tm8pIHtcclxuICBpZiAoIXVuaXhObykgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKHVuaXhObyAqIDEwMDApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9QZXJjZW50KGRlY2ltYWwsIGZpeGVkUGVyY2VudCA9IHRydWUpIHtcclxuICBpZiAoIWRlY2ltYWwgfHwgTnVtYmVyLmlzTmFOKGRlY2ltYWwpKSByZXR1cm4gMDtcclxuICBjb25zdCBwZXJjZW50ID0gZGVjaW1hbCAqIDEwMDtcclxuICByZXR1cm4gZml4ZWRQZXJjZW50ID8gcGVyY2VudC50b0ZpeGVkKCkgOiBwZXJjZW50O1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBDZWxjaXVzIHRvIEZhaHJlbmhlaXRcclxuICpcclxuICogQHBhcmFtIGNlbGNpdXMgbnVtYmVyXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2Vsc2l1c1RvRmFocmVuaGVpdChjZWxzaXVzKSB7XHJcbiAgcmV0dXJuIChjZWxzaXVzICogOSkgLyA1ICsgMzI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IENlbHNpdXMgdG8gS2VsdmluXHJcbiAqXHJcbiAqIEBwYXJhbSBjZWxzaXVzIG51bWJlclxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjZWxzaXVzVG9LZWx2aW4oY2Vsc2l1cykge1xyXG4gIHJldHVybiBjZWxzaXVzICsgMjczLjE1O1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBGYWhyZW5oZWl0IHRvIENlbHNpdXNcclxuICpcclxuICogQHBhcmFtIGZhaHJlbmhlaXQgbnVtYmVyXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmFocmVuaGVpdFRvQ2Vsc2l1cyhmYWhyZW5oZWl0KSB7XHJcbiAgcmV0dXJuICgoZmFocmVuaGVpdCAtIDMyKSAqIDUpIC8gOTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgRmFocmVuaGVpdCB0byBLZWx2aW5cclxuICpcclxuICogQHBhcmFtIGZhaHJlbmhlaXQgbnVtYmVyXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmFocmVuaGVpdFRvS2VsdmluKGZhaHJlbmhlaXQpIHtcclxuICByZXR1cm4gKChmYWhyZW5oZWl0IC0gMzIpICogNSkgLyA5ICsgMjczLjE1O1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBLZWx2aW4gdG8gQ2Vsc2l1c1xyXG4gKlxyXG4gKiBAcGFyYW0ga2VsdmluIG51bWJlclxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGtlbHZpblRvQ2Vsc2l1cyhrZWx2aW4pIHtcclxuICByZXR1cm4ga2VsdmluIC0gMjczLjE1O1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBLZWx2aW4gdG8gRmFocmVuaGVpdFxyXG4gKlxyXG4gKiBAcGFyYW0ga2VsdmluIG51bWJlclxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGtlbHZpblRvRmFocmVuaGVpdChrZWx2aW4pIHtcclxuICByZXR1cm4gKChrZWx2aW4gLSAyNzMuMTUpICogOSkgLyA1ICsgMzI7XHJcbn1cclxuIiwiaW1wb3J0IHsga2VsdmluVG9DZWxzaXVzLCBrZWx2aW5Ub0ZhaHJlbmhlaXQgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYXRoZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5kYXRlID0gbnVsbDtcclxuICAgIHRoaXMubG9jYXRpb24gPSBudWxsO1xyXG4gICAgdGhpcy5uYW1lID0gbnVsbDtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBudWxsO1xyXG4gICAgdGhpcy5pY29uSUQgPSBudWxsO1xyXG4gICAgdGhpcy50ZW1wZXJhdHVyZUtlbHZpbiA9IG51bGw7XHJcbiAgICB0aGlzLmZlZWxzTGlrZUtlbHZpbiA9IG51bGw7XHJcbiAgICB0aGlzLmhpZ2hLZWx2aW4gPSBudWxsO1xyXG4gICAgdGhpcy5sb3dLZWx2aW4gPSBudWxsO1xyXG4gICAgdGhpcy5zdW5yaXNlID0gbnVsbDtcclxuICAgIHRoaXMuc3Vuc2V0ID0gbnVsbDtcclxuICAgIHRoaXMucmFpbkNoYW5jZSA9IG51bGw7XHJcbiAgICB0aGlzLmh1bWlkaXR5ID0gbnVsbDtcclxuICAgIHRoaXMud2luZFNwZWVkID0gbnVsbDtcclxuICAgIHRoaXMud2luZERlZyA9IG51bGw7XHJcbiAgICB0aGlzLnByZXNzdXJlID0gbnVsbDtcclxuICAgIHRoaXMudmlzaWJpbGl0eSA9IG51bGw7XHJcbiAgICB0aGlzLnV2SW5kZXggPSBudWxsO1xyXG4gICAgdGhpcy5sYXRpdHVkZSA9IG51bGw7XHJcbiAgICB0aGlzLmxvbmdpdHVkZSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xyXG4gIGdldFRlbXAoa2VsdmluLCB1bml0KSB7XHJcbiAgICBzd2l0Y2ggKHVuaXQpIHtcclxuICAgICAgY2FzZSB1bml0LnN0YXJ0c1dpdGgoJ0MnKTpcclxuICAgICAgICByZXR1cm4ga2VsdmluVG9DZWxzaXVzKGtlbHZpbik7XHJcbiAgICAgIGNhc2UgdW5pdC5zdGFydHNXaXRoKCdGJyk6XHJcbiAgICAgICAgcmV0dXJuIGtlbHZpblRvRmFocmVuaGVpdChrZWx2aW4pO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBrZWx2aW47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRUZW1wZXJhdHVyZSh1bml0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRUZW1wKHRoaXMudGVtcGVyYXR1cmVLZWx2aW4sIHVuaXQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGVtcGVyYXR1cmVDZWxjaXVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VGVtcCh0aGlzLnRlbXBlcmF0dXJlS2VsdmluLCAnQycpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGVtcGVyYXR1cmVGYWhyZW5oZWl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VGVtcCh0aGlzLnRlbXBlcmF0dXJlS2VsdmluLCAnRicpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmVlbHNMaWtlKHVuaXQpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFRlbXAodGhpcy5mZWVsc0xpa2VLZWx2aW4sIHVuaXQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmVlbHNMaWtlQ2VsY2l1cygpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFRlbXAodGhpcy5mZWVsc0xpa2VLZWx2aW4sICdDJyk7XHJcbiAgfVxyXG5cclxuICBnZXRGZWVsc0xpa2VGYWhyZW5oZWl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VGVtcCh0aGlzLmZlZWxzTGlrZUtlbHZpbiwgJ0YnKTtcclxuICB9XHJcblxyXG4gIGdldEhpZ2godW5pdCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VGVtcCh0aGlzLmhpZ2hLZWx2aW4sIHVuaXQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SGlnaENlbGNpdXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRUZW1wKHRoaXMuaGlnaEtlbHZpbiwgJ0MnKTtcclxuICB9XHJcblxyXG4gIGdldEhpZ2hGYWhyZW5oZWl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VGVtcCh0aGlzLmhpZ2hLZWx2aW4sICdGJyk7XHJcbiAgfVxyXG5cclxuICBnZXRMb3codW5pdCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VGVtcCh0aGlzLmxvd0tlbHZpbiwgdW5pdCk7XHJcbiAgfVxyXG5cclxuICBnZXRMb3dDZWxjaXVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VGVtcCh0aGlzLmxvd0tlbHZpbiwgJ0MnKTtcclxuICB9XHJcblxyXG4gIGdldExvd0ZhaHJlbmhlaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRUZW1wKHRoaXMubG93S2VsdmluLCAnRicpO1xyXG4gIH1cclxufVxyXG4iLCJ2YXIgdG9rZW49L2R7MSw0fXxEezMsNH18bXsxLDR9fHl5KD86eXkpP3woW0hoTXNUdF0pXFwxP3xXezEsMn18W0xsb3BTWk5dfFwiW15cIl0qXCJ8J1teJ10qJy9nO3ZhciB0aW1lem9uZT0vXFxiKD86W0EtWl17MSwzfVtBLVpdW1RDXSkoPzpbLStdXFxkezR9KT98KCg/OkF1c3RyYWxpYW4gKT8oPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZSlcXGIvZzt2YXIgdGltZXpvbmVDbGlwPS9bXi0rXFxkQS1aXS9nO2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRhdGVGb3JtYXQoZGF0ZSxtYXNrLHV0YyxnbXQpe2lmKGFyZ3VtZW50cy5sZW5ndGg9PT0xJiZ0eXBlb2YgZGF0ZT09PVwic3RyaW5nXCImJiEvXFxkLy50ZXN0KGRhdGUpKXttYXNrPWRhdGU7ZGF0ZT11bmRlZmluZWR9ZGF0ZT1kYXRlfHxkYXRlPT09MD9kYXRlOm5ldyBEYXRlO2lmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKXtkYXRlPW5ldyBEYXRlKGRhdGUpfWlmKGlzTmFOKGRhdGUpKXt0aHJvdyBUeXBlRXJyb3IoXCJJbnZhbGlkIGRhdGVcIil9bWFzaz1TdHJpbmcobWFza3NbbWFza118fG1hc2t8fG1hc2tzW1wiZGVmYXVsdFwiXSk7dmFyIG1hc2tTbGljZT1tYXNrLnNsaWNlKDAsNCk7aWYobWFza1NsaWNlPT09XCJVVEM6XCJ8fG1hc2tTbGljZT09PVwiR01UOlwiKXttYXNrPW1hc2suc2xpY2UoNCk7dXRjPXRydWU7aWYobWFza1NsaWNlPT09XCJHTVQ6XCIpe2dtdD10cnVlfX12YXIgXz1mdW5jdGlvbiBfKCl7cmV0dXJuIHV0Yz9cImdldFVUQ1wiOlwiZ2V0XCJ9O3ZhciBfZD1mdW5jdGlvbiBkKCl7cmV0dXJuIGRhdGVbXygpK1wiRGF0ZVwiXSgpfTt2YXIgRD1mdW5jdGlvbiBEKCl7cmV0dXJuIGRhdGVbXygpK1wiRGF5XCJdKCl9O3ZhciBfbT1mdW5jdGlvbiBtKCl7cmV0dXJuIGRhdGVbXygpK1wiTW9udGhcIl0oKX07dmFyIHk9ZnVuY3Rpb24geSgpe3JldHVybiBkYXRlW18oKStcIkZ1bGxZZWFyXCJdKCl9O3ZhciBfSD1mdW5jdGlvbiBIKCl7cmV0dXJuIGRhdGVbXygpK1wiSG91cnNcIl0oKX07dmFyIF9NPWZ1bmN0aW9uIE0oKXtyZXR1cm4gZGF0ZVtfKCkrXCJNaW51dGVzXCJdKCl9O3ZhciBfcz1mdW5jdGlvbiBzKCl7cmV0dXJuIGRhdGVbXygpK1wiU2Vjb25kc1wiXSgpfTt2YXIgX0w9ZnVuY3Rpb24gTCgpe3JldHVybiBkYXRlW18oKStcIk1pbGxpc2Vjb25kc1wiXSgpfTt2YXIgX289ZnVuY3Rpb24gbygpe3JldHVybiB1dGM/MDpkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCl9O3ZhciBfVz1mdW5jdGlvbiBXKCl7cmV0dXJuIGdldFdlZWsoZGF0ZSl9O3ZhciBfTj1mdW5jdGlvbiBOKCl7cmV0dXJuIGdldERheU9mV2VlayhkYXRlKX07dmFyIGZsYWdzPXtkOmZ1bmN0aW9uIGQoKXtyZXR1cm4gX2QoKX0sZGQ6ZnVuY3Rpb24gZGQoKXtyZXR1cm4gcGFkKF9kKCkpfSxkZGQ6ZnVuY3Rpb24gZGRkKCl7cmV0dXJuIGkxOG4uZGF5TmFtZXNbRCgpXX0sREREOmZ1bmN0aW9uIERERCgpe3JldHVybiBnZXREYXlOYW1lKHt5OnkoKSxtOl9tKCksZDpfZCgpLF86XygpLGRheU5hbWU6aTE4bi5kYXlOYW1lc1tEKCldLHNob3J0OnRydWV9KX0sZGRkZDpmdW5jdGlvbiBkZGRkKCl7cmV0dXJuIGkxOG4uZGF5TmFtZXNbRCgpKzddfSxEREREOmZ1bmN0aW9uIEREREQoKXtyZXR1cm4gZ2V0RGF5TmFtZSh7eTp5KCksbTpfbSgpLGQ6X2QoKSxfOl8oKSxkYXlOYW1lOmkxOG4uZGF5TmFtZXNbRCgpKzddfSl9LG06ZnVuY3Rpb24gbSgpe3JldHVybiBfbSgpKzF9LG1tOmZ1bmN0aW9uIG1tKCl7cmV0dXJuIHBhZChfbSgpKzEpfSxtbW06ZnVuY3Rpb24gbW1tKCl7cmV0dXJuIGkxOG4ubW9udGhOYW1lc1tfbSgpXX0sbW1tbTpmdW5jdGlvbiBtbW1tKCl7cmV0dXJuIGkxOG4ubW9udGhOYW1lc1tfbSgpKzEyXX0seXk6ZnVuY3Rpb24geXkoKXtyZXR1cm4gU3RyaW5nKHkoKSkuc2xpY2UoMil9LHl5eXk6ZnVuY3Rpb24geXl5eSgpe3JldHVybiBwYWQoeSgpLDQpfSxoOmZ1bmN0aW9uIGgoKXtyZXR1cm4gX0goKSUxMnx8MTJ9LGhoOmZ1bmN0aW9uIGhoKCl7cmV0dXJuIHBhZChfSCgpJTEyfHwxMil9LEg6ZnVuY3Rpb24gSCgpe3JldHVybiBfSCgpfSxISDpmdW5jdGlvbiBISCgpe3JldHVybiBwYWQoX0goKSl9LE06ZnVuY3Rpb24gTSgpe3JldHVybiBfTSgpfSxNTTpmdW5jdGlvbiBNTSgpe3JldHVybiBwYWQoX00oKSl9LHM6ZnVuY3Rpb24gcygpe3JldHVybiBfcygpfSxzczpmdW5jdGlvbiBzcygpe3JldHVybiBwYWQoX3MoKSl9LGw6ZnVuY3Rpb24gbCgpe3JldHVybiBwYWQoX0woKSwzKX0sTDpmdW5jdGlvbiBMKCl7cmV0dXJuIHBhZChNYXRoLmZsb29yKF9MKCkvMTApKX0sdDpmdW5jdGlvbiB0KCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbMF06aTE4bi50aW1lTmFtZXNbMV19LHR0OmZ1bmN0aW9uIHR0KCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbMl06aTE4bi50aW1lTmFtZXNbM119LFQ6ZnVuY3Rpb24gVCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzRdOmkxOG4udGltZU5hbWVzWzVdfSxUVDpmdW5jdGlvbiBUVCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzZdOmkxOG4udGltZU5hbWVzWzddfSxaOmZ1bmN0aW9uIFooKXtyZXR1cm4gZ210P1wiR01UXCI6dXRjP1wiVVRDXCI6Zm9ybWF0VGltZXpvbmUoZGF0ZSl9LG86ZnVuY3Rpb24gbygpe3JldHVybihfbygpPjA/XCItXCI6XCIrXCIpK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpLzYwKSoxMDArTWF0aC5hYnMoX28oKSklNjAsNCl9LHA6ZnVuY3Rpb24gcCgpe3JldHVybihfbygpPjA/XCItXCI6XCIrXCIpK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpLzYwKSwyKStcIjpcIitwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKSU2MCksMil9LFM6ZnVuY3Rpb24gUygpe3JldHVybltcInRoXCIsXCJzdFwiLFwibmRcIixcInJkXCJdW19kKCklMTA+Mz8wOihfZCgpJTEwMC1fZCgpJTEwIT0xMCkqX2QoKSUxMF19LFc6ZnVuY3Rpb24gVygpe3JldHVybiBfVygpfSxXVzpmdW5jdGlvbiBXVygpe3JldHVybiBwYWQoX1coKSl9LE46ZnVuY3Rpb24gTigpe3JldHVybiBfTigpfX07cmV0dXJuIG1hc2sucmVwbGFjZSh0b2tlbixmdW5jdGlvbihtYXRjaCl7aWYobWF0Y2ggaW4gZmxhZ3Mpe3JldHVybiBmbGFnc1ttYXRjaF0oKX1yZXR1cm4gbWF0Y2guc2xpY2UoMSxtYXRjaC5sZW5ndGgtMSl9KX1leHBvcnQgdmFyIG1hc2tzPXtkZWZhdWx0OlwiZGRkIG1tbSBkZCB5eXl5IEhIOk1NOnNzXCIsc2hvcnREYXRlOlwibS9kL3l5XCIscGFkZGVkU2hvcnREYXRlOlwibW0vZGQveXl5eVwiLG1lZGl1bURhdGU6XCJtbW0gZCwgeXl5eVwiLGxvbmdEYXRlOlwibW1tbSBkLCB5eXl5XCIsZnVsbERhdGU6XCJkZGRkLCBtbW1tIGQsIHl5eXlcIixzaG9ydFRpbWU6XCJoOk1NIFRUXCIsbWVkaXVtVGltZTpcImg6TU06c3MgVFRcIixsb25nVGltZTpcImg6TU06c3MgVFQgWlwiLGlzb0RhdGU6XCJ5eXl5LW1tLWRkXCIsaXNvVGltZTpcIkhIOk1NOnNzXCIsaXNvRGF0ZVRpbWU6XCJ5eXl5LW1tLWRkJ1QnSEg6TU06c3NvXCIsaXNvVXRjRGF0ZVRpbWU6XCJVVEM6eXl5eS1tbS1kZCdUJ0hIOk1NOnNzJ1onXCIsZXhwaXJlc0hlYWRlckZvcm1hdDpcImRkZCwgZGQgbW1tIHl5eXkgSEg6TU06c3MgWlwifTtleHBvcnQgdmFyIGkxOG49e2RheU5hbWVzOltcIlN1blwiLFwiTW9uXCIsXCJUdWVcIixcIldlZFwiLFwiVGh1XCIsXCJGcmlcIixcIlNhdFwiLFwiU3VuZGF5XCIsXCJNb25kYXlcIixcIlR1ZXNkYXlcIixcIldlZG5lc2RheVwiLFwiVGh1cnNkYXlcIixcIkZyaWRheVwiLFwiU2F0dXJkYXlcIl0sbW9udGhOYW1lczpbXCJKYW5cIixcIkZlYlwiLFwiTWFyXCIsXCJBcHJcIixcIk1heVwiLFwiSnVuXCIsXCJKdWxcIixcIkF1Z1wiLFwiU2VwXCIsXCJPY3RcIixcIk5vdlwiLFwiRGVjXCIsXCJKYW51YXJ5XCIsXCJGZWJydWFyeVwiLFwiTWFyY2hcIixcIkFwcmlsXCIsXCJNYXlcIixcIkp1bmVcIixcIkp1bHlcIixcIkF1Z3VzdFwiLFwiU2VwdGVtYmVyXCIsXCJPY3RvYmVyXCIsXCJOb3ZlbWJlclwiLFwiRGVjZW1iZXJcIl0sdGltZU5hbWVzOltcImFcIixcInBcIixcImFtXCIsXCJwbVwiLFwiQVwiLFwiUFwiLFwiQU1cIixcIlBNXCJdfTt2YXIgcGFkPWZ1bmN0aW9uIHBhZCh2YWwpe3ZhciBsZW49YXJndW1lbnRzLmxlbmd0aD4xJiZhcmd1bWVudHNbMV0hPT11bmRlZmluZWQ/YXJndW1lbnRzWzFdOjI7cmV0dXJuIFN0cmluZyh2YWwpLnBhZFN0YXJ0KGxlbixcIjBcIil9O3ZhciBnZXREYXlOYW1lPWZ1bmN0aW9uIGdldERheU5hbWUoX3JlZil7dmFyIHk9X3JlZi55LG09X3JlZi5tLGQ9X3JlZi5kLF89X3JlZi5fLGRheU5hbWU9X3JlZi5kYXlOYW1lLF9yZWYkc2hvcnQ9X3JlZltcInNob3J0XCJdLF9zaG9ydD1fcmVmJHNob3J0PT09dm9pZCAwP2ZhbHNlOl9yZWYkc2hvcnQ7dmFyIHRvZGF5PW5ldyBEYXRlO3ZhciB5ZXN0ZXJkYXk9bmV3IERhdGU7eWVzdGVyZGF5LnNldERhdGUoeWVzdGVyZGF5W18rXCJEYXRlXCJdKCktMSk7dmFyIHRvbW9ycm93PW5ldyBEYXRlO3RvbW9ycm93LnNldERhdGUodG9tb3Jyb3dbXytcIkRhdGVcIl0oKSsxKTt2YXIgdG9kYXlfZD1mdW5jdGlvbiB0b2RheV9kKCl7cmV0dXJuIHRvZGF5W18rXCJEYXRlXCJdKCl9O3ZhciB0b2RheV9tPWZ1bmN0aW9uIHRvZGF5X20oKXtyZXR1cm4gdG9kYXlbXytcIk1vbnRoXCJdKCl9O3ZhciB0b2RheV95PWZ1bmN0aW9uIHRvZGF5X3koKXtyZXR1cm4gdG9kYXlbXytcIkZ1bGxZZWFyXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfZD1mdW5jdGlvbiB5ZXN0ZXJkYXlfZCgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIkRhdGVcIl0oKX07dmFyIHllc3RlcmRheV9tPWZ1bmN0aW9uIHllc3RlcmRheV9tKCl7cmV0dXJuIHllc3RlcmRheVtfK1wiTW9udGhcIl0oKX07dmFyIHllc3RlcmRheV95PWZ1bmN0aW9uIHllc3RlcmRheV95KCl7cmV0dXJuIHllc3RlcmRheVtfK1wiRnVsbFllYXJcIl0oKX07dmFyIHRvbW9ycm93X2Q9ZnVuY3Rpb24gdG9tb3Jyb3dfZCgpe3JldHVybiB0b21vcnJvd1tfK1wiRGF0ZVwiXSgpfTt2YXIgdG9tb3Jyb3dfbT1mdW5jdGlvbiB0b21vcnJvd19tKCl7cmV0dXJuIHRvbW9ycm93W18rXCJNb250aFwiXSgpfTt2YXIgdG9tb3Jyb3dfeT1mdW5jdGlvbiB0b21vcnJvd195KCl7cmV0dXJuIHRvbW9ycm93W18rXCJGdWxsWWVhclwiXSgpfTtpZih0b2RheV95KCk9PT15JiZ0b2RheV9tKCk9PT1tJiZ0b2RheV9kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVGR5XCI6XCJUb2RheVwifWVsc2UgaWYoeWVzdGVyZGF5X3koKT09PXkmJnllc3RlcmRheV9tKCk9PT1tJiZ5ZXN0ZXJkYXlfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIllzZFwiOlwiWWVzdGVyZGF5XCJ9ZWxzZSBpZih0b21vcnJvd195KCk9PT15JiZ0b21vcnJvd19tKCk9PT1tJiZ0b21vcnJvd19kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVG13XCI6XCJUb21vcnJvd1wifXJldHVybiBkYXlOYW1lfTt2YXIgZ2V0V2Vlaz1mdW5jdGlvbiBnZXRXZWVrKGRhdGUpe3ZhciB0YXJnZXRUaHVyc2RheT1uZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksZGF0ZS5nZXRNb250aCgpLGRhdGUuZ2V0RGF0ZSgpKTt0YXJnZXRUaHVyc2RheS5zZXREYXRlKHRhcmdldFRodXJzZGF5LmdldERhdGUoKS0odGFyZ2V0VGh1cnNkYXkuZ2V0RGF5KCkrNiklNyszKTt2YXIgZmlyc3RUaHVyc2RheT1uZXcgRGF0ZSh0YXJnZXRUaHVyc2RheS5nZXRGdWxsWWVhcigpLDAsNCk7Zmlyc3RUaHVyc2RheS5zZXREYXRlKGZpcnN0VGh1cnNkYXkuZ2V0RGF0ZSgpLShmaXJzdFRodXJzZGF5LmdldERheSgpKzYpJTcrMyk7dmFyIGRzPXRhcmdldFRodXJzZGF5LmdldFRpbWV6b25lT2Zmc2V0KCktZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpO3RhcmdldFRodXJzZGF5LnNldEhvdXJzKHRhcmdldFRodXJzZGF5LmdldEhvdXJzKCktZHMpO3ZhciB3ZWVrRGlmZj0odGFyZ2V0VGh1cnNkYXktZmlyc3RUaHVyc2RheSkvKDg2NGU1KjcpO3JldHVybiAxK01hdGguZmxvb3Iod2Vla0RpZmYpfTt2YXIgZ2V0RGF5T2ZXZWVrPWZ1bmN0aW9uIGdldERheU9mV2VlayhkYXRlKXt2YXIgZG93PWRhdGUuZ2V0RGF5KCk7aWYoZG93PT09MCl7ZG93PTd9cmV0dXJuIGRvd307ZXhwb3J0IHZhciBmb3JtYXRUaW1lem9uZT1mdW5jdGlvbiBmb3JtYXRUaW1lem9uZShkYXRlKXtyZXR1cm4oU3RyaW5nKGRhdGUpLm1hdGNoKHRpbWV6b25lKXx8W1wiXCJdKS5wb3AoKS5yZXBsYWNlKHRpbWV6b25lQ2xpcCxcIlwiKS5yZXBsYWNlKC9HTVRcXCswMDAwL2csXCJVVENcIil9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xyXG5pbXBvcnQgZGF0ZUZvcm1hdCBmcm9tICdkYXRlZm9ybWF0JztcclxuaW1wb3J0IHdlYXRoZXJJbnRlcmZhY2UgZnJvbSAnLi9tb2R1bGVzL29wZW5XZWF0aGVyTWFwSW50ZXJmYWNlJztcclxuaW1wb3J0IHdlYXRoZXJDb250cm9sbGVyIGZyb20gJy4vbW9kdWxlcy9vcGVuV2VhdGhlck1hcENvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBrZWx2aW5Ub0ZhaHJlbmhlaXQgfSBmcm9tICcuL21vZHVsZXMvdXRpbHMnO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gdGVzdCgpIHtcclxuICBjb25zdCBjaXR5ID0gJ2NhcnJvbGx0b24sZ2EnO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB3ZWF0aGVyT2JqID0gYXdhaXQgd2VhdGhlckNvbnRyb2xsZXIuZ2V0V2VhdGhlcihjaXR5KTtcclxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJPYmopO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgRXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgfVxyXG59XHJcblxyXG50ZXN0KCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==