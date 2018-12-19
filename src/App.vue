<template>
  <div class="app">
    <Header :query="query" :cities="cities" v-on:queryUpdate="parentQueryUpdate"/>
    <CurrentForecast v-if="currentWeather" :currentForecast="currentWeather" v-on:citySave="parentCitySave" :cities="cities" v-on:favouriteReset="parentFavouriteReset"/>
    <div class="forecast-switch">
      <span class="text">1 day</span>
      <label class="switch">
        <input v-model="showForecast" type="checkbox" checked>
        <span class="slider round"></span>
      </label>      
      <span class="text">5 days</span>
    </div>
    <DayForecast v-if="forecast && !showForecast" v-for="(day, index) in sliceIfDefined(forecast,forecastLimit)" :key="index" :dailyForecast="day"/>
    <DayForecast v-if="forecast && showForecast"  v-for="(day, index) in forecast" :key="index" :dailyForecast="day"/>

  </div>
</template>

<script>
import Header from "./components/Header.vue";
import DayForecast from "./components/DayForecast.vue";
import CurrentForecast from "./components/CurrentForecast.vue";
import Logic from "./assets/logic.js";
export default {
  name: "app",
  components: {
    Header,
    CurrentForecast,
    DayForecast
  },
  data() {
    return {
      currentWeather: "",
      forecast: "",
      query: "",
      showForecast: false,
      forecastLimit: 1,
      cities: [
        "Swansea",
        "London",
        "Rome",
        "New York",
        "Toronto",
        "Berlin",
        "Dubai"
      ]
    };
  },
  methods: {
    parentQueryUpdate: function(update) {
      if (update === "current-location") {
        this.getCurrentLocation();
      } else {
        this.updateWeather({ city: update });
      }
      localStorage.setItem("location", update);
    },
    parentCitySave: function() {
      if (!this.cities.includes(this.currentWeather.location.city)) {
        this.cities.push(this.currentWeather.location.city);
      } else {
        this.cities.splice(
          this.cities.indexOf(this.currentWeather.location.city),
          1
        );
      }
      localStorage.setItem("cities", JSON.stringify(this.cities).toString());
    },
    parentFavouriteReset: function() {
      this.cities = [
        "London",
        "Rome",
        "New York",
        "Toronto",
        "Berlin",
        "Dubai"
      ];
      localStorage.setItem("cities", JSON.stringify(this.cities).toString());
    },
    sliceIfDefined: function(forecast, sliceNum) {
      if (forecast) {
        if (forecast.length > 0) {
          return forecast.slice(0, sliceNum);
        }
      }
    },
    updateToggleState: function() {
      localStorage.setItem("showForecast", this.showForecast);
    },
    updateWeather: function(location) {
      Logic.getCurrentWeather(location).then(
        weather => (this.currentWeather = weather)
      );
      Logic.getForecast(location).then(forecast => {
        if (forecast) {
          this.forecast = forecast;
        }
      });
    },
    getCurrentLocation: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.updateWeather({
            lon: position.coords.longitude,
            lat: position.coords.latitude
          });
        });
      }
    },
    createRain(){
      console.log($('.drop').length)
      $(".drop").each(function(i, obj) {   
        console.log($(obj).parent().width());
        var dropLeft = randRange(0, $(obj).parent().width());
        var dropTop = randRange(-1000,1400);

        $(obj).css('left',dropLeft);
        $(obj).css('top',dropTop);
          function randRange( minNum, maxNum) {
            return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
          }
      });
    },
 

    createSnow(){
      $(".flake").each(function(i, obj) {   
        var dropLeft = randRange(0, $(obj).parent().width());
        var dropTop = randRange(-1000,1400);
        var size = randRange(10, 40);
        console.log(size);
        $(obj).css('left',dropLeft);
        $(obj).css('top',dropTop);
        $(obj).css('height',size);
        $(obj).css('width',size);
          function randRange( minNum, maxNum) {
            return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
          }
      });
    }
  },
  mounted: function() {
    this.showForecast = localStorage.getItem("showForecast") === "true";
    var previousLocation = localStorage.getItem("location");
    if (previousLocation) {
      if (previousLocation === "current-location" && navigator.geolocation) {
        this.getCurrentLocation();
      } else {
        this.updateWeather({ city: previousLocation });
      }
    } else {
      this.updateWeather({
        city: "London"
      });
    }
    if (!localStorage.getItem("cities")) {
      localStorage.setItem("cities", JSON.stringify(this.cities).toString());
    }
    this.cities = JSON.parse(localStorage.getItem("cities"));

    console.log(this);
  },
  watch: {
    showForecast: function() {
      this.updateToggleState();
    }
  }
};
</script>

<style lang="scss">
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .forecast-switch {
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      margin: 0 10px;
    }
  }
}



$rain: 1650;

@for $i from 1 through $rain {
  $top: (random(50) + 50) * 1%;
  $left: random(100) * 1%;
  $opacity: (random(30) + 30) * 0.01;
  $delay: random(20) - 1s;
  $size: random(10)+3;

  .drop:nth-of-type(#{$i}) {
    animation-name: rain-#{$i};
    animation-delay: $delay;
    animation-duration: random(6) + 4s;
    animation-iteration-count: infinite;
    left: $left;
    opacity: $opacity;
    top: -$top;
    width: $size;
  }

  @keyframes rain-#{$i} {
    0% {
      left: $left;
      opacity: $opacity;
      top: -$top;
    }
    100% {
      opacity: 0.25;
      top: $top + 10%;
    }
  }
}

$snow: 1650;

@for $i from 1 through $snow {
  $top: (random(50) + 50) * 1%;
  $left: random(100) * 1%;
  $opacity: (random(30) + 30) * 0.01;
  $delay: random(20) - 1s;
  $size: random(10);

  .flake:nth-of-type(#{$i}) {
    animation-name: snow-#{$i};
    animation-delay: $delay;
    animation-duration: random(6) + 4s;
    animation-iteration-count: infinite;
    left: $left;
    opacity: $opacity;
    top: -$top;
    width: $size + px;
    height: $size + px;
  }

  @keyframes snow-#{$i} {
    0% {
      left: $left;
      opacity: $opacity;
      top: -$top;
    }
    100% {
      opacity: 0.25;
      top: $top + 10%;
    }
  }
}


</style>

