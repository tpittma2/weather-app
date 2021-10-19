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
    senderName;
    event;
    startDate;
    endDate;
    description;
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
/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather */ "./src/modules/weather.js");
/* harmony import */ var _alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alert */ "./src/modules/alert.js");



class FullWeather {
    currentWeather;
    hourlyWeather = [];
    dailyWeather = [];
}

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
    
    /**
     * 
     * @param {string} keyWords 
     * @returns {Promise} 
     */
    async function getCurrentWeather(keyWords) {
        const apiURL = `${URL}/${WEATHER_TAG}?q=${keyWords}&appid=${API_KEY}`;
        return await getResponse(apiURL);
    }
    
    async function getFullWeather(latitude, longitude) {
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
    return {getCurrentWeather, getFullWeather, getWeatherIcon}
})());





/***/ }),

/***/ "./src/modules/openWeatherMapMapper.js":
/*!*********************************************!*\
  !*** ./src/modules/openWeatherMapMapper.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather */ "./src/modules/weather.js");
/* harmony import */ var _full_weather__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./full-weather */ "./src/modules/full-weather.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/modules/utils.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {


    function mapFullWeather(openWeatherMapObj) {
        const weatherObj = new _full_weather__WEBPACK_IMPORTED_MODULE_1__["default"]();
        weatherObj.latitude = openWeatherMapObj.lat;
        weatherObj.longitude = openWeatherMapObj.lon;

        //current weather
        weatherObj.currentWeather = new _weather__WEBPACK_IMPORTED_MODULE_0__["default"]();
        mapWeatherObj(weatherObj.currentWeather, openWeatherMapObj.current);     
        

        //hourly weather
        openWeatherMapObj.hourly.forEach(hourlyOWMObj => {
            let hourlyWeatherObj = new _weather__WEBPACK_IMPORTED_MODULE_0__["default"]();
            weatherObj.hourlyWeather.push(hourlyWeatherObj);
            mapWeatherObj(hourlyWeatherObj, hourlyOWMObj);
        });

        //daily weather
        openWeatherMapObj.daily.forEach(owmObj => {
            let dailyWeatherObj = new _weather__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
    }
     

    function mapCurrentWeather(openWeatherMapObj) {
        const weatherObj = new _weather__WEBPACK_IMPORTED_MODULE_0__["default"]();
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

        weatherObj.date = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.unixUTCToDate)(openWeatherMapObj.dt);

        weatherObj.sunrise = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.unixUTCToDate)(openWeatherMapObj.sys.sunrise);
        weatherObj.sunset = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.unixUTCToDate)(openWeatherMapObj.sys.sunset);

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
    if (!unixNo)
        return null;
    return new Date(unixNo * 1000);
}

function toPercent(decimal, fixedPercent = true) {
    if(!decimal || isNaN(decimal)) return 0;
    let percent = decimal*100;
    return fixedPercent ? percent.toFixed() : percent;
}

/** 
 * Convert Celcius to Fahrenheit
 * 
 * @param celcius number
 * @returns {number}
 */
 function celsiusToFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
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
    return (fahrenheit - 32) * 5 / 9;
}

/**
 * Convert Fahrenheit to Kelvin
 *
 * @param fahrenheit number
 * @returns {number}
 */
 function fahrenheitToKelvin(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9 + 273.15;
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
    return (kelvin - 273.15) * 9 / 5 + 32;
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
    date;
    location;
    name;
    description;
    iconID;
    temperatureKelvin;
    feelsLikeKelvin;
    highKelvin;
    lowKelvin;
    sunrise;
    sunset;
    rainChance;
    humidity;
    windSpeed;
    windDeg;
    pressure; 
    visibility;
    uvIndex;
    latitude;
    longitude;

    #getTemp(kelvin, unit) {
        switch(unit) {
            case unit.startsWith('C'):
                return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.kelvinToCelsius)(kelvin);
            case unit.startsWith('F'):
                return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.kelvinToFahrenheit)(kelvin);
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
/* harmony import */ var _modules_openWeatherMapInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/openWeatherMapInterface */ "./src/modules/openWeatherMapInterface.js");
/* harmony import */ var _modules_openWeatherMapMapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/openWeatherMapMapper */ "./src/modules/openWeatherMapMapper.js");
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");




async function test() {

   try{
        let currentWeatherResponse = _modules_openWeatherMapInterface__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrentWeather('carrollton,ga,us');
    let fullWeatherResponse = _modules_openWeatherMapInterface__WEBPACK_IMPORTED_MODULE_0__["default"].getFullWeather(33.7212,-85.1455);

    let responses = await Promise.all([currentWeatherResponse, fullWeatherResponse]);
    console.log(responses[0]);
    console.log(responses[1]);
    console.log(_modules_openWeatherMapInterface__WEBPACK_IMPORTED_MODULE_0__["default"].getWeatherIcon('03d'));

    const weatherObj = _modules_openWeatherMapMapper__WEBPACK_IMPORTED_MODULE_1__["default"].mapCurrentWeather(responses[0]);
    console.log(weatherObj);

    const fullWeatherObj = _modules_openWeatherMapMapper__WEBPACK_IMPORTED_MODULE_1__["default"].mapFullWeather(responses[1]);
    console.log(fullWeatherObj);

    console.log((0,dateformat__WEBPACK_IMPORTED_MODULE_2__["default"])(weatherObj.date, 'mm/dd/yyyy hh:MM:ss TT'));
   }
   catch(error) {
       console.log('Error: ' + error);
   }

}

test();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05pRTtBQUNOO0FBQ1o7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsMEZBQWtDO0FBQ3ZFLDhCQUE4Qix1RkFBK0I7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdUZBQStCO0FBQy9DO0FBQ0EsdUJBQXVCLHVGQUErQjtBQUN0RDtBQUNBO0FBQ0EsMkJBQTJCLG9GQUE0QjtBQUN2RDtBQUNBO0FBQ0EsZ0JBQWdCLHNEQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvYWxlcnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9mdWxsLXdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9vcGVuV2VhdGhlck1hcEludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL29wZW5XZWF0aGVyTWFwTWFwcGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy93ZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGVmb3JtYXQvbGliL2RhdGVmb3JtYXQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydCB7XHJcbiAgICBzZW5kZXJOYW1lO1xyXG4gICAgZXZlbnQ7XHJcbiAgICBzdGFydERhdGU7XHJcbiAgICBlbmREYXRlO1xyXG4gICAgZGVzY3JpcHRpb247XHJcbn0iLCJpbXBvcnQgV2VhdGhlciBmcm9tICcuL3dlYXRoZXInO1xyXG5pbXBvcnQgQWxlcnQgZnJvbSAnLi9hbGVydCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGdWxsV2VhdGhlciB7XHJcbiAgICBjdXJyZW50V2VhdGhlcjtcclxuICAgIGhvdXJseVdlYXRoZXIgPSBbXTtcclxuICAgIGRhaWx5V2VhdGhlciA9IFtdO1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgKCgpID0+IHtcclxuICAgICAgICBjb25zdCBBUElfS0VZID0gJzJhNDVjODJmYjU2M2FmNTJjMmJhODEwZDlkOGQ1OWI5JztcclxuICAgIGNvbnN0IFVSTCA9ICdodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUnO1xyXG4gICAgY29uc3QgV0VBVEhFUl9UQUcgPSAnd2VhdGhlcic7XHJcbiAgICBjb25zdCBPTkVfQ0FMTF9UQUcgPSAnb25lY2FsbCc7XHJcblxyXG4gICAgY29uc3QgSUNPTl9VUkwgPSAnaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyc7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5V29yZHMgXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRXZWF0aGVyKGtleVdvcmRzKSB7XHJcbiAgICAgICAgY29uc3QgYXBpVVJMID0gYCR7VVJMfS8ke1dFQVRIRVJfVEFHfT9xPSR7a2V5V29yZHN9JmFwcGlkPSR7QVBJX0tFWX1gO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBnZXRSZXNwb25zZShhcGlVUkwpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRGdWxsV2VhdGhlcihsYXRpdHVkZSwgbG9uZ2l0dWRlKSB7XHJcbiAgICAgICAgY29uc3QgYXBpVVJMID0gYCR7VVJMfS8ke09ORV9DQUxMX1RBR30/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mYXBwaWQ9JHtBUElfS0VZfWA7XHJcbiAgICAgICAgcmV0dXJuIGdldFJlc3BvbnNlKGFwaVVSTCk7XHJcbiAgICB9XHJcbiAgICAgICBcclxuICAgIGZ1bmN0aW9uIGdldFdlYXRoZXJJY29uKGljb25JRCwgaWNvblNpemUgPSA0KSB7XHJcbiAgICAgICAgY29uc3QgYXBpVVJMID0gYCR7SUNPTl9VUkx9JHtpY29uSUR9QCR7aWNvblNpemV9eC5wbmdgO1xyXG4gICAgICAgIHJldHVybiBhcGlVUkw7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0UmVzcG9uc2UodXJsLCBwYXJhbXMgPSB7bW9kZTogJ2NvcnMnfSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBwYXJhbXMpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge2dldEN1cnJlbnRXZWF0aGVyLCBnZXRGdWxsV2VhdGhlciwgZ2V0V2VhdGhlckljb259XHJcbn0pKCk7XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBXZWF0aGVyIGZyb20gJy4vd2VhdGhlcic7XHJcbmltcG9ydCBGdWxsV2VhdGhlciBmcm9tICcuL2Z1bGwtd2VhdGhlcic7XHJcbmltcG9ydCB7IHVuaXhVVENUb0RhdGUsIHRvUGVyY2VudCB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCgpID0+IHtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gbWFwRnVsbFdlYXRoZXIob3BlbldlYXRoZXJNYXBPYmopIHtcclxuICAgICAgICBjb25zdCB3ZWF0aGVyT2JqID0gbmV3IEZ1bGxXZWF0aGVyKCk7XHJcbiAgICAgICAgd2VhdGhlck9iai5sYXRpdHVkZSA9IG9wZW5XZWF0aGVyTWFwT2JqLmxhdDtcclxuICAgICAgICB3ZWF0aGVyT2JqLmxvbmdpdHVkZSA9IG9wZW5XZWF0aGVyTWFwT2JqLmxvbjtcclxuXHJcbiAgICAgICAgLy9jdXJyZW50IHdlYXRoZXJcclxuICAgICAgICB3ZWF0aGVyT2JqLmN1cnJlbnRXZWF0aGVyID0gbmV3IFdlYXRoZXIoKTtcclxuICAgICAgICBtYXBXZWF0aGVyT2JqKHdlYXRoZXJPYmouY3VycmVudFdlYXRoZXIsIG9wZW5XZWF0aGVyTWFwT2JqLmN1cnJlbnQpOyAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vaG91cmx5IHdlYXRoZXJcclxuICAgICAgICBvcGVuV2VhdGhlck1hcE9iai5ob3VybHkuZm9yRWFjaChob3VybHlPV01PYmogPT4ge1xyXG4gICAgICAgICAgICBsZXQgaG91cmx5V2VhdGhlck9iaiA9IG5ldyBXZWF0aGVyKCk7XHJcbiAgICAgICAgICAgIHdlYXRoZXJPYmouaG91cmx5V2VhdGhlci5wdXNoKGhvdXJseVdlYXRoZXJPYmopO1xyXG4gICAgICAgICAgICBtYXBXZWF0aGVyT2JqKGhvdXJseVdlYXRoZXJPYmosIGhvdXJseU9XTU9iaik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vZGFpbHkgd2VhdGhlclxyXG4gICAgICAgIG9wZW5XZWF0aGVyTWFwT2JqLmRhaWx5LmZvckVhY2gob3dtT2JqID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhaWx5V2VhdGhlck9iaiA9IG5ldyBXZWF0aGVyKCk7XHJcbiAgICAgICAgICAgIHdlYXRoZXJPYmouZGFpbHlXZWF0aGVyLnB1c2goZGFpbHlXZWF0aGVyT2JqKTtcclxuICAgICAgICAgICAgbWFwV2VhdGhlck9iaihkYWlseVdlYXRoZXJPYmosIG93bU9iaik7XHJcbiAgICAgICAgICAgIGRhaWx5V2VhdGhlck9iai50ZW1wZXJhdHVyZUtlbHZpbiA9IG93bU9iai50ZW1wLmRheTtcclxuICAgICAgICAgICAgZGFpbHlXZWF0aGVyT2JqLmhpZ2hLZWx2aW4gPSBvd21PYmoudGVtcC5tYXg7XHJcbiAgICAgICAgICAgIGRhaWx5V2VhdGhlck9iai5sb3dLZWx2aW4gPSBvd21PYmoudGVtcC5taW47XHJcbiAgICAgICAgICAgIGRhaWx5V2VhdGhlck9iai5mZWVsc0xpa2VLZWx2aW4gPSBvd21PYmouZmVlbHNfbGlrZS5kYXk7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHdlYXRoZXJPYmo7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFwV2VhdGhlck9iaih3ZWF0aGVyT2JqLCBvcGVuV2VhdGhlck9iaikge1xyXG4gICAgICAgIHdlYXRoZXJPYmouZGF0ZSA9IHVuaXhVVENUb0RhdGUob3BlbldlYXRoZXJPYmouZHQpO1xyXG4gICAgICAgIHdlYXRoZXJPYmouc3VucmlzZSA9IHVuaXhVVENUb0RhdGUob3BlbldlYXRoZXJPYmouc3VucmlzZSk7XHJcbiAgICAgICAgd2VhdGhlck9iai5zdW5zZXQgPSB1bml4VVRDVG9EYXRlKG9wZW5XZWF0aGVyT2JqLnN1bnNldCk7XHJcbiAgICAgICAgd2VhdGhlck9iai50ZW1wZXJhdHVyZUtlbHZpbiA9IG9wZW5XZWF0aGVyT2JqLnRlbXA7XHJcbiAgICAgICAgd2VhdGhlck9iai5mZWVsc0xpa2VLZWx2aW4gPSBvcGVuV2VhdGhlck9iai5mZWVsc19saWtlO1xyXG4gICAgICAgIHdlYXRoZXJPYmoucHJlc3N1cmUgPSBvcGVuV2VhdGhlck9iai5wcmVzc3VyZTtcclxuICAgICAgICB3ZWF0aGVyT2JqLmh1bWlkaXR5ID0gb3BlbldlYXRoZXJPYmouaHVtaWRpdHk7XHJcbiAgICAgICAgd2VhdGhlck9iai52aXNpYmlsaXR5ID0gb3BlbldlYXRoZXJPYmoudmlzaWJpbGl0eTtcclxuICAgICAgICB3ZWF0aGVyT2JqLndpbmRTcGVlZCA9IG9wZW5XZWF0aGVyT2JqLndpbmRfc3BlZWQ7XHJcbiAgICAgICAgd2VhdGhlck9iai53aW5kRGVnID0gb3BlbldlYXRoZXJPYmoud2luZF9kZWc7XHJcbiAgICAgICAgbWFwV2VhdGhlckRlc2NyaXB0aW9uKHdlYXRoZXJPYmosIG9wZW5XZWF0aGVyT2JqKTtcclxuICAgICAgICB3ZWF0aGVyT2JqLnJhaW5DaGFuY2UgPSB0b1BlcmNlbnQob3BlbldlYXRoZXJPYmoucG9wKTsgICAgICAgXHJcbiAgICB9XHJcbiAgICAgXHJcblxyXG4gICAgZnVuY3Rpb24gbWFwQ3VycmVudFdlYXRoZXIob3BlbldlYXRoZXJNYXBPYmopIHtcclxuICAgICAgICBjb25zdCB3ZWF0aGVyT2JqID0gbmV3IFdlYXRoZXIoKTtcclxuICAgICAgICAvL2Nvb3Jkc1xyXG4gICAgICAgIHdlYXRoZXJPYmoubGF0aXR1ZGUgPSBvcGVuV2VhdGhlck1hcE9iai5jb29yZC5sYXQ7XHJcbiAgICAgICAgd2VhdGhlck9iai5sb25naXR1ZGUgPSBvcGVuV2VhdGhlck1hcE9iai5jb29yZC5sb247XHJcblxyXG4gICAgICAgIC8vd2VhdGhlclxyXG4gICAgICAgIG1hcFdlYXRoZXJEZXNjcmlwdGlvbih3ZWF0aGVyT2JqLCBvcGVuV2VhdGhlck1hcE9iaikgXHJcblxyXG4gICAgICAgIC8vbWFpblxyXG4gICAgICAgIHdlYXRoZXJPYmoudGVtcGVyYXR1cmVLZWx2aW4gPSBvcGVuV2VhdGhlck1hcE9iai5tYWluLnRlbXA7XHJcbiAgICAgICAgd2VhdGhlck9iai5mZWVsc0xpa2VLZWx2aW4gPSBvcGVuV2VhdGhlck1hcE9iai5tYWluLmZlZWxzX2xpa2U7XHJcbiAgICAgICAgd2VhdGhlck9iai5sb3dLZWx2aW4gPSBvcGVuV2VhdGhlck1hcE9iai5tYWluLnRlbXBfbWluO1xyXG4gICAgICAgIHdlYXRoZXJPYmouaGlnaEtlbHZpbiA9IG9wZW5XZWF0aGVyTWFwT2JqLm1haW4udGVtcF9tYXg7XHJcbiAgICAgICAgd2VhdGhlck9iai5wcmVzc3VyZSA9IG9wZW5XZWF0aGVyTWFwT2JqLm1haW4ucHJlc3N1cmU7XHJcbiAgICAgICAgd2VhdGhlck9iai5odW1pZGl0eSA9IG9wZW5XZWF0aGVyTWFwT2JqLm1haW4uaHVtaWRpdHk7XHJcblxyXG4gICAgICAgIHdlYXRoZXJPYmoudmlzaWJpbGl0eSA9IG9wZW5XZWF0aGVyTWFwT2JqLnZpc2liaWxpdHk7XHJcblxyXG4gICAgICAgIC8vd2luZFxyXG4gICAgICAgIHdlYXRoZXJPYmoud2luZFNwZWVkID0gb3BlbldlYXRoZXJNYXBPYmoud2luZC5zcGVlZDtcclxuXHJcbiAgICAgICAgd2VhdGhlck9iai5kYXRlID0gdW5peFVUQ1RvRGF0ZShvcGVuV2VhdGhlck1hcE9iai5kdCk7XHJcblxyXG4gICAgICAgIHdlYXRoZXJPYmouc3VucmlzZSA9IHVuaXhVVENUb0RhdGUob3BlbldlYXRoZXJNYXBPYmouc3lzLnN1bnJpc2UpO1xyXG4gICAgICAgIHdlYXRoZXJPYmouc3Vuc2V0ID0gdW5peFVUQ1RvRGF0ZShvcGVuV2VhdGhlck1hcE9iai5zeXMuc3Vuc2V0KTtcclxuXHJcbiAgICAgICAgd2VhdGhlck9iai5sb2NhdGlvbiA9IG9wZW5XZWF0aGVyTWFwT2JqLm5hbWU7XHJcblxyXG4gICAgICAgIHJldHVybiB3ZWF0aGVyT2JqO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gbWFwV2VhdGhlckRlc2NyaXB0aW9uKHdlYXRoZXJPYmosIG9wZW5XZWF0aGVyTWFwT2JqKSB7XHJcbiAgICAgICAgaWYgKG9wZW5XZWF0aGVyTWFwT2JqLndlYXRoZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB3ZWF0aGVyT2JqLm5hbWUgPSBvcGVuV2VhdGhlck1hcE9iai53ZWF0aGVyWzBdLm1haW47XHJcbiAgICAgICAgICAgIHdlYXRoZXJPYmouZGVzY3JpcHRpb24gPSBvcGVuV2VhdGhlck1hcE9iai53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICB3ZWF0aGVyT2JqLmljb25JRCA9IG9wZW5XZWF0aGVyTWFwT2JqLndlYXRoZXJbMF0uaWNvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgbWFwQ3VycmVudFdlYXRoZXIsIG1hcEZ1bGxXZWF0aGVyIH1cclxufSkoKTsiLCIvKipcclxuICogQ29udmVydHMgYSBVbml4IFVUQyBudW1iZXIgdG8gYSBEYXRlXHJcbiAqIFxyXG4gKiBAcGFyYW0ge251bWJlcn0gdW5peE5vIFxyXG4gKiBAcmV0dXJucyB7RGF0ZX1cclxuICovXHJcbiBleHBvcnQgZnVuY3Rpb24gdW5peFVUQ1RvRGF0ZSh1bml4Tm8pIHtcclxuICAgIGlmICghdW5peE5vKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHVuaXhObyAqIDEwMDApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9QZXJjZW50KGRlY2ltYWwsIGZpeGVkUGVyY2VudCA9IHRydWUpIHtcclxuICAgIGlmKCFkZWNpbWFsIHx8IGlzTmFOKGRlY2ltYWwpKSByZXR1cm4gMDtcclxuICAgIGxldCBwZXJjZW50ID0gZGVjaW1hbCoxMDA7XHJcbiAgICByZXR1cm4gZml4ZWRQZXJjZW50ID8gcGVyY2VudC50b0ZpeGVkKCkgOiBwZXJjZW50O1xyXG59XHJcblxyXG4vKiogXHJcbiAqIENvbnZlcnQgQ2VsY2l1cyB0byBGYWhyZW5oZWl0XHJcbiAqIFxyXG4gKiBAcGFyYW0gY2VsY2l1cyBudW1iZXJcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbiBleHBvcnQgZnVuY3Rpb24gY2Vsc2l1c1RvRmFocmVuaGVpdChjZWxzaXVzKSB7XHJcbiAgICByZXR1cm4gY2Vsc2l1cyAqIDkgLyA1ICsgMzI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IENlbHNpdXMgdG8gS2VsdmluXHJcbiAqXHJcbiAqIEBwYXJhbSBjZWxzaXVzIG51bWJlclxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbiBleHBvcnQgZnVuY3Rpb24gY2Vsc2l1c1RvS2VsdmluKGNlbHNpdXMpIHtcclxuICAgIHJldHVybiBjZWxzaXVzICsgMjczLjE1O1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBGYWhyZW5oZWl0IHRvIENlbHNpdXNcclxuICpcclxuICogQHBhcmFtIGZhaHJlbmhlaXQgbnVtYmVyXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG4gZXhwb3J0IGZ1bmN0aW9uIGZhaHJlbmhlaXRUb0NlbHNpdXMoZmFocmVuaGVpdCkge1xyXG4gICAgcmV0dXJuIChmYWhyZW5oZWl0IC0gMzIpICogNSAvIDk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IEZhaHJlbmhlaXQgdG8gS2VsdmluXHJcbiAqXHJcbiAqIEBwYXJhbSBmYWhyZW5oZWl0IG51bWJlclxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuIGV4cG9ydCBmdW5jdGlvbiBmYWhyZW5oZWl0VG9LZWx2aW4oZmFocmVuaGVpdCkge1xyXG4gICAgcmV0dXJuIChmYWhyZW5oZWl0IC0gMzIpICogNSAvIDkgKyAyNzMuMTU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IEtlbHZpbiB0byBDZWxzaXVzXHJcbiAqXHJcbiAqIEBwYXJhbSBrZWx2aW4gbnVtYmVyXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG4gZXhwb3J0IGZ1bmN0aW9uIGtlbHZpblRvQ2Vsc2l1cyhrZWx2aW4pIHtcclxuICAgIHJldHVybiBrZWx2aW4gLSAyNzMuMTU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IEtlbHZpbiB0byBGYWhyZW5oZWl0XHJcbiAqXHJcbiAqIEBwYXJhbSBrZWx2aW4gbnVtYmVyXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24ga2VsdmluVG9GYWhyZW5oZWl0KGtlbHZpbikge1xyXG4gICAgcmV0dXJuIChrZWx2aW4gLSAyNzMuMTUpICogOSAvIDUgKyAzMjtcclxufVxyXG5cclxuIiwiaW1wb3J0IHtrZWx2aW5Ub0NlbHNpdXMsIGtlbHZpblRvRmFocmVuaGVpdH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWF0aGVyIHtcclxuICAgIGRhdGU7XHJcbiAgICBsb2NhdGlvbjtcclxuICAgIG5hbWU7XHJcbiAgICBkZXNjcmlwdGlvbjtcclxuICAgIGljb25JRDtcclxuICAgIHRlbXBlcmF0dXJlS2VsdmluO1xyXG4gICAgZmVlbHNMaWtlS2VsdmluO1xyXG4gICAgaGlnaEtlbHZpbjtcclxuICAgIGxvd0tlbHZpbjtcclxuICAgIHN1bnJpc2U7XHJcbiAgICBzdW5zZXQ7XHJcbiAgICByYWluQ2hhbmNlO1xyXG4gICAgaHVtaWRpdHk7XHJcbiAgICB3aW5kU3BlZWQ7XHJcbiAgICB3aW5kRGVnO1xyXG4gICAgcHJlc3N1cmU7IFxyXG4gICAgdmlzaWJpbGl0eTtcclxuICAgIHV2SW5kZXg7XHJcbiAgICBsYXRpdHVkZTtcclxuICAgIGxvbmdpdHVkZTtcclxuXHJcbiAgICAjZ2V0VGVtcChrZWx2aW4sIHVuaXQpIHtcclxuICAgICAgICBzd2l0Y2godW5pdCkge1xyXG4gICAgICAgICAgICBjYXNlIHVuaXQuc3RhcnRzV2l0aCgnQycpOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtlbHZpblRvQ2Vsc2l1cyhrZWx2aW4pO1xyXG4gICAgICAgICAgICBjYXNlIHVuaXQuc3RhcnRzV2l0aCgnRicpOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtlbHZpblRvRmFocmVuaGVpdChrZWx2aW4pO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtlbHZpbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGVtcGVyYXR1cmUodW5pdCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNnZXRUZW1wKHRoaXMudGVtcGVyYXR1cmVLZWx2aW4sIHVuaXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRlbXBlcmF0dXJlQ2VsY2l1cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jZ2V0VGVtcCh0aGlzLnRlbXBlcmF0dXJlS2VsdmluLCAnQycpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRlbXBlcmF0dXJlRmFocmVuaGVpdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jZ2V0VGVtcCh0aGlzLnRlbXBlcmF0dXJlS2VsdmluLCAnRicpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZlZWxzTGlrZSh1bml0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2dldFRlbXAodGhpcy5mZWVsc0xpa2VLZWx2aW4sIHVuaXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZlZWxzTGlrZUNlbGNpdXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2dldFRlbXAodGhpcy5mZWVsc0xpa2VLZWx2aW4sICdDJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmVlbHNMaWtlRmFocmVuaGVpdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jZ2V0VGVtcCh0aGlzLmZlZWxzTGlrZUtlbHZpbiwgJ0YnKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIaWdoKHVuaXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jZ2V0VGVtcCh0aGlzLmhpZ2hLZWx2aW4sIHVuaXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhpZ2hDZWxjaXVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNnZXRUZW1wKHRoaXMuaGlnaEtlbHZpbiwgJ0MnKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIaWdoRmFocmVuaGVpdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jZ2V0VGVtcCh0aGlzLmhpZ2hLZWx2aW4sICdGJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TG93KHVuaXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jZ2V0VGVtcCh0aGlzLmxvd0tlbHZpbiwgdW5pdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TG93Q2VsY2l1cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jZ2V0VGVtcCh0aGlzLmxvd0tlbHZpbiwgJ0MnKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMb3dGYWhyZW5oZWl0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNnZXRUZW1wKHRoaXMubG93S2VsdmluLCAnRicpO1xyXG4gICAgfVxyXG59IiwidmFyIHRva2VuPS9kezEsNH18RHszLDR9fG17MSw0fXx5eSg/Onl5KT98KFtIaE1zVHRdKVxcMT98V3sxLDJ9fFtMbG9wU1pOXXxcIlteXCJdKlwifCdbXiddKicvZzt2YXIgdGltZXpvbmU9L1xcYig/OltBLVpdezEsM31bQS1aXVtUQ10pKD86Wy0rXVxcZHs0fSk/fCgoPzpBdXN0cmFsaWFuICk/KD86UGFjaWZpY3xNb3VudGFpbnxDZW50cmFsfEVhc3Rlcm58QXRsYW50aWMpICg/OlN0YW5kYXJkfERheWxpZ2h0fFByZXZhaWxpbmcpIFRpbWUpXFxiL2c7dmFyIHRpbWV6b25lQ2xpcD0vW14tK1xcZEEtWl0vZztleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkYXRlRm9ybWF0KGRhdGUsbWFzayx1dGMsZ210KXtpZihhcmd1bWVudHMubGVuZ3RoPT09MSYmdHlwZW9mIGRhdGU9PT1cInN0cmluZ1wiJiYhL1xcZC8udGVzdChkYXRlKSl7bWFzaz1kYXRlO2RhdGU9dW5kZWZpbmVkfWRhdGU9ZGF0ZXx8ZGF0ZT09PTA/ZGF0ZTpuZXcgRGF0ZTtpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSl7ZGF0ZT1uZXcgRGF0ZShkYXRlKX1pZihpc05hTihkYXRlKSl7dGhyb3cgVHlwZUVycm9yKFwiSW52YWxpZCBkYXRlXCIpfW1hc2s9U3RyaW5nKG1hc2tzW21hc2tdfHxtYXNrfHxtYXNrc1tcImRlZmF1bHRcIl0pO3ZhciBtYXNrU2xpY2U9bWFzay5zbGljZSgwLDQpO2lmKG1hc2tTbGljZT09PVwiVVRDOlwifHxtYXNrU2xpY2U9PT1cIkdNVDpcIil7bWFzaz1tYXNrLnNsaWNlKDQpO3V0Yz10cnVlO2lmKG1hc2tTbGljZT09PVwiR01UOlwiKXtnbXQ9dHJ1ZX19dmFyIF89ZnVuY3Rpb24gXygpe3JldHVybiB1dGM/XCJnZXRVVENcIjpcImdldFwifTt2YXIgX2Q9ZnVuY3Rpb24gZCgpe3JldHVybiBkYXRlW18oKStcIkRhdGVcIl0oKX07dmFyIEQ9ZnVuY3Rpb24gRCgpe3JldHVybiBkYXRlW18oKStcIkRheVwiXSgpfTt2YXIgX209ZnVuY3Rpb24gbSgpe3JldHVybiBkYXRlW18oKStcIk1vbnRoXCJdKCl9O3ZhciB5PWZ1bmN0aW9uIHkoKXtyZXR1cm4gZGF0ZVtfKCkrXCJGdWxsWWVhclwiXSgpfTt2YXIgX0g9ZnVuY3Rpb24gSCgpe3JldHVybiBkYXRlW18oKStcIkhvdXJzXCJdKCl9O3ZhciBfTT1mdW5jdGlvbiBNKCl7cmV0dXJuIGRhdGVbXygpK1wiTWludXRlc1wiXSgpfTt2YXIgX3M9ZnVuY3Rpb24gcygpe3JldHVybiBkYXRlW18oKStcIlNlY29uZHNcIl0oKX07dmFyIF9MPWZ1bmN0aW9uIEwoKXtyZXR1cm4gZGF0ZVtfKCkrXCJNaWxsaXNlY29uZHNcIl0oKX07dmFyIF9vPWZ1bmN0aW9uIG8oKXtyZXR1cm4gdXRjPzA6ZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpfTt2YXIgX1c9ZnVuY3Rpb24gVygpe3JldHVybiBnZXRXZWVrKGRhdGUpfTt2YXIgX049ZnVuY3Rpb24gTigpe3JldHVybiBnZXREYXlPZldlZWsoZGF0ZSl9O3ZhciBmbGFncz17ZDpmdW5jdGlvbiBkKCl7cmV0dXJuIF9kKCl9LGRkOmZ1bmN0aW9uIGRkKCl7cmV0dXJuIHBhZChfZCgpKX0sZGRkOmZ1bmN0aW9uIGRkZCgpe3JldHVybiBpMThuLmRheU5hbWVzW0QoKV19LERERDpmdW5jdGlvbiBEREQoKXtyZXR1cm4gZ2V0RGF5TmFtZSh7eTp5KCksbTpfbSgpLGQ6X2QoKSxfOl8oKSxkYXlOYW1lOmkxOG4uZGF5TmFtZXNbRCgpXSxzaG9ydDp0cnVlfSl9LGRkZGQ6ZnVuY3Rpb24gZGRkZCgpe3JldHVybiBpMThuLmRheU5hbWVzW0QoKSs3XX0sRERERDpmdW5jdGlvbiBEREREKCl7cmV0dXJuIGdldERheU5hbWUoe3k6eSgpLG06X20oKSxkOl9kKCksXzpfKCksZGF5TmFtZTppMThuLmRheU5hbWVzW0QoKSs3XX0pfSxtOmZ1bmN0aW9uIG0oKXtyZXR1cm4gX20oKSsxfSxtbTpmdW5jdGlvbiBtbSgpe3JldHVybiBwYWQoX20oKSsxKX0sbW1tOmZ1bmN0aW9uIG1tbSgpe3JldHVybiBpMThuLm1vbnRoTmFtZXNbX20oKV19LG1tbW06ZnVuY3Rpb24gbW1tbSgpe3JldHVybiBpMThuLm1vbnRoTmFtZXNbX20oKSsxMl19LHl5OmZ1bmN0aW9uIHl5KCl7cmV0dXJuIFN0cmluZyh5KCkpLnNsaWNlKDIpfSx5eXl5OmZ1bmN0aW9uIHl5eXkoKXtyZXR1cm4gcGFkKHkoKSw0KX0saDpmdW5jdGlvbiBoKCl7cmV0dXJuIF9IKCklMTJ8fDEyfSxoaDpmdW5jdGlvbiBoaCgpe3JldHVybiBwYWQoX0goKSUxMnx8MTIpfSxIOmZ1bmN0aW9uIEgoKXtyZXR1cm4gX0goKX0sSEg6ZnVuY3Rpb24gSEgoKXtyZXR1cm4gcGFkKF9IKCkpfSxNOmZ1bmN0aW9uIE0oKXtyZXR1cm4gX00oKX0sTU06ZnVuY3Rpb24gTU0oKXtyZXR1cm4gcGFkKF9NKCkpfSxzOmZ1bmN0aW9uIHMoKXtyZXR1cm4gX3MoKX0sc3M6ZnVuY3Rpb24gc3MoKXtyZXR1cm4gcGFkKF9zKCkpfSxsOmZ1bmN0aW9uIGwoKXtyZXR1cm4gcGFkKF9MKCksMyl9LEw6ZnVuY3Rpb24gTCgpe3JldHVybiBwYWQoTWF0aC5mbG9vcihfTCgpLzEwKSl9LHQ6ZnVuY3Rpb24gdCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzBdOmkxOG4udGltZU5hbWVzWzFdfSx0dDpmdW5jdGlvbiB0dCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzJdOmkxOG4udGltZU5hbWVzWzNdfSxUOmZ1bmN0aW9uIFQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1s0XTppMThuLnRpbWVOYW1lc1s1XX0sVFQ6ZnVuY3Rpb24gVFQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1s2XTppMThuLnRpbWVOYW1lc1s3XX0sWjpmdW5jdGlvbiBaKCl7cmV0dXJuIGdtdD9cIkdNVFwiOnV0Yz9cIlVUQ1wiOmZvcm1hdFRpbWV6b25lKGRhdGUpfSxvOmZ1bmN0aW9uIG8oKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCkqMTAwK01hdGguYWJzKF9vKCkpJTYwLDQpfSxwOmZ1bmN0aW9uIHAoKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCksMikrXCI6XCIrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSklNjApLDIpfSxTOmZ1bmN0aW9uIFMoKXtyZXR1cm5bXCJ0aFwiLFwic3RcIixcIm5kXCIsXCJyZFwiXVtfZCgpJTEwPjM/MDooX2QoKSUxMDAtX2QoKSUxMCE9MTApKl9kKCklMTBdfSxXOmZ1bmN0aW9uIFcoKXtyZXR1cm4gX1coKX0sV1c6ZnVuY3Rpb24gV1coKXtyZXR1cm4gcGFkKF9XKCkpfSxOOmZ1bmN0aW9uIE4oKXtyZXR1cm4gX04oKX19O3JldHVybiBtYXNrLnJlcGxhY2UodG9rZW4sZnVuY3Rpb24obWF0Y2gpe2lmKG1hdGNoIGluIGZsYWdzKXtyZXR1cm4gZmxhZ3NbbWF0Y2hdKCl9cmV0dXJuIG1hdGNoLnNsaWNlKDEsbWF0Y2gubGVuZ3RoLTEpfSl9ZXhwb3J0IHZhciBtYXNrcz17ZGVmYXVsdDpcImRkZCBtbW0gZGQgeXl5eSBISDpNTTpzc1wiLHNob3J0RGF0ZTpcIm0vZC95eVwiLHBhZGRlZFNob3J0RGF0ZTpcIm1tL2RkL3l5eXlcIixtZWRpdW1EYXRlOlwibW1tIGQsIHl5eXlcIixsb25nRGF0ZTpcIm1tbW0gZCwgeXl5eVwiLGZ1bGxEYXRlOlwiZGRkZCwgbW1tbSBkLCB5eXl5XCIsc2hvcnRUaW1lOlwiaDpNTSBUVFwiLG1lZGl1bVRpbWU6XCJoOk1NOnNzIFRUXCIsbG9uZ1RpbWU6XCJoOk1NOnNzIFRUIFpcIixpc29EYXRlOlwieXl5eS1tbS1kZFwiLGlzb1RpbWU6XCJISDpNTTpzc1wiLGlzb0RhdGVUaW1lOlwieXl5eS1tbS1kZCdUJ0hIOk1NOnNzb1wiLGlzb1V0Y0RhdGVUaW1lOlwiVVRDOnl5eXktbW0tZGQnVCdISDpNTTpzcydaJ1wiLGV4cGlyZXNIZWFkZXJGb3JtYXQ6XCJkZGQsIGRkIG1tbSB5eXl5IEhIOk1NOnNzIFpcIn07ZXhwb3J0IHZhciBpMThuPXtkYXlOYW1lczpbXCJTdW5cIixcIk1vblwiLFwiVHVlXCIsXCJXZWRcIixcIlRodVwiLFwiRnJpXCIsXCJTYXRcIixcIlN1bmRheVwiLFwiTW9uZGF5XCIsXCJUdWVzZGF5XCIsXCJXZWRuZXNkYXlcIixcIlRodXJzZGF5XCIsXCJGcmlkYXlcIixcIlNhdHVyZGF5XCJdLG1vbnRoTmFtZXM6W1wiSmFuXCIsXCJGZWJcIixcIk1hclwiLFwiQXByXCIsXCJNYXlcIixcIkp1blwiLFwiSnVsXCIsXCJBdWdcIixcIlNlcFwiLFwiT2N0XCIsXCJOb3ZcIixcIkRlY1wiLFwiSmFudWFyeVwiLFwiRmVicnVhcnlcIixcIk1hcmNoXCIsXCJBcHJpbFwiLFwiTWF5XCIsXCJKdW5lXCIsXCJKdWx5XCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdLHRpbWVOYW1lczpbXCJhXCIsXCJwXCIsXCJhbVwiLFwicG1cIixcIkFcIixcIlBcIixcIkFNXCIsXCJQTVwiXX07dmFyIHBhZD1mdW5jdGlvbiBwYWQodmFsKXt2YXIgbGVuPWFyZ3VtZW50cy5sZW5ndGg+MSYmYXJndW1lbnRzWzFdIT09dW5kZWZpbmVkP2FyZ3VtZW50c1sxXToyO3JldHVybiBTdHJpbmcodmFsKS5wYWRTdGFydChsZW4sXCIwXCIpfTt2YXIgZ2V0RGF5TmFtZT1mdW5jdGlvbiBnZXREYXlOYW1lKF9yZWYpe3ZhciB5PV9yZWYueSxtPV9yZWYubSxkPV9yZWYuZCxfPV9yZWYuXyxkYXlOYW1lPV9yZWYuZGF5TmFtZSxfcmVmJHNob3J0PV9yZWZbXCJzaG9ydFwiXSxfc2hvcnQ9X3JlZiRzaG9ydD09PXZvaWQgMD9mYWxzZTpfcmVmJHNob3J0O3ZhciB0b2RheT1uZXcgRGF0ZTt2YXIgeWVzdGVyZGF5PW5ldyBEYXRlO3llc3RlcmRheS5zZXREYXRlKHllc3RlcmRheVtfK1wiRGF0ZVwiXSgpLTEpO3ZhciB0b21vcnJvdz1uZXcgRGF0ZTt0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93W18rXCJEYXRlXCJdKCkrMSk7dmFyIHRvZGF5X2Q9ZnVuY3Rpb24gdG9kYXlfZCgpe3JldHVybiB0b2RheVtfK1wiRGF0ZVwiXSgpfTt2YXIgdG9kYXlfbT1mdW5jdGlvbiB0b2RheV9tKCl7cmV0dXJuIHRvZGF5W18rXCJNb250aFwiXSgpfTt2YXIgdG9kYXlfeT1mdW5jdGlvbiB0b2RheV95KCl7cmV0dXJuIHRvZGF5W18rXCJGdWxsWWVhclwiXSgpfTt2YXIgeWVzdGVyZGF5X2Q9ZnVuY3Rpb24geWVzdGVyZGF5X2QoKXtyZXR1cm4geWVzdGVyZGF5W18rXCJEYXRlXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfbT1mdW5jdGlvbiB5ZXN0ZXJkYXlfbSgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIk1vbnRoXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfeT1mdW5jdGlvbiB5ZXN0ZXJkYXlfeSgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIkZ1bGxZZWFyXCJdKCl9O3ZhciB0b21vcnJvd19kPWZ1bmN0aW9uIHRvbW9ycm93X2QoKXtyZXR1cm4gdG9tb3Jyb3dbXytcIkRhdGVcIl0oKX07dmFyIHRvbW9ycm93X209ZnVuY3Rpb24gdG9tb3Jyb3dfbSgpe3JldHVybiB0b21vcnJvd1tfK1wiTW9udGhcIl0oKX07dmFyIHRvbW9ycm93X3k9ZnVuY3Rpb24gdG9tb3Jyb3dfeSgpe3JldHVybiB0b21vcnJvd1tfK1wiRnVsbFllYXJcIl0oKX07aWYodG9kYXlfeSgpPT09eSYmdG9kYXlfbSgpPT09bSYmdG9kYXlfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIlRkeVwiOlwiVG9kYXlcIn1lbHNlIGlmKHllc3RlcmRheV95KCk9PT15JiZ5ZXN0ZXJkYXlfbSgpPT09bSYmeWVzdGVyZGF5X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJZc2RcIjpcIlllc3RlcmRheVwifWVsc2UgaWYodG9tb3Jyb3dfeSgpPT09eSYmdG9tb3Jyb3dfbSgpPT09bSYmdG9tb3Jyb3dfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIlRtd1wiOlwiVG9tb3Jyb3dcIn1yZXR1cm4gZGF5TmFtZX07dmFyIGdldFdlZWs9ZnVuY3Rpb24gZ2V0V2VlayhkYXRlKXt2YXIgdGFyZ2V0VGh1cnNkYXk9bmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLGRhdGUuZ2V0TW9udGgoKSxkYXRlLmdldERhdGUoKSk7dGFyZ2V0VGh1cnNkYXkuc2V0RGF0ZSh0YXJnZXRUaHVyc2RheS5nZXREYXRlKCktKHRhcmdldFRodXJzZGF5LmdldERheSgpKzYpJTcrMyk7dmFyIGZpcnN0VGh1cnNkYXk9bmV3IERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RnVsbFllYXIoKSwwLDQpO2ZpcnN0VGh1cnNkYXkuc2V0RGF0ZShmaXJzdFRodXJzZGF5LmdldERhdGUoKS0oZmlyc3RUaHVyc2RheS5nZXREYXkoKSs2KSU3KzMpO3ZhciBkcz10YXJnZXRUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpLWZpcnN0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKTt0YXJnZXRUaHVyc2RheS5zZXRIb3Vycyh0YXJnZXRUaHVyc2RheS5nZXRIb3VycygpLWRzKTt2YXIgd2Vla0RpZmY9KHRhcmdldFRodXJzZGF5LWZpcnN0VGh1cnNkYXkpLyg4NjRlNSo3KTtyZXR1cm4gMStNYXRoLmZsb29yKHdlZWtEaWZmKX07dmFyIGdldERheU9mV2Vlaz1mdW5jdGlvbiBnZXREYXlPZldlZWsoZGF0ZSl7dmFyIGRvdz1kYXRlLmdldERheSgpO2lmKGRvdz09PTApe2Rvdz03fXJldHVybiBkb3d9O2V4cG9ydCB2YXIgZm9ybWF0VGltZXpvbmU9ZnVuY3Rpb24gZm9ybWF0VGltZXpvbmUoZGF0ZSl7cmV0dXJuKFN0cmluZyhkYXRlKS5tYXRjaCh0aW1lem9uZSl8fFtcIlwiXSkucG9wKCkucmVwbGFjZSh0aW1lem9uZUNsaXAsXCJcIikucmVwbGFjZSgvR01UXFwrMDAwMC9nLFwiVVRDXCIpfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB3ZWF0aGVySW50ZXJmYWNlIGZyb20gJy4vbW9kdWxlcy9vcGVuV2VhdGhlck1hcEludGVyZmFjZSc7XHJcbmltcG9ydCB3ZWF0aGVyTWFwcGVyIGZyb20gJy4vbW9kdWxlcy9vcGVuV2VhdGhlck1hcE1hcHBlcic7XHJcbmltcG9ydCBkYXRlRm9ybWF0LCB7IG1hc2tzIH0gZnJvbSAnZGF0ZWZvcm1hdCc7XHJcblxyXG5hc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xyXG5cclxuICAgdHJ5e1xyXG4gICAgICAgIGxldCBjdXJyZW50V2VhdGhlclJlc3BvbnNlID0gd2VhdGhlckludGVyZmFjZS5nZXRDdXJyZW50V2VhdGhlcignY2Fycm9sbHRvbixnYSx1cycpO1xyXG4gICAgbGV0IGZ1bGxXZWF0aGVyUmVzcG9uc2UgPSB3ZWF0aGVySW50ZXJmYWNlLmdldEZ1bGxXZWF0aGVyKDMzLjcyMTIsLTg1LjE0NTUpO1xyXG5cclxuICAgIGxldCByZXNwb25zZXMgPSBhd2FpdCBQcm9taXNlLmFsbChbY3VycmVudFdlYXRoZXJSZXNwb25zZSwgZnVsbFdlYXRoZXJSZXNwb25zZV0pO1xyXG4gICAgY29uc29sZS5sb2cocmVzcG9uc2VzWzBdKTtcclxuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlc1sxXSk7XHJcbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVySW50ZXJmYWNlLmdldFdlYXRoZXJJY29uKCcwM2QnKSk7XHJcblxyXG4gICAgY29uc3Qgd2VhdGhlck9iaiA9IHdlYXRoZXJNYXBwZXIubWFwQ3VycmVudFdlYXRoZXIocmVzcG9uc2VzWzBdKTtcclxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJPYmopO1xyXG5cclxuICAgIGNvbnN0IGZ1bGxXZWF0aGVyT2JqID0gd2VhdGhlck1hcHBlci5tYXBGdWxsV2VhdGhlcihyZXNwb25zZXNbMV0pO1xyXG4gICAgY29uc29sZS5sb2coZnVsbFdlYXRoZXJPYmopO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGRhdGVGb3JtYXQod2VhdGhlck9iai5kYXRlLCAnbW0vZGQveXl5eSBoaDpNTTpzcyBUVCcpKTtcclxuICAgfVxyXG4gICBjYXRjaChlcnJvcikge1xyXG4gICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgZXJyb3IpO1xyXG4gICB9XHJcblxyXG59XHJcblxyXG50ZXN0KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9