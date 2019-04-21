# run
npm start

# build
npm run build

# zip
tar -zcvf /tmp/ktm.tar.bz2 ./dist/

# upload to server
scp /tmp/ktm.tar.bz2  root@157.230.240.77:/tmp

# unzip
tar -xf /tmp/ktm.tar.bz2 -C /var/www/html/
