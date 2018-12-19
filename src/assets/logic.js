var httpService = require("./http.js");

var getCurrentWeather = function(location) {
  var weather;
  if (location.city) {
    weather = httpService
      .getWeatherDataByCity(location.city, "weather")
      .then(handleWeatherResponse);
  } else {
    weather = httpService
      .getWeatherDataByCoordinates(location, "weather")
      .then(handleWeatherResponse);
  }

  return weather;
};

var handleWeatherResponse = function(weather) {
  if (weather && weather.data) {
    return _mapCurrentWeather(weather.data);
  }
};

var _mapCurrentWeather = function(currentWeather) {
  var isDayTime = _getDaytime(currentWeather);

  var returnObject = {
    location: _getLocation(currentWeather), // holds city name, sunrise, sunset
    weather: _getTileBody(currentWeather, isDayTime)
  };

  returnObject.weather = Object.assign(returnObject.weather, {
    rain: currentWeather.rain,
    visibility: currentWeather.visibility
  });

  return returnObject;
};

var getForecast = function(location) {
  var forecast;
  if (location.city) {
    forecast = httpService
      .getWeatherDataByCity(location.city, "forecast")
      .then(handleForecastResponse);
  } else {
    forecast = httpService
      .getWeatherDataByCoordinates(location, "forecast")
      .then(handleForecastResponse);
  }
  return forecast;
};

var handleForecastResponse = function(forecast) {
  if (forecast && forecast.data) {
    return _mapForecast(forecast.data.list);
  }
};

var _mapForecast = function(forecast) {
  var currentDate = _getDate(forecast[0]);
  var dayCount = 0;
  var outputTileArray = [[]];

  var isDayTime = true;

  for (var hourlyWeatherData of forecast) {
    if (currentDate != _getDate(hourlyWeatherData)) {
      dayCount++;
      outputTileArray.push([]); // pushing empty array for next day
      currentDate = _getDate(hourlyWeatherData);
    }

    var outputTile = _getTileBody(hourlyWeatherData, isDayTime);
    if (hourlyWeatherData.rain) {
      outputTile = Object.assign(outputTile, {
        rain: hourlyWeatherData.rain["3h"]
      });
    }

    outputTile = Object.assign(outputTile, {
      date: _getDate(hourlyWeatherData),
      time: _getTime(hourlyWeatherData)
    });

    outputTileArray[dayCount].push(outputTile);
  }
  return outputTileArray;
};

var _getWeatherIcon = function(weatherConditionId, isDaytime) {
  isDaytime = isDaytime ? "day" : "night";

  const WeatherIconsArray = [
    {
      day: "wi wi-day-thunderstorm",
      night: "wi wi-night-thunderstorm",
      start: 200,
      finish: 300
    },
    {
      day: "wi wi-day-sprinkle",
      night: "wi wi-night-sprinkle",
      start: 300,
      finish: 400
    },
    {
      day: "wi wi-day-rain",
      night: "wi wi-night-rain",
      start: 500,
      finish: 600
    },
    {
      day: "wi wi-day-snow",
      night: "wi wi-night-snow",
      start: 600,
      finish: 700
    },
    { day: "wi wi-day-fog", night: "wi wi-night-fog", start: 700, finish: 800 },
    {
      day: "wi wi-day-sunny",
      night: "wi wi-night-clear",
      start: 800,
      finish: 801
    },
    {
      day: "wi wi-day-cloudy",
      night: "wi wi-night-cloudy",
      start: 801,
      finish: 900
    }
  ];

  for (var weatherID of WeatherIconsArray) {
    if (
      weatherConditionId >= weatherID.start &&
      weatherConditionId < weatherID.finish
    ) {
      return weatherID[isDaytime];
    }
  }
};

const _kelvinToCelsius = function(temperature) {
  return (temperature - 273.15).toFixed(1);
};

var _roundToNearestOffset = function(angle, offset) {
  return angle % offset >= offset / 2
    ? parseInt(angle + (offset - (angle % offset)))
    : parseInt(angle - (angle % offset));
};

var _getWindDirection = function(angle) {
  var compassDirections = [
    { name: "North", icon: "wi wi-wind wi-towards-n" },
    { name: "North East", icon: "wi wi-wind wi-towards-ne" },
    { name: "East", icon: "wi wi-wind wi-towards-e" },
    { name: "South East", icon: "wi wi-wind wi-towards-se" },
    { name: "South", icon: "wi wi-wind wi-towards-s" },
    { name: "South West", icon: "wi wi-wind wi-towards-sw" },
    { name: "West", icon: "wi wi-wind wi-towards-w" },
    { name: "North West", icon: "wi wi-wind wi-towards-nw" }
  ];
  var offset = 360 / compassDirections.length;
  var roundedAngle = _roundToNearestOffset(angle, offset);
  var arrayIndex = roundedAngle / offset - 1;

  return compassDirections[arrayIndex];
};

var _getDaytime = function(inputTile) {
  return (
    inputTile.dt >= inputTile.sys.sunrise &&
    inputTile.dt <= inputTile.sys.sunset
  );
};

var _getDate = function(dateTimeString) {
  //Input looks like "YYYY-MM-DD HH-MM-SS"
  return dateTimeString.dt_txt.split(" ")[0];
};

var _getTime = function(dateTimeString) {
  //Input looks like "YYYY-MM-DD HH-MM-SS"
  return dateTimeString.dt_txt.split(" ")[1];
};

var _getTemps = function(inputTile) {
  return {
    average: _kelvinToCelsius(inputTile.main.temp),
    min: _kelvinToCelsius(inputTile.main.temp_min),
    max: _kelvinToCelsius(inputTile.main.temp_max)
  };
};

var _getLocation = function(inputTile) {
  return {
    city: inputTile.name,
    sunrise: inputTile.sys.sunrise,
    sunset: inputTile.sys.sunset
  };
};

var _getWind = function(inputTile) {
  var returnObj = {
    speed: inputTile.wind.speed
  };

  if (inputTile.wind.deg) {
    returnObj = Object.assign(returnObj, {
      direction: _getWindDirection(inputTile.wind.deg)
    });
  }

  return returnObj;
};
var _getTileBody = function(inputTile, isDayTime) {
  return {
    summary: inputTile.weather[0].description,

    temperature: _getTemps(inputTile),

    humidity: inputTile.main.humidity,

    wind: _getWind(inputTile),

    clouds: inputTile.clouds.all,
    icon: _getWeatherIcon(inputTile.weather[0].id, isDayTime)
  };
};

export default {
  getCurrentWeather,
  getForecast
};

//module.exports = moduleExports
//export default(moduleExports);

//JH94:: Web application will not work using ES5 export, unit test will not work using unit 6 export
