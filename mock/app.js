"use strict";

function prepare_text(text){
    return text;
}

const coauthree = window.coauthree || {};

coauthree.start = function(elementID){
        console.log("has been started !!");
    }

coauthree.update = function(df=null, pmid=null, keyword=null,
                    author=null, file_to_print=null){
        console.log("update function has been run !!")
    }

window.coauthree = coauthree;
