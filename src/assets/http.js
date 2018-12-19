//import axios from "axios";
var axios = require("axios");
const APIKey = "9cc2d877f47949e2fd131a35b7386286";

var _fetchJSON = function(url) {
  return axios.get(url);
};

var getWeatherDataByCity = function(city, requestType) {
  const url = `http://api.openweathermap.org/data/2.5/${requestType}?q=${city}&APPID=${APIKey}`;
  return _fetchJSON(url).catch(function(error) {
    // eslint-disable-next-line
    console.error(`HTTP Fetch Error: Query: ${city}; Error: ${error.response}`);
  });
};

var getWeatherDataByCoordinates = function(loc, requestType) {
  const url = `http://api.openweathermap.org/data/2.5/${requestType}?lon=${
    loc.lon
  }&lat=${loc.lat}&APPID=${APIKey}`;
  return _fetchJSON(url).catch(function(error) {
    // eslint-disable-next-line
    console.error(`HTTP Fetch Error: Query: ${city}; Error: ${error.response}`);
  });
};

module.exports = {
  getWeatherDataByCity,
  getWeatherDataByCoordinates
};
