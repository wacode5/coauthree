#!/usr/bin/env bash
set -u

npm install && $(npm bin)/browserify src/coauthree/app.js \
    -t babelify -o coauthree/inst/htmlwidgets/lib/coauthree/coauthree.min.js
r CMD build coauthree
r CMD check coauthree*.tar.gz

