#! /bin/bash

sudo apt-get install -y postgresql postgresql-contrib

ln -sf `ls $PWD/.pgpass` -t $HOME
chmod 600 $HOME"/.pgpass"

PGPASS=`cat .pgpass`
PG_HOST=$(echo $PGPASS | cut -d':' -f1)
PG_PORT=$(echo $PGPASS | cut -d':' -f2)
PG_DB=$(echo $PGPASS | cut -d':' -f3)
PG_USER=$(echo $PGPASS | cut -d':' -f4)
PG_PASS=$(echo $PGPASS | cut -d':' -f5)

echo "\n\nInput the following password twice below: "${PG_PASS}
sudo -u postgres createuser -U postgres -E -P -s $PG_USER
sudo -u postgres createdb -U postgres -O $PG_USER $PG_DB

# insert seed data in the newly created database
./seed.sh -d $PG_DB -ss $PG_HOST -u $PG_USER
