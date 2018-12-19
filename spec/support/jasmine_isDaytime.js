//import Vue from 'vue'
/*eslint-disable*/
var logic = require("../../src/assets/logic.js");
var jas = require('jasmine');

describe("Function determine if it is currently day from three unix timespamps", function(){
    it("recieves three time stamps and must return a bool referring to true=day or false=night", function(){
        expect(logic._isDaytime(779724000,779694899,779738759)).toBe(true);
        expect(logic._isDaytime(-946724400,-946747201,-946714080)).toBe(true);
        expect(logic._isDaytime(0,23220,64320)).toBe(false);
    })
});
    

