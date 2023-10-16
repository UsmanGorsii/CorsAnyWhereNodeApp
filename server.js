const express = require('express');
const corsAnywhere = require('cors-anywhere');
const app = express();

const server = corsAnywhere.createServer({
  originWhitelist: [], // Set this to your desired whitelist of allowed origins
  requireHeader: [],
  removeHeaders: [],
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: [
    'cookie',
    'cookie2',
    // Strip Heroku-specific headers
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time',
    // Other Heroku added debug headers
    // 'x-forwarded-for',
    // 'x-forwarded-proto',
    // 'x-forwarded-port',
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
    xfwd: false,
  },
});
app.use((req, res, next) => {
  //req.headers['x-forwarded-proto'] = 'https';
  server.emit('request', req, res, next);
});
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  if ('OPTIONS' == req.method) {
  res.sendStatus(200);
  } else {
    next();
  }
});
const port = process.env.PORT || 8080; // Specify the desired port number

app.listen(port, () => {
 console.log(`Local development server started on port ${port}`);
});