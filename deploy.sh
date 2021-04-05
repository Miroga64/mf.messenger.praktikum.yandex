#!/usr/bin/env sh

set -e
rm -rf ./build
npm run build

cd ./build
mkdir styles
cd ../


sass ./src/scss/chat.scss ./build/styles/chat.css
sass ./src/scss/form.scss ./build/styles/form.css
sass ./src/scss/main.scss ./build/styles/main.css
sass ./src/scss/popup.scss ./build/styles/popup.css
sass ./src/scss/profile.scss ./build/styles/profile.css
sass ./src/scss/empty_page.scss ./build/styles/empty_page.css

ditto ./static/images ./build/images
ditto ./static/route ./build/route