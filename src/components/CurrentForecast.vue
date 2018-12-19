<template>
  <div class="column">
    <section class="today">
      <i class="weather" v-bind:class="currentForecast.weather.icon"/>
      <div class="column align">
        <h1>{{currentForecast.location.city}}</h1>
        <span class="condition-summary">{{currentForecast.weather.summary}}</span>
      </div>    
      
      <span class="temperature">{{currentForecast.weather.temperature.average}}&#176;C</span>
    </section>

     <div class="row align-center current-weather-detail">        
        <span class="detail temp" v-if="true || currentForecast.weather.temperature">
          <i class="wi wi-thermometer"></i>
          <span><b>{{currentForecast.weather.temperature.min}}</b>&#0176;C/<b>{{currentForecast.weather.temperature.max}}</b>&#0176;C</span>
        </span>
         <span class="detail humidity" v-if="currentForecast.weather.humidity">
          <i class="wi wi-humidity"></i>
          <span><b>{{currentForecast.weather.humidity}}</b>%</span>
        </span>
        
       
        <span class="detail clouds" v-if="currentForecast.weather.humidity">
          <i class="wi wi-cloudy"></i>
          <span><b>{{currentForecast.weather.clouds}}</b>%</span>
        </span>
        
        <span class="detail wind" v-if="currentForecast.weather.wind">
          <i class="wi wi-strong-wind"></i>
          <i v-if="currentForecast.weather.wind.direction" :class="currentForecast.weather.wind.direction.icon"></i>
          <span><b>{{currentForecast.weather.wind.speed}}</b>m/s</span>
          <span v-if="currentForecast.weather.wind.direction"><b>{{currentForecast.weather.wind.direction.name}}</b></span>
        </span>

        
        <span class="detail rain" v-if="currentForecast.weather.rain">
          <i class="fas fa-tint"></i>
          <span>{{currentForecast.weather.rain["1h"]}}mm</span>
        </span>
        <span class=" detail row align-center h-space favourite-toggle" v-on:click.left="emitCitySave()" v-on:click.right="emitFavouriteReset()" >
          <i class="heart" :class="[(this.cities.includes(currentForecast.location.city)) ? 'fas fa-heart': 'far fa-heart']"></i>
          <span>Favourite</span>
        </span>
      </div>
      
        
  
  </div>
</template>

<script>
export default {
  name: "CurrentForecast",
  props: ["currentForecast", "cities"],
  data() {
    return {};
  },
  methods: {
    emitCitySave: function() {
      this.$emit("citySave");
    },
    emitFavouriteReset: function() {
      this.$emit("favouriteReset");
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped lang="scss">
$border-colour: #066c8e;
$icon-colour: #066c8e;
$subtitle: #777;

section {
  padding: 10px;
  margin: 10px 0;
}

.hourly-forecast {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid $border-colour;
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
}

section.today {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  h1 {
    font-size: 3em;
    margin: 5px 0;
  }
  i {
    &.weather {
      color: $icon-colour;
    }
  }
  .weather,
  .temperature {
    font-size: 5em;
  }
  .condition-summary {
    color: $subtitle;
    font-weight: bold;
    text-transform: capitalize;
  }

  > * {
    margin: 15px;
  }

  @media (min-width: 750px) {
  }
}

.row {
  display: flex;
  flex-direction: row;

  &.align-center {
    align-items: center;
  }
  &.h-space {
    > * {
      margin: 0 2px;
    }
  }
}

.column {
  display: flex;
  flex-direction: column;

  &.center {
    justify-content: center;
  }

  &.align {
    align-items: flex-start;

    @media (max-width: 750px) {
      align-items: center;
    }
  }
}

.favourite-toggle {
  color: #e91e63;
  margin: 10px 0;

  &:hover {
    color: #d80d52;
    cursor: pointer;
  }
}

.search {
  background: #03a9f4;
  &:hover {
    cursor: pointer;
    background: #0198e3;
  }
}

.current-weather-detail {
  justify-content: center;
  flex-wrap: wrap;
  margin: 1em 0;

  @media (max-width: 480px) {
    flex-direction: column;
  }

  span {
    &.detail {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2em;
      text-align: center;
      margin: 3px 5px;

      i {
        font-size: 1.5em;
      }
      > * {
        margin: 3px 5px;
      }
    }
  }

  .temp {
    i {
      color: #f44336;
    }
  }
  .rain {
    i {
      color: #0296af;
    }
  }
  .humidity {
    i {
      color: #c50e48;
    }
  }
  .wind {
    i {
      color: #1694c5;
    }
  }
}
</style>
