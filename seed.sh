#! /bin/bash
## Make the script interactive with -i option so it can be run interactively with options to run a command or not.

database=
user=$USER
host=localhost

function usage
{
    echo "usage: seed [-d database] [-s host] [-u user]"
}

while  [ "$1" != "" ]; do
    case $1 in
	-d | --database )       shift
	                        database=$1
                                ;;
        -s | --host )           shift
	                        host=$1
				;;
        -u | --user )           shift
	                        user=$1
                                ;;
        -h | --help )           usage
	                        exit
                                ;;
        * )                     usage
                                exit 1
    esac     
    shift
done	

if [ "$database" = "" ]; then
    echo "Required parameters missing."
    usage
    exit 1
fi

# files to be imported 
platform=data/imports/platforms.csv
product=data/imports/products.csv
productcategory=data/imports/productcategories.csv
productasset=data/imports/productassets.csv
productplatform=data/imports/productplatforms.csv 

#echo $user
#echo $host
echo "Importing Platform..."
psql -d $database -h $host -U $user -c '\copy "Platform" from ./data/imports/platforms.csv with csv HEADER'

echo "Importing Product..." 
psql -d $database -h $host -U $user -c '\copy "Product" from ./data/imports/products.csv with csv HEADER'

echo "Importing ProductCategory..."
psql -d $database -h $host -U $user -c '\copy "ProductCategory" from ./data/imports/productcategories.csv with csv HEADER'

echo "Importing ProductAsset..."
psql -d $database -h $host -U $user -c '\copy "ProductAsset" from ./data/imports/productassets.csv with csv HEADER'

echo "Importing ProductPlatform..."
psql -d $database -h $host -U $user -c '\copy "ProductPlatform" from ./data/imports/productplatforms.csv with csv HEADER'
