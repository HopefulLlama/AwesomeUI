var express = require('express');
var pkg = require('./package');
var app = express();

app.use("/src", express.static(__dirname + '/src'));
app.use("/lib", express.static(__dirname + '/bower_components'));

app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
  res.sendfile('examples/main.html');
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});