#!/bin/bash
# Install node packages
npm install

echo -e "\n\nNow enter your heroku password"
# Set up heroku
# - devcenter.heroku.com/articles/config-vars
# - devcenter.heroku.com/articles/heroku-postgresql
heroku login
heroku create
ssh -keygen -t rsa
heroku keys:add
heroku addons:add heroku-postgresql:dev
heroku pg:promote `heroku config | grep HEROKU_POSTGRESQL | cut -f1 -d':'`
heroku plugins:install git://github.com/ddollar/heroku-config.git

# Set up heroku configuration variables
cp .env.dummy .env

# For local postgre setup
./pgsetup.sh
