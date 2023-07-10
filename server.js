const express = require('express');
const corsAnywhere = require('cors-anywhere');
const cors = require('cors');
const app = express();

const server = corsAnywhere.createServer({
  originWhitelist: [], // Set this to your desired whitelist of allowed origins
  requireHeader: [],
  removeHeaders: [],
  compress: false, // Disable content compression
});
app.use(cors());
app.use((req, res, next) => {
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
const port = 8080; // Specify the desired port number

app.listen(port, () => {
 console.log(`Local development server started on port ${port}`);
});