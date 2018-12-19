//import Vue from 'vue'
/*eslint-disable*/
var logic = require("../../src/assets/logic.js");
var jas = require('jasmine');

describe("Function that returns the relevant icon reference", function(){
    it("recieves an integer code from 200 to 900 (excluding 400-500) "+
     "plus a bool referring to day icon (vs night icon)" +
     "and returns a string detailing the required icon", function(){
        expect(logic._getWeatherIcon(250, true)).toBe("wi wi-day-thunderstorm");
        expect(logic._getWeatherIcon(621, false)).toBe("wi wi-night-snow");
        expect(logic._getWeatherIcon(800, false)).toBe("wi wi-night-clear");
    })
});
    

