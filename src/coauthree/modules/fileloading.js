var fs = require("browserify-fs");
var $ = require('jquery');

function promiseReadfile(filename){
    return new Promise(function(resolve, reject){
        fs.readFile(filename, function(err, data){
            if(err) reject(err);
            else resolve(data);
        });
    })
};

function promiseLoadImage(filename){
    return new Promise(function(resolve){
            var image = new Image();

            image.onload = function(){ resolve(image) };
            image.src = filename;
        }
    )
};


function promiseLoadCity( filename ){
    return new Promise(function( resolve ){
        var filePath = encodeURI( filename );
        $.getJSON( filePath, function( data ){
            console.log("finished reading json" +  data.cities);
            resolve(data.cities);
        });
    });
}


function promiseLoadJson( filename ){
    return new Promise(function( resolve ){
        var filePath = encodeURI( filename );
        $.getJSON( filePath, function( data ){
            console.log("finished reading json" +  data);
            resolve(data);
        });
    });
}


var request = {
    loadMapIndexedImage: function() {
        return promiseLoadImage('images/map_indexed.png')
    },
    loadMapOutlinedImage: function(){
        return promiseLoadImage('images/map_outline.png')
    },
    loadCitiesData: function(){
        return promiseLoadCity('data/cities_lat_lon.json')
    },
    searchData: function(){
        return promiseLoadJson('data/All_SingleCell.json')
    }
}

function promiseReadfiles(){
    return Promise.all([request.loadMapIndexedImage(),
                        request.loadMapOutlinedImage(),
                        request.loadCitiesData(),
                        request.searchData()
                       ]);
};

var fileloading = {promiseReadfiles: promiseReadfiles};

module.exports = fileloading;
