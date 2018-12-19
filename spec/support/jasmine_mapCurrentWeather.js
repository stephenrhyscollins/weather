//import Vue from 'vue'
//import {_kelvinToCelsius} from "../../src/assets/logic.js"
//import {describe, it, expect} from 'jasmine'

/* eslint-disable */

var logic = require("../../src/assets/logic.js")
var jas = require("jasmine")

describe("Function to map API weather return to tile object", function(){
    it("recieves JSON object and returns rationalised JSON object", function(){
        expect(logic._mapCurrentWeather({
            
            name:"test",
            sys:{
                sunrise:0,
                sunset:10
            },
            dt:5,
            clouds:{
                all:10
            },
            rain:5,
            wind:{
                speed:50,
                direction:0
            },
            visibility:100,
            main:{
                temp:5000,
                temp_min:-217,
                temp_max:14000,
                humidity:30
            },
            weather:[
                {
                    description:
                    "test",
                    id:800
                }
            ]
            
        })).toBe({
            location:{
                city: "test",
                sunrise: 0,
                sunset: 10
            },
            weather:{
                summary:"test",
                temperature:{
                    current:5000,
                    min:-217,
                    max:14000
                },
                clouds:10,
                humidity:30,
                wind:{
                    speed:50,
                    direction:{
                        name:"North",
                        icon:"wi wi-wind wi-towards-n"
                    },
                visibility: 100,
                rain:5,
                icon:"wi wi-day-sunny"
                }
            }
        });
    })
});
    

