// load own modules.
//
"use strict";
const main = require('./modules/main.js');
const fileloading = require('./modules/fileloading.js');
const fs = require("browserify-fs");

// load third party modules
var THREE = require('three');
var $  = require('jquery');

window.$ = window.jQuery = $;
var bootstrap = require("bootstrap");

// define external files
var latlonData = "data/cities_lat_lon.json";

function prepare_text(text){
    return text;
}

function search(text){
    return text;
}

const coauthree = window.coauthree || {};


coauthree.start = function(){
    fileloading.promiseReadfiles()
        .then(main.init_scene)
        .then(main.animate)
        .catch(function(error){console.log(error)});
};


window.coauthree = coauthree

