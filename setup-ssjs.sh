#!/bin/bash

npm install

echo -e "\n\nNow enter your heroku password"

heroku login
heroku create
ssh -keygen -t rsa
heroku keys:add
heroku addons:add heroku-postgresql:dev
heroku pg:promote `heroku config | grep HEROKU_POSTGRESQL | cut -f1 -d':'`
heroku plugins:install git://github.com/ddollar/heroku-config.git

./pgsetup.sh
