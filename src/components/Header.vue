<template>
  <header>
    <ul>
      <li class="city" v-on:click="emitQueryUpdate('current-location')" ><span class="fa fa-location-arrow"></span> Current Location</li>
      <li class="city" v-for= "(label,index) in cities" v-on:click="emitQueryUpdate(label)" :key="index">{{label}}</li>    
    </ul>
    <input type="search" v-bind:value="query" v-on:input="emitQueryUpdate($event.target.value)" placeholder="Search..."/>
    <!--input type="search" v-bind:value="query" v-on:input="emitQueryUpdate($event.value)" placeholder="Search..."/-->
    <!--input type="button" id="search" v-show="true" value="Search"/-->
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["cities", "query"],
  data() {
    return {};
  },
  methods: {
    emitQueryUpdate: function(update) {
      this.$emit("queryUpdate", update);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 10px;

  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;

    &.city{
      padding: 10px;
    
      &:hover, &.selected {
        box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.2);
        cursor: pointer;background: #066c8e;
        border-radius: 5px;
        color: #fff;
        
      }


    }
  }

  input[type="search"] {
    border: 0;
    border-bottom: 1px solid #444;
    padding: 0.5em;
    margin: 5px;
  }
}
</style>
