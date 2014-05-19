#! /bin/bash

sudo apt-get install -y postgresql postgresql-contrib

ln -sf `ls $PWD/.pgpass` -t $HOME
chmod 600 $HOME"/.pgpass"

echo "doesn't parse in toks currently - fix"
PGPASS=`cat .pgpass`
echo $PGPASS
TOKS=(${PGPASS//:/})
PG_HOST=${TOKS[0]}
PG_PORT=${TOKS[1]}
PG_DB=${TOKS[2]}
PG_USER=${TOKS[3]}
PG_PASS=${TOKS[4]}

echo "\n\nInput the following password twice below: "${PG_PASS}
sudo -u postgres createuser -U postgres -E -P -s $PG_USER
sudo -u postgres createdb -U postgres -O $PG_USER $PG_DB
