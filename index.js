var express = require('express');
var app = express();

app.use("/", express.static(__dirname + '/examples'));
app.use("/dist", express.static(__dirname + '/dist'));
app.use("/lib", express.static(__dirname + '/bower_components'));

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.sendfile('examples/main.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});