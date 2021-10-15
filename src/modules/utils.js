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

export { unixUTCToDate }