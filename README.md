# run
npm start

# build
npm run build

# change directory to dist
cd dist

# zip
tar -zcvf /tmp/ktm.tar.bz2 ./

# upload to server
scp /tmp/ktm.tar.bz2  root@157.230.240.77:/tmp

# unzip
tar -xf /tmp/ktm.tar.bz2 -C /var/www/html/


# Tools:

https://www.zamzar.com/convert/pdf-to-csv/ (free)
-> Open with Numbers
-> Copy to Google Sheet
-> Add Header (id, __0, __1,...)
-> Export to CSV
https://www.csvjson.com/csv2json


https://app.pdf.co/pdf-to-csv (paid)
