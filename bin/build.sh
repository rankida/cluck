#!/bin/bash
DIR="public/dist/"
FILE="${DIR}build"
echo 'Setup folder ' $DIR
rm -r public/dist/ 2> /dev/null
mkdir $DIR
echo 'JSPM bundleing...'
jspm bundle-sfx app/main.js ${FILE}.js
echo 'Uglifying...'
./node_modules/.bin/uglifyjs ${FILE}.js -o ${FILE}.min.js
echo "Done - ${FILE}.min.js"
