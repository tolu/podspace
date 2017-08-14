
const request = require('request');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/rss/:url', (req, res) => {
  // pipe request to response
  console.log(`piping response via "request" to ${req.params.url}`);
  var xRequest = request(req.params.url);
  req.pipe(xRequest);
  xRequest.pipe(res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
