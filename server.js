/* eslint-disable */
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const path = require('path');
const opn = require('opn');
const http = require('http');
const webpackConfig = require('./webpack.config.js');

const app = express();

const compiler = webpack(webpackConfig);

function getLocalIp() {
    const os = require('os');

    for(let addresses of Object.values(os.networkInterfaces())) {
        for(let add of addresses) {
            if(add.address.startsWith('192.168.')) {
                return add.address;
            }
        }
    }

    return '127.0.0.1';
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(`${__dirname}/www`));

app.use(webpackHotMiddleware(compiler, {
  log: null,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

// because we don't want to use hashtag in url (ex: localhost/#user/), so we have to setup folder www to serve static html as the instruction bellow
// for this purpose "Why doesn't my application render after refreshing?" check the link to have more detail information
// https://github.com/ReactTraining/react-router/blob/v4.1.1/FAQ.md#why-doesnt-my-application-render-after-refreshing
app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/www`, 'index.html'));
});

// const server = app.listen(80, () => {
//   const host = server.address().address;
//   const port = server.address().port;
//   opn(`http://localhost:${port}`);
//   console.log('App listening at http://%s:%s', host, port);
// });

var httpServer = http.createServer(app);
httpServer.listen(3000, () => {
  const host = httpServer.address().address;
  const port = httpServer.address().port;
  opn(`http://localhost:${port}`);
  console.log('App listening at http://%s:%s', host, port);
});

if (process.argv.includes('https')) {
  const fs = require('fs');
  const https = require('https');

  var httpsServer = https.createServer({
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem'),
      passphrase: '123456'
  }, app);
  httpsServer.listen(443, getLocalIp());
}
