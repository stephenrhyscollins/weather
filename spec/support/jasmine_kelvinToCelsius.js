//import Vue from 'vue'
//import {_kelvinToCelsius} from "../../src/assets/logic.js"
//import {describe, it, expect} from 'jasmine'

/* eslint-disable */

var logic = require("../../src/assets/logic.js")
var jas = require("jasmine")

describe("Function to convert kelvin(float) to celsius(float)", function(){
    it("recieves temperatures in kelvin and must return them in celsius", function(){
        expect(logic._kelvinToCelsius(0)).toBe("-273.1");
        expect(logic._kelvinToCelsius(10)).toBe("-263.1");
        expect(logic._kelvinToCelsius(256)).toBe("-17.1");
        expect(logic._kelvinToCelsius(-1)).toBe("-274.1");
    })
});
    

