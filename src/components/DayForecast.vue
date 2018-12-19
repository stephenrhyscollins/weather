<template>
  <section>
    <h3>{{getDayName(dailyForecast[0].date)}}</h3>
    <div class = "container">
      <HourForecast v-for="(hour,i) in dailyForecast" :key="i" :hourlyForecast="hour" />
    </div>

  </section>
</template>

<script>
import HourForecast from "./HourForecast.vue";
export default {
  name: "DayForecast",
  components: { HourForecast },
  props: ["dailyForecast"],
  data() {
    return {};
  },
  methods: {
    getDayName(date) {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      var day = new Date(date).getDay();
      var today = new Date().getDay();
      if (day === today) {
        return "Today";
      } else if (day === (today % 7) + 1) {
        return "Tomorrow";
      }
      return days[day];
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
      })
    }
  },
  mounted: function () {
    //this.createRain();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 5vw;

  @media (max-width: 750px) {
    margin: 0 2vw;
    justify-content: center;
    text-align: center;
  }

  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

    @media (max-width: 750px) {
      justify-content: center;
    }
  }
}
</style>
