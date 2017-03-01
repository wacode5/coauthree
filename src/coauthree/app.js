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

console.log("this is main !!");

const coauthree = function(elementId, df=null, pmid=null, keyword=null,
                           author=null, file_to_print=null) {
    let texts_to_search;
    texts_to_search = [pmid, keyword, author];
    res = search(texts_to_search);
    if (file_to_print === null){
        console.log("going to start app in web browser ... ")

        fileloading.promiseReadfiles()
            .then(main.init_scene)
            .then(main.animate)
            .then(main.listen)
            .catch(function(error){console.log(error)});
    } else {
        conlose.log(`going to print search result in ${file_to_print}`);
        fs.writefile(file_to_print, texts_to_search);
    }
}

