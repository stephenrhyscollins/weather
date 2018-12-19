<template>
  <div v-on:click="details = !details" class="tile" v-bind:class="{ rain: hourlyForecast.summary.toUpperCase().includes('RAIN'), sun: hourlyForecast.summary.toUpperCase().includes('SUN'), cloud: hourlyForecast.summary.toUpperCase().includes('CLOUD'), clear: hourlyForecast.summary.toUpperCase().includes('CLEAR'), snow: hourlyForecast.summary.toUpperCase().includes('SNOW')}">
    <div class="content">
      <div class="banner">
        <div class="summary">
          <p class="time">{{hourlyForecast.time.slice(0, 5)}}</p>
          <span class="summary">{{hourlyForecast.summary}} {{hourlyForecast.temperature.average}}&#0176;C</span>
        </div>
        
        <i v-bind:class="hourlyForecast.icon"/>
      </div>

      <span class="temp"></span>
      <div v-show="details" class="details">
        <span>A <b>high of {{hourlyForecast.temperature.max}}°C</b>, potentially <b>dropping to {{hourlyForecast.temperature.min}}°C.</b></span>
        <span><b>Humidity</b> is at <b>{{hourlyForecast.humidity}}%</b></span>
        <span v-if="hourlyForecast.rain"><b>{{(hourlyForecast.rain)}}mm</b> of <b>rain fall</b> is predicted for the previous 3 hours.</span>
        <span v-if="hourlyForecast.wind"><b>Wind</b> is <b>{{(hourlyForecast.wind.speed)}}m/s {{(hourlyForecast.wind.direction.name)}} </b></span>
     </div>     
      <span class="arrow fa" v-bind:class="[details ? 'fa-chevron-up': 'fa-chevron-down']"></span>
    </div>
    
    <div class="drop" v-if="hourlyForecast.summary.toUpperCase().includes('RAIN')" v-for="(n, index) in 50"  v-bind:key="index" v-bind:id="'drop'+index"></div>
    <div class="flake" v-if="hourlyForecast.summary.toUpperCase().includes('SNOW')" v-for="(n, index) in 50"  v-bind:key="index" v-bind:id="'flake'+index"></div>


  </div>
</template>

<script>
export default {
  name: "HourForecast",
  props: ["hourlyForecast"],
  data() {
    return {
      details: false
    };
  },
};


  


  
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped lang="scss">
$padding: 10px;
$border: 1px;
$border-color: #066c8e;



.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tile {
  box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #219fb5;
  color: #fafafa;
  position: relative;
  display: flex;

  width: 100%;
  max-width: 300px;
  margin: 5px;
  padding: $padding;

  @media (max-width: 480px) {
    min-width: 40vw;
    padding: 2vw;
    max-width: 30vw;
  }


  &.rain {
    background:#0D343A;
    background:-webkit-gradient(linear,0% 0%,0% 100%, from(rgba(13,52,58,1) ), to(#000000)  );
    background: -moz-linear-gradient(top, rgba(13,52,58,1) 0%, rgba(0,0,0,1) 100%);
    overflow:hidden;

    .drop {
      position: absolute;
      bottom:200px;
      transform: translateZ(0);

      background: white;
      background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ddddff 100%);
      height: 50px;
      position: absolute;
      width: 1px;
    }   
  }


  &.snow {
    background:#0D343A;
    background:-webkit-gradient(linear,0% 0%,0% 100%, from(rgba(13,52,58,1) ), to(#000000)  );
    background: -moz-linear-gradient(top, rgba(13,52,58,1) 0%, rgba(0,0,0,1) 100%);
    overflow:hidden;

    .flake {
      position: absolute;
      bottom:200px;
      transform: translateZ(0);

      background: white;
      border-radius: 50%;
      position: absolute;
    } 
  }

  &.sun {
    background: #fc4a1a;  /* fallback for old browsers */
    background: -webkit-radial-gradient(#f7b733 60%, #fc4a1a);  /* Chrome 10-25, Safari 5.1-6 */
    background: radial-gradient(#f7b733 60%, #fc4a1a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }


  &.cloud {
    background: #fc4a1a;  /* fallback for old browsers */
    background: -webkit-linear-gradient(#a7a4a0 20%, #809ca0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(#a7a4a0 20%, #809ca0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
 &.clear {
    background: #fc4a1a;  /* fallback for old browsers */
    background: -webkit-linear-gradient(#5d9fa9 23%, #4ab3c1);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(#5d9fa9 23%, #4ab3c1); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }



  
 


  .content {
    @extend .flex-column;
    width: 100%;

    .banner {
      @extend .flex-row;
      width: 100%;
      justify-content: space-around;

      .summary{
        justify-content: flex-start;
      }
    }

  }



  &:hover {  opacity: .9;
    box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.2);
  }
  &:hover .arrow {
    color: #02677a;
  }

 

  .temp,
  .time {
    margin: 0.3em 0;
  }

  .temp,
  .time {
    font-size: 1.75em;
  }

  i {
    font-size: 4em;
    margin: 20px 0;
  }

  .arrow {
    flex: 1 0 auto;
    font-size: 1.3em;
  }

  .details {
    @extend .flex-column;
    align-items: flex-start;
    text-align: left;
    > * {
      font-size: 1em;
      margin: 10px;
    }
  }
}

/* animate the drops*/
@-webkit-keyframes fall {
	to {margin-top:900px;}
}
@-moz-keyframes fall {
	to {margin-top:900px;}
}
</style>
